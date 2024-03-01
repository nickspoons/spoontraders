st.views.faction = (() => {
   const load = async forceRefresh => {
      st.view.loading = true
      await st.data.faction.enrich(forceRefresh)
      const factions = await st.data.faction.findAll()
      const seed = st.seed()
      st.view.current.innerHTML = `
<h2>Factions</h2>

<div id="factions-${seed}">
   ${factions.map(f => st.elements.faction.render(f)).join('')}
</div>

<style>
   #factions-${seed} .faction {
      margin-bottom: 2em;
   }
   #factions-${seed} .faction:last-child {
      margin-bottom: 0;
   }
   @media all and (max-width: 30em) {
      #factions-${seed} .faction {
         margin-bottom: 1em;
      }
   }
</style>
<button id="btn-${seed}" class="refresh">Refresh</button>
`
      dbi(`btn-${seed}`).onclick = () => load(true)
      const hqlinks = dqss(`#factions-${seed} .faction a[data-id]`)
      hqlinks.forEach(link => link.onclick = ev => {
         ev.preventDefault()
         st.view.navigate(st.view.View.SYSTEM, { skipActivation: true })
         st.views.system.load(link.dataset.id)
      })
      st.view.loading = false
   }

   return { load }
})()
