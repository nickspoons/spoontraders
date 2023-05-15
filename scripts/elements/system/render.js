st.elements.system.render = (() => {

   const clearFloats = () => dbi('floating-waypoint').innerHTML = ''

   const floatWaypoint = (wp, point, orbitals) => {
      const floater = dbi('floating-waypoint')
      floater.innerHTML = waypoint(wp, orbitals)
      floater.style.top = `${point.y}px`
      floater.style.left = `${point.x}px`
      const frect = floater.getBoundingClientRect()
      const brect = document.body.getBoundingClientRect()
      if (frect.width >= brect.width - 4)
         floater.style.left = '2px'
      else if (floater.offsetLeft + frect.width >= brect.width - 4)
         floater.style.left = (brect.width - frect.width - 2) + 'px'
   }

   const waypointBody = wp => `
<h3 title="${wp.symbol} - ${wp.faction.symbol}"
      style="color: ${st.colors.waypoint[wp.type] || st.colors.waypoint.unknown}">
   ${wp.symbol}
</h3>
<dl title="${`
   Coordinates ${wp.x}:${wp.y}
   Chart submitted: ${new Date(wp.chart.submittedOn).toLocaleDateString()}, ${wp.chart.submittedBy}
`}">
   <dt>Type</dt>
   <dd>${wp.type}</dd>
</dl>
${wp.traits.map(t => `<span class="trait" title="${t.symbol}: ${t.description}">${t.name}</span>`).join(', ')}`

   const waypoint = (wp, orbitals) => `
<div class="waypoint">
   ${waypointBody(wp)}
   ${(orbitals || []).map(o => '<hr>' + waypointBody(o)).join('')}
</div>
`

   return {
      clearFloats,
      floatWaypoint,
      waypoint
   }
})()
