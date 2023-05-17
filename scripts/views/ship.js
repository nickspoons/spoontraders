st.views.ship = (() => {
   const load = async refresh => {
      st.view.loading = true
      const ships = await st.data.ship.find(refresh)
      const seed = st.seed()
      st.view.current.innerHTML = `
<h2>Ships</h2>

<div id="ship-${seed}">
   ${ships.map(ship => st.elements.ship.render(ship)).join('')}
</div>

<button id="btn-${seed}" class="refresh">Refresh</button>
`
      dbi(`btn-${seed}`).onclick = () => load(true)
      const hqlinks = dqss(`#ship-${seed} .ship a[data-id]`)
      hqlinks.forEach(link => link.onclick = ev => {
         ev.preventDefault()
         st.view.navigate(st.view.View.SYSTEM)
         st.views.system.load(link.dataset.id)
      })
      st.view.loading = false
   }

   return { load }
})()
