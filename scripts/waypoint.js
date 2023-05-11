st.waypoint = (() => {
   let currentSystemID = null

   const re = /^(?<systemID>\w+-\w+)(-(?<waypointID>\w+))?/
   const split = waypoint => re.exec(waypoint).groups

   const renderSystem = async systemID => {
      st.view.loading = true
      let waypointsData = await st.api.get(`systems/${systemID}/waypoints`)
      if (!waypointsData)
         return
      currentSystemID = systemID

      const seed = genSeed()
      st.view.current.innerHTML = `
<h2>System: ${systemID}</h2>

${waypointsData.data.map((wp, i) => `
${i !== 0 ? `<hr>` : ''}
<dl>
  <dt>Waypoint</dt>
  <dd>${split(wp.symbol).waypointID} - ${wp.faction.symbol}</dd>
  <dt>Type</dt>
  <dd>${wp.type}</dd>
  <dt>Coordinates</dt>
  <dd>${wp.x}:${wp.y}</dd>
  <dt>Orbitals</dt>
  <dd>${wp.orbitals.map(o => `<a href="" data-id="${o.symbol}">${o.symbol}</a>`).join('')}</dd>
  <dt>Chart submitted</dt>
  <dd>${new Date(wp.chart.submittedOn).toLocaleDateString()}, ${wp.chart.submittedBy}</dd>
</dl>
${wp.traits.map(t => `<div class="trait" title="${t.description}">${t.symbol}: ${t.name}</div>`).join('')}

`).join('')}


<style>
  .seed-${seed} table {
    max-width: 30em;
  }
  .seed-${seed} table tr *:last-child {
    text-align: right;
  }
</style>
`
      // dbi(`btn-${seed}`).onclick = () => load()
      st.view.loading = false
   }

   const load = async id => {
      let { systemID, waypointID } = split(id || st.agent.data.headquarters)
      if (systemID !== currentSystemID)
         await renderSystem(systemID)
   }

   return { load }
})()
