st.views.waypoint = (() => {
   let currentSystemID = null

   const re = /^(?<systemID>\w+-\w+)(-(?<waypointID>\w+))?/
   const split = waypoint => re.exec(waypoint).groups

   const renderSystem = async systemID => {
      st.view.loading = true
      let waypointsData = await st.api.get(`systems/${systemID}/waypoints`)
      if (!waypointsData)
         return
      const waypoints = waypointsData.data
      const meta = waypointsData.meta
      currentSystemID = systemID

      const seed = st.seed()
      st.view.current.innerHTML = `
<h2>System: ${systemID}</h2>

<label for="canvas-${seed}">${meta.limit} of ${meta.total} waypoints</label>
<canvas height="2000" width="2000" id="canvas-${seed}"></canvas>

<div class="seed-${seed}">
   ${waypoints.map(wp => st.elements.system.render.waypoint(wp)).join('')}
</div>

<style>
   #canvas-${seed} {
      border: 1px solid ${st.colors.border};
      width: 100%;
   }

   .seed-${seed} {
      display: flex;
      flex-basis: 0;
      flex-direction: column;
      gap: 0.5em;
   }
   .seed-${seed} .waypoint {
      background-color: ${st.colors.backgroundDark};
   }
</style>
`
      st.elements.system.draw.system(dbi(`canvas-${seed}`), waypoints)
      st.view.loading = false
   }

   const load = async id => {
      let { systemID, waypointID } = split(id || st.agent.headquarters)
      if (systemID !== currentSystemID)
         await renderSystem(systemID)
   }

   return { load }
})()
