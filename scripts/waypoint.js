st.waypoint = (() => {
   const $pre = dbi('pre-waypoint')
   const $button = dbi('way-load')
   $button.onclick = () => load()

   const load = async system => {
      if (!system) {
         const headquarters = st.agent.data.headquarters
         system = headquarters.replace(/-[^-]*$/, '')
      }
      const $header = dbt(st.view.current, 'h2')
      $header.textContent = `System: ${system}`
      const { data } = await st.api.get(`systems/${system}/waypoints`)
      $pre.textContent = JSON.stringify(data, null, 2)
      st.view.update()
   }

   return { load }
})()
