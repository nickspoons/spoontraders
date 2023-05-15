st.elements.system.render = (() => {

   const clearFloats = () => dbi('floating-waypoint').innerHTML = ''

   const floatWaypoint = (wp, point) => {
      const floater = dbi('floating-waypoint')
      floater.innerHTML = waypoint(wp)
      floater.style.top = `${point.y}px`
      floater.style.left = `${point.x}px`
      const frect = floater.getBoundingClientRect()
      const brect = document.body.getBoundingClientRect()
      if (frect.width >= brect.width - 4)
         floater.style.left = '2px'
      else if (floater.offsetLeft + frect.width >= brect.width - 4)
         floater.style.left = (brect.width - frect.width - 2) + 'px'
   }

   const waypoint = wp => `
<div class="waypoint">
   <h3 title="${wp.symbol} - ${wp.faction.symbol}">${wp.symbol}</h3>
   <dl>
      <dt>Type</dt>
      <dd>${wp.type}</dd>
      <dt>Coordinates</dt>
      <dd>${wp.x}:${wp.y}</dd>
      <dt>Chart submitted</dt>
      <dd>${new Date(wp.chart.submittedOn).toLocaleDateString()}, ${wp.chart.submittedBy}</dd>
   </dl>
   ${wp.traits.map(t => `<span class="trait" title="${t.symbol}: ${t.description}">${t.name}</span>`).join(', ')}
</div>
`

   return {
      clearFloats,
      floatWaypoint,
      waypoint
   }
})()
