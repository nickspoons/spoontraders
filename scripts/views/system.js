st.views.system = (() => {
   let currentSystemID = null

   const load = async id => {
      let { systemID } = st.data.waypoint
         .splitSymbol(id || st.agent.headquarters)
      currentSystemID = systemID
      st.view.loading = true
      const seed = st.seed()
      st.view.current.innerHTML = `
<h2>System: ${systemID}</h2>
<canvas height="2000" width="2000" id="canvas-${seed}"></canvas>
`
      await st.elements.system.draw.system(dbi(`canvas-${seed}`), systemID, id)
      st.view.loading = false
   }

   return { load }
})()
