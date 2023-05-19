st.data.contract = (() => {

   let contracts = null

   const _fetch = async () => {
      const { data, meta } = await st.api.get('my/contracts')
      if (meta.total > 10) alert(`TODO: something with meta`)
      contracts = data
      return contracts
   }

   const accept = async id => {
      const { agent } = await st.api.post(`my/contracts/${id}/accept`)
      // TODO: update/refresh agent with updated credits
      console.log(res)
   }

   const deliver = async (id, shipSymbol) => {
      const contract = await find(id)
      let ship = await st.data.ship.find(shipSymbol)
      let sourceSymbol = null
      const delivery = contract.terms.deliver.find(d => {
         const cargo = ship.cargo.inventory.find(i => i.symbol === d.tradeSymbol)
         return cargo && cargo.units > 0
      })
      if (ship.nav.waypointSymbol !== delivery.destinationSymbol) {
         sourceSymbol = ship.nav.waypointSymbol
         console.log(`Navigating to ${delivery.destinationSymbol}`)
         await new Promise(async resolve =>
            await st.data.ship.navigate(shipSymbol, delivery.destinationSymbol, resolve))
      }
      if (sourceSymbol || ship.nav.status !== 'DOCKED') {
         console.log(`Docking`)
         await st.data.ship.dock(shipSymbol)
         await st.data.ship.refuel(shipSymbol)
         console.log(`Delivering`)
      }
      const tradeSymbol = delivery.tradeSymbol
      const units = ship.cargo.inventory.find(i => i.symbol === tradeSymbol).units
      const payload = { shipSymbol, tradeSymbol, units }
      const { data } = await st.api.post(`my/contracts/${id}/deliver`, payload)
      ship.cargo = data.cargo
      if (sourceSymbol) {
         console.log(`Navigating to ${sourceSymbol}`)
         await new Promise(async resolve =>
            await st.data.ship.navigate(shipSymbol, sourceSymbol, resolve))
         await st.data.ship.dock(shipSymbol)
         await st.data.ship.refuel(shipSymbol)
      }
   }

   const find = async id =>
      (contracts ? contracts : await _fetch())
         .find(c => c.id === id)

   const findAll = async refresh => (contracts && !refresh) ? contracts : await _fetch()

   return {
      accept,
      find,
      findAll,
      deliver
   }
})()
