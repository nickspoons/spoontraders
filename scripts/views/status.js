import { api } from '../api.js'
import { doc } from '../doc.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

export const load = async () => {
   view.loading = true
   const { ok, resp } = await api.get('')
   if (!ok) {
      console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      return
   }
   const data = resp
   const seed = utils.seed()
   view.current.innerHTML = `
<h2>Status</h2>
<p>${data.status}</p>

<dl>
   <dt>Agents</dt>
   <dd>${data.stats.agents}</dd>
   <dt>Ships</dt>
   <dd>${data.stats.ships}</dd>
   <dt>Systems</dt>
   <dd>${data.stats.systems}</dd>
   <dt>Waypoints</dt>
   <dd>${data.stats.waypoints}</dd>
</dl>

<hr>

<h2>Leaderboards</h2>

<div class="wrapping-row seed-${seed}">
   <div>
      <h3>Most credits</h3>
      <table>
         <tr><th>Agent</th><th>Credits</th></tr>
         ${data.leaderboards.mostCredits.map(stat => `
         <tr>
            <td>${stat.agentSymbol}</td>
            <td>${stat.credits.toLocaleString()}</td>
         </tr>`).join('')}
      </table>
   </div>
   <div>
      <h3>Most submitted charts</h3>
      <table>
         <tr><th>Agent</th><th>Chart count</th></tr>
         ${data.leaderboards.mostSubmittedCharts.map(stat => `
         <tr>
            <td>${stat.agentSymbol}</td>
            <td>${stat.chartCount.toLocaleString()}</td>
         </tr>`).join('')}
      </table>
   </div>
</div>
<style>
   .seed-${seed} table {
      max-width: 30em;
   }
   .seed-${seed} table tr *:last-child {
      text-align: right;
   }
</style>
<button id="btn-${seed}" class="refresh">Refresh</button>
`
   doc.byID(`btn-${seed}`).onclick = () => load()
   view.loading = false
}
