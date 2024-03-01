st.elements.waypoint = (() => {

   const renderDetails = wp => `
<h3 title="${wp.symbol} - ${wp.faction.symbol}"
      style="color: ${st.colours.waypoint[wp.type] || st.colours.waypoint.unknown}">
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

   const render = wp => `
<div class="waypoint datacard">
   ${renderDetails(wp)}
   ${wp.orbitals.map(o => '<hr>' + renderDetails(o)).join('')}
</div>
`

   return { render }
})()
