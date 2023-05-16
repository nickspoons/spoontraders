st.data.waypoint = (() => {

   let allwps = []
   let orbitals = {}
   let waypoints = {}
   let systems = {}

   const re = /^(?<systemID>\w+-\w+)(-(?<waypointID>\w+))?/
   const splitSymbol = waypointSymbol => re.exec(waypointSymbol).groups

   const fetch = async waypointSymbol => {
      const { systemID, waypointID } = splitSymbol(waypointSymbol)
      const { data, meta } = await st.api.get(`systems/${systemID}/waypoints`)
      if (meta.total > 10) alert(`TODO: something with meta`)
      allwps = [
         ...allwps,
         ...data.filter(d => allwps.map(wp => wp.symbol).indexOf(d.symbol) < 0)
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
         || await fetch(waypointSymbol)

   const findInSystem = async symbol => {
      let { systemID } = splitSymbol(symbol)
      return systems[systemID]
         || await fetch(systemID)
   }

   return {
      find,
      findInSystem,
      splitSymbol
   }
})()
