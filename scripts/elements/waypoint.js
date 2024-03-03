import { getColour } from '../globals.js'

const renderDetails = wp => `
<h3 title="${wp.symbol} - ${wp.faction.symbol}"
      style="color: ${getColour(wp)}">
   ${wp.symbol}
</h3>
<dl title="${`
   Coordinates ${wp.x}:${wp.y}
   Chart submitted: ${new Date(wp.chart.submittedOn).toLocaleDateString()}, ${wp.chart.submittedBy}
`}">
   <dt>Type</dt>
   <dd>${wp.type}</dd>
</dl>
${wp.ships.map(s => `
<dl>
   <dt>Ship</dt>
   <dd>${s.symbol}: ${s.nav.status}</dd>
</dl>`).join(', ')}
${wp.traits.map(t => `<span class="trait" title="${t.symbol}: ${t.description}">${t.name}</span>`).join(', ')}`

export const render = wp => `
<div class="waypoint datacard">
   ${renderDetails(wp)}
   ${wp.orbitals.map(o => '<hr>' + renderDetails(o)).join('')}
</div>
`
