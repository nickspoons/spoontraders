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

<div class="seed-${seed}">
   ${waypointsData.data.map(wp => `
   <div class="waypoint">
      <h3 title="${split(wp.symbol).waypointID} - ${wp.faction.symbol}">
         ${split(wp.symbol).waypointID}
      </h3>
      <dl>
         <dt>Type</dt>
         <dd>${wp.type}</dd>
         <dt>Coordinates</dt>
         <dd>${wp.x}:${wp.y}</dd>

         ${wp.orbitals.length
         ? `<dt>Orbitals</dt>
         <dd>${wp.orbitals.map(o => `<a href="" data-id="${o.symbol}">${o.symbol}</a>`).join('')}</dd>`
         : ''}

         <dt>Chart submitted</dt>
         <dd>${new Date(wp.chart.submittedOn).toLocaleDateString()}, ${wp.chart.submittedBy}</dd>
      </dl>
      ${wp.traits.map(t => `<span class="trait" title="${t.symbol}: ${t.description}">${t.name}</span>`).join(', ')}
   </div>
`).join('')}
</div>

<style>
   .seed-${seed} {
      display: flex;
      flex-basis: 0;
      flex-direction: column;
      gap: 0.5em;
   }
   .seed-${seed} .waypoint {
      background-color: #1d2021;
      padding: 0.5em;
      border: 1px solid #ebdbb29a;;
      border-radius: 0.5em 0;
      position: relative;
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
