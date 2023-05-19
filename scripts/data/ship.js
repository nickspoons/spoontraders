st.data.ship = (() => {

   let ships = null

   const _fetch = async () => {
      const { data, meta } = await st.api.get('my/ships')
      if (meta.total > 10) alert(`TODO: something with meta`)
      ships = data
      return ships
   }

   const beginExtracting = async (contractID, shipSymbol) => {
      const ship = await find(shipSymbol)
      ship.extracting = true
      const waypointSymbol = ship.nav.waypointSymbol
      const contract = await st.data.contract.find(contractID)
      if (contract.terms.deliver.length > 1)
         alert(`There are ${contract.terms.deliver.length} terms deliveries...`)
      const delivery = contract.terms.deliver.find(d =>
         d.unitsFulfilled < d.unitsRequired)
      while (ship.extracting) {
         let surveyData = await st.data.survey.find(waypointSymbol, [delivery.tradeSymbol])
         const mount = ship.mounts.find(m => m.symbol.startsWith('MOUNT_SURVEYOR'))
         if (mount && mount.deposits.find(d => d === delivery.tradeSymbol)) {
            while (!surveyData || surveyData.score < 100 && ship.extracting) {
               console.log(`${shipSymbol} surveying ${waypointSymbol}`)
               await new Promise(async resolve =>
                  await survey(shipSymbol, resolve))
               surveyData = await st.data.survey.find(waypointSymbol, [delivery.tradeSymbol])
            }
         }
         if (!ship.extracting)
            break
         const promises = []
         if (ship.cargo.capacity - ship.cargo.units >= 5) {
            let onCooldown
            promises.push(new Promise(resolve => onCooldown = resolve))
            console.log(surveyData
               ? `${shipSymbol} extracting with survey (${surveyData.score})`
               : `${shipSymbol} extracting without survey`)
            const { symbol, units } = await extract(shipSymbol, surveyData, onCooldown)
            if (symbol === delivery.tradeSymbol)
               console.log(`${shipSymbol} extracted ${units} IRON_ORE from ${waypointSymbol}`)
            else {
               let orbiting = false
               if (ship.nav.status === 'IN_ORBIT') {
                  orbiting = true
                  await dock(shipSymbol)
               }
               const data = await sell(shipSymbol, symbol, units)
               console.log(`${shipSymbol} sold ${units} ${symbol} for ${data.transaction.totalPrice}`)
               if (orbiting)
                  await orbit(shipSymbol)
            }
         }
         if (ship.cargo.capacity - ship.cargo.units < 5)
            promises.push(st.data.contract.deliver(contractID, shipSymbol))
         await Promise.all(promises)
      }
      console.log(`${shipSymbol} stopped extracting`)
   }

   const beginSurveying = async shipSymbol => {
      const ship = await find(shipSymbol)
      ship.surveying = true
      while (ship.surveying) {
         console.log(`${shipSymbol} surveying ${ship.nav.waypointSymbol}`)
         await new Promise(async resolve =>
            await survey(shipSymbol, resolve))
      }
      console.log(`${shipSymbol} stopped surveying`)
   }

   const dock = async shipSymbol => {
      const ship = await find(shipSymbol)
      const { data } = await st.api.post(`my/ships/${shipSymbol}/dock`)
      ship.nav = data.nav
   }

   const extract = async (shipSymbol, surveyData, onCooldown) => {
      const ship = await find(shipSymbol)
      const payload = surveyData ? { survey: surveyData.survey } : {}
      const { data } = await st.api.post(`my/ships/${shipSymbol}/extract`, payload)
      ship.cargo = data.cargo
      if (onCooldown)
         setTimeout(onCooldown, data.cooldown.totalSeconds * 1000 + 1000)
      return data.extraction.yield
   }

   const find = async symbol =>
      (ships ? ships : await _fetch())
         .find(s => s.symbol === symbol)

   const findAll = async refresh => (ships && !refresh) ? ships : await _fetch()

   const navigate = async (shipSymbol, waypointSymbol, onArrival) => {
      const payload = { waypointSymbol }
      const { data } = await st.api.post(`my/ships/${shipSymbol}/navigate`, payload)
      const ship = await find(shipSymbol)
      ship.nav = data.nav
      const ms = new Date(data.nav.route.arrival) - new Date()
      console.log(`${shipSymbol} travelling for ${ms / 1000} seconds`)
      if (onArrival)
         setTimeout(onArrival, ms + 1000)
   }

   const orbit = async shipSymbol => {
      const ship = await find(shipSymbol)
      const { data } = await st.api.post(`my/ships/${shipSymbol}/orbit`)
      ship.nav = data.nav
   }

   const refuel = async shipSymbol =>
      await st.api.post(`my/ships/${shipSymbol}/refuel`)

   const sell = async (shipSymbol, symbol, units) => {
      const ship = await find(shipSymbol)
      const { data } = await st.api.post(`my/ships/${shipSymbol}/sell`, { symbol, units })
      ship.cargo = data.cargo
      return data
   }

   const survey = async (shipSymbol, onCooldown) => {
      const ship = await find(shipSymbol)
      if (ship.nav.status !== 'IN_ORBIT')
         await orbit(shipSymbol)
      const { data } = await st.api.post(`my/ships/${shipSymbol}/survey`)
      const summary = data.surveys
         .map(s => `${s.size} - ${s.deposits.map(d => d.symbol).join(', ')}`)
         .join('\n')
      console.log(`Survey complete: ${summary}`)
      st.data.survey.add(ship.nav.waypointSymbol, data.surveys)
      if (onCooldown)
         setTimeout(onCooldown, data.cooldown.totalSeconds * 1000 + 1000)
   }

   return {
      dock,
      beginExtracting,
      beginSurveying,
      extract,
      find,
      findAll,
      navigate,
      orbit,
      refuel,
      sell,
      survey
   }
})()
