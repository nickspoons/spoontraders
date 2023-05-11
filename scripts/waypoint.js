st.waypoint = (() => {
   let current = null

   const $pre = dbi('pre-waypoint')
   const $button = dbi('way-load')
   $button.onclick = () => load()

   const re = /^(?<system>\w+-\w+)(-(?<waypoint>\w+))?/
   const split = waypoint => re.exec(waypoint).groups

   const load = async id => {
      let { system, waypoint } = split(id || st.agent.data.headquarters)
      const $header = dbt(st.view.current, 'h2')
      $header.textContent = `System: ${system}`
      let waypointsData = await st.api.get(`systems/${system}/waypoints`)
      if (waypointsData) {
         current = waypointsData.data
         $pre.textContent = JSON.stringify(current, null, 2)
         st.view.update()
      }
   }

   return { load }
})()
