st.status = (() => {
   const load = async () => {
      st.view.loading = true
      const data = await st.api.get('')
      const seed = genSeed()
      st.view.current.innerHTML = `
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
      ${data.leaderboards.mostCredits.map(i => `
      <tr>
        <td>${i.agentSymbol}</td>
        <td>${i.credits.toLocaleString()}</td>
      </tr>`).join('')}
    </table>
  </div>
  <div>
    <h3>Most submitted charts</h3>
    <table>
      <tr><th>Agent</th><th>Chart count</th></tr>
      ${data.leaderboards.mostSubmittedCharts.map(i => `
      <tr>
        <td>${i.agentSymbol}</td>
        <td>${i.chartCount.toLocaleString()}</td>
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
      dbi(`btn-${seed}`).onclick = () => load()
      st.view.loading = false
   }

   return { load }
})()
