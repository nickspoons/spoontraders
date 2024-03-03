import { api } from '../api.js'

export const contract = (() => {

   let contracts = null

   const _fetch = async () => {
      const { ok, resp } = await api.get('my/contracts')
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         return []
      }
      contracts = resp.data
      return contracts
   }

   const accept = async id => {
      const { ok, resp } = await api.post(`my/contracts/${id}/accept`)
      if (!ok)
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      else
      // TODO: update/refresh agent with updated credits
      console.log(resp)
   }

   const deliver = async (id, shipSymbol) => {
      // const contract = await find(id)
      // let ship = await st.data.ship.find(shipSymbol)
      // let sourceSymbol = null
      // const delivery = contract.terms.deliver.find(d => {
      //    const cargo = ship.cargo.inventory.find(i => i.symbol === d.tradeSymbol)
      //    return cargo && cargo.units > 0
      // })
      // if (ship.nav.waypointSymbol !== delivery.destinationSymbol) {
      //    sourceSymbol = ship.nav.waypointSymbol
      //    console.log(`Navigating to ${delivery.destinationSymbol}`)
      //    await new Promise(async resolve =>
      //       await st.data.ship.navigate(shipSymbol, delivery.destinationSymbol, resolve))
      // }
      // if (sourceSymbol || ship.nav.status !== 'DOCKED') {
      //    console.log(`Docking`)
      //    await st.data.ship.dock(shipSymbol)
      //    await st.data.ship.refuel(shipSymbol)
      //    console.log(`Delivering`)
      // }
      // const tradeSymbol = delivery.tradeSymbol
      // const units = ship.cargo.inventory.find(i => i.symbol === tradeSymbol).units
      // const payload = { shipSymbol, tradeSymbol, units }
      // const { ok, resp } = await api.post(`my/contracts/${id}/deliver`, payload)
      // if (!ok)
      //    console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      // else
      //    ship.cargo = resp.data.cargo
      // if (sourceSymbol) {
      //    console.log(`Navigating to ${sourceSymbol}`)
      //    await new Promise(async resolve =>
      //       await st.data.ship.navigate(shipSymbol, sourceSymbol, resolve))
      //    await st.data.ship.dock(shipSymbol)
      //    await st.data.ship.refuel(shipSymbol)
      // }
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
