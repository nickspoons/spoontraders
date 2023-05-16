st.views.faction = (() => {
   const load = async () => {
      st.view.loading = true
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
`
      const hqlinks = dqss(`#factions-${seed} .faction a[data-id]`)
      hqlinks.forEach(link => link.onclick = ev => {
         ev.preventDefault()
         st.view.navigate(st.view.View.SYSTEM)
         st.views.system.load(link.dataset.id)
      })
      st.view.loading = false
   }

   return { load }
})()
