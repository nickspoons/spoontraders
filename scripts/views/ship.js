st.views.ship = (() => {
   const load = async refresh => {
      st.view.loading = true
      const ships = await st.data.ship.findAll(refresh)
      const seed = st.seed()
      st.view.current.innerHTML = `
<h2>Ships</h2>

<div id="ship-${seed}">
   ${ships.map(ship => st.elements.ship.render(ship)).join('')}
</div>

<style>
   #ship-${seed} .ship .wrapping-row dl  {
      background-color: ${st.colors.backgroundMedium};
      border: 1px solid ${st.colors.border};
      border-radius: 0.3em 0;
      padding: 0.5em;
      flex-grow: 0;
   }
   #ship-${seed} .ship.extracting {
      border: 1px solid ${st.colors.active};
   }
   #ship-${seed} .ship.surveying {
      border: 1px solid ${st.colors.query};
   }
</style>

<button id="btn-${seed}" class="refresh">Refresh</button>
`
      dbi(`btn-${seed}`).onclick = () => load()
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
