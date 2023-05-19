st.data.waypoint = (() => {

   let allwps = []
   let markets = st.cache.read('st.waypoint-markets') || {}
   let orbitals = {}
   let waypoints = {}
   let systems = {}

   const _fetch = async waypointSymbol => {
      const { systemID, waypointID } = splitSymbol(waypointSymbol)
      const { ok, resp } = await st.api.get(`systems/${systemID}/waypoints`)
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         return null
      }
      allwps = [
         ...allwps,
         ...resp.data.filter(d => allwps.map(wp => wp.symbol).indexOf(d.symbol) < 0)
      ]
      const osymbols = allwps.map(wp => wp.orbitals.map(wo => wo.symbol)).flat()
      const orbs = allwps.filter(wp => osymbols.indexOf(wp.symbol) >= 0)
      const wps = allwps
         .filter(wp => osymbols.indexOf(wp.symbol) < 0)
         .map(wp => ({
            ...wp,
            orbitals: wp.orbitals.map(wo => orbs.find(o => o.symbol === wo.symbol))
         }))
      waypoints = Object.fromEntries(
         wps.map(wp => [ wp.symbol, wp ]))
      orbitals = Object.fromEntries(
         osymbols.map(osym => [
            osym,
            wps.find(wp => wp.orbitals.map(o => o.symbol).indexOf(osym) >= 0).symbol
         ]))
      systems[systemID] = wps.filter(wp => splitSymbol(wp.symbol).systemID === systemID)
      if (waypointID)
         return waypoints[waypointSymbol]
            || waypoints[orbitals[waypointSymbol]]
      return systems[systemID]
   }

   const find = async waypointSymbol =>
      waypoints[waypointSymbol]
         || waypoints[orbitals[waypointSymbol]]
         || await _fetch(waypointSymbol)

   const findInSystem = async symbol => {
      let { systemID } = splitSymbol(symbol)
      return systems[systemID]
         || await _fetch(systemID)
   }

   const market = async waypointSymbol => {
      const { systemID } = splitSymbol(waypointSymbol)
      const { ok, resp } = await st.api.get(`systems/${systemID}/waypoints/${waypointSymbol}/market`)
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         return []
      }
      if (resp.data.tradeGoods || !(waypointSymbol in markets)) {
         markets[waypointSymbol] = resp.data
         st.cache.write('st.waypoint-markets', markets)
      }
      return markets[waypointSymbol]
   }

   const re = /^(?<systemID>\w+-\w+)(-(?<waypointID>\w+))?/
   const splitSymbol = waypointSymbol => re.exec(waypointSymbol).groups

   return {
      find,
      findInSystem,
      market,
      splitSymbol
   }
})()
