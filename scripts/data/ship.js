import { api } from '../api.js'
import { constants } from '../globals.js'

import { survey as surveyData } from './survey.js'

export const ship = (() => {

   let ships = null

   const _fetch = async () => {
      const { ok, resp } = await api.get('my/ships')
      if (!ok)
         return null
      ships = resp.data
      return ships
   }

   const beginExtracting = async (contractID, shipSymbol) => {
      // const ship = await find(shipSymbol)
      // if (!ship)
      //    retun
      // ship.extracting = true
      // const waypointSymbol = ship.nav.waypointSymbol
      // const contract = await st.data.contract.find(contractID)
      // if (!ship)
      //    retun
      // if (contract.terms.deliver.length > 1)
      //    alert(`There are ${contract.terms.deliver.length} terms deliveries...`)
      // const delivery = contract.terms.deliver.find(d =>
      //    d.unitsFulfilled < d.unitsRequired)
      // while (ship.extracting) {
      //    let surveyData = await st.data.survey.find(waypointSymbol, [delivery.tradeSymbol])
      //    const mount = ship.mounts.find(m => m.symbol.startsWith('MOUNT_SURVEYOR'))
      //    if (mount && mount.deposits.find(d => d === delivery.tradeSymbol)) {
      //       if (!surveyData || surveyData.score < constants.surveyingTarget && ship.extracting) {
      //          console.log(`${shipSymbol} surveying ${waypointSymbol}`)
      //          await new Promise(async resolve =>
      //             await survey(shipSymbol, resolve))
      //          surveyData = await st.data.survey.find(waypointSymbol, [delivery.tradeSymbol])
      //       }
      //    }
      //    if (!ship.extracting)
      //       break
      //    const promises = []
      //    if (ship.cargo.capacity - ship.cargo.units >= 5) {
      //       let onCooldown
      //       promises.push(new Promise(resolve => onCooldown = resolve))
      //       console.log(surveyData
      //          ? `${shipSymbol} extracting with ${surveyData.score}-survey`
      //          : `${shipSymbol} extracting without survey`)
      //       const yield = await extract(shipSymbol, surveyData, onCooldown)
      //       if (yield) {
      //          const { symbol, units } = yield
      //          if (symbol === delivery.tradeSymbol)
      //             console.log(`${shipSymbol} extracted ${units} IRON_ORE from ${waypointSymbol}`)
      //          else {
      //             let orbiting = false
      //             if (ship.nav.status === 'IN_ORBIT') {
      //                orbiting = true
      //                await dock(shipSymbol)
      //             }
      //             const data = await sell(shipSymbol, symbol, units)
      //             if (data)
      //                console.log(`${shipSymbol} sold ${units} ${symbol} for ${data.transaction.totalPrice}`)
      //             if (orbiting)
      //                await orbit(shipSymbol)
      //          }
      //       }
      //    }
      //    if (ship.cargo.capacity - ship.cargo.units < 5)
      //       promises.push(st.data.contract.deliver(contractID, shipSymbol))
      //    await Promise.all(promises)
      // }
      // console.log(`${shipSymbol} stopped extracting`)
   }

   const beginSurveying = async shipSymbol => {
      // const ship = await find(shipSymbol)
      // if (!ship)
      //    retun
      // ship.surveying = true
      // while (ship.surveying) {
      //    console.log(`${shipSymbol} surveying ${ship.nav.waypointSymbol}`)
      //    await new Promise(async resolve =>
      //       await survey(shipSymbol, resolve))
      // }
      // console.log(`${shipSymbol} stopped surveying`)
   }

   const dock = async shipSymbol => {
      const ship = await find(shipSymbol)
      if (!ship)
         retun
      const { ok, resp } = await api.post(`my/ships/${shipSymbol}/dock`)
      if (!ok)
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      else
         ship.nav = resp.data.nav
   }

   const extract = async (shipSymbol, surveyData, onCooldown) => {
      // const ship = await find(shipSymbol)
      // if (!ship) {
      //    if (onCooldown) onCooldown()
      //    return null
      // }
      // const payload = surveyData ? { survey: surveyData.survey } : {}
      // const { ok, resp } = await api.post(`my/ships/${shipSymbol}/extract`, payload)
      // if (!ok) {
      //    console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      //    if (resp.error.code === 4221 || resp.error.code === 4224) {
      //       st.data.survey.remove(ship.nav.waypointSymbol, surveyData.survey)
      //       if (onCooldown) onCooldown()
      //       return null
      //    }
      //    else if (onCooldown && resp.error.data && resp.error.data.cooldown)
      //       setTimeout(onCooldown, resp.error.data.cooldown.remainingSeconds * 1000)
      //    else if (onCooldown && resp.error.data && resp.error.data.secondsToArrival)
      //       setTimeout(onCooldown, resp.error.data.secondsToArrival * 1000)
      //    else if (onCooldown)
      //       onCooldown()
      //    return null
      // }
      // ship.cargo = resp.data.cargo
      // if (onCooldown)
      //    setTimeout(onCooldown, resp.data.cooldown.totalSeconds * 1000 + 1000)
      // return resp.data.extraction.yield
   }

   const find = async symbol => {
      const ss = ships ? ships : await _fetch()
      if (ss)
         return ss.find(s => s.symbol === symbol)
   }

   const findAll = async refresh => (ships && !refresh) ? ships : await _fetch()

   const navigate = async (shipSymbol, waypointSymbol, onArrival) => {
      const ship = await find(shipSymbol)
      if (!ship) {
         if (onArrival) onArrival()
         return
      }
      const payload = { waypointSymbol }
      const { ok, resp } = await api.post(`my/ships/${shipSymbol}/navigate`, payload)
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         if (onArrival) onArrival()
         return
      }
      ship.nav = resp.data.nav
      const ms = new Date(resp.data.nav.route.arrival) - new Date()
      console.log(`${shipSymbol} travelling for ${ms / 1000} seconds`)
      if (onArrival)
         setTimeout(onArrival, ms + 1000)
   }

   const orbit = async shipSymbol => {
      const ship = await find(shipSymbol)
      if (!ship)
         retun
      const { ok, resp } = await api.post(`my/ships/${shipSymbol}/orbit`)
      if (!ok)
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      else
         ship.nav = resp.data.nav
   }

   const refuel = async shipSymbol => {
      const { ok, resp } = await api.post(`my/ships/${shipSymbol}/refuel`)
      if (!ok)
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
   }

   const sell = async (shipSymbol, symbol, units) => {
      const ship = await find(shipSymbol)
      if (!ship)
         return null
      const { ok, resp } = await api.post(`my/ships/${shipSymbol}/sell`, { symbol, units })
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         return null
      }
      ship.cargo = resp.data.cargo
      return resp.data
   }

   const survey = async (shipSymbol, onCooldown) => {
      const ship = await find(shipSymbol)
      if (!ship || ship.nav.status === 'IN_TRANSIT') {
         if (onCooldown) onCooldown()
         return
      }
      if (ship.nav.status !== 'IN_ORBIT')
         await orbit(shipSymbol)
      const { ok, resp } = await api.post(`my/ships/${shipSymbol}/survey`)
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         if (onCooldown && resp.error.data && resp.error.data.cooldown)
            setTimeout(onCooldown, resp.error.data.cooldown.remainingSeconds * 1000)
         else if (onCooldown)
            onCooldown()
         return
      }
      const data = resp.data
      const summary = data.surveys
         .map(s => `${s.size} - ${s.deposits.map(d => d.symbol).join(', ')}`)
         .join('\n')
      console.log(`Survey complete: ${summary}`)
      surveyData.add(ship.nav.waypointSymbol, data.surveys)
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
