st.status = (() => {
   const load = async () => {
      const data = await st.api.get('')
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

<h2>Leaderboards</h2>

<div class="wrapping-row">
  <div>
    <h3>Most credits</h3>
    ${totable(
       data.leaderboards.mostCredits,
       i => `<td>${i.agentSymbol}</td><td style="text-align: right">${i.credits.toLocaleString()}</td>`,
       '<th>Agent</th><th style="text-align: right">Credits</th>')}
  </div>
  <div>
    <h3>Most submitted charts</h3>
    ${totable(
       data.leaderboards.mostSubmittedCharts,
       i => `<td>${i.agentSymbol}</td><td style="text-align: right">${i.chartCount.toLocaleString()}</td>`,
       '<th>Agent</th><th style="text-align: right">Chart count</th>')}
  </div>
</div>
`
      st.view.update()
   }

   return { load }
})()
