st.views.contract = (() => {
   const load = async refresh => {
      st.view.loading = true
      const contracts = await st.data.contract.findAll(refresh)
      const seed = st.seed()
      st.view.current.innerHTML = `
<h2>Contracts</h2>

<div id="contract-${seed}">
   ${contracts.map(c => st.elements.contract.render(c)).join('')}
</div>

<style>
   #contract-${seed} .contract dl.deliver  {
      background-color: ${st.colors.backgroundMedium};
      border: 1px solid ${st.colors.border};
      border-radius: 0.3em 0;
      padding: 0.5em;
      flex-grow: 0;
   }
   #contract-${seed} .contract.accepted {
      border: 1px solid ${st.colors.active};
   }
   #contract-${seed} .contract.fulfilled {
      border: 1px solid ${st.colors.success};
   }
</style>

<button id="btn-${seed}" class="refresh">Refresh</button>
`
      dbi(`btn-${seed}`).onclick = () => load(true)
      const hqlinks = dqss(`#contract-${seed} .contract a[data-id]`)
      hqlinks.forEach(link => link.onclick = ev => {
         ev.preventDefault()
         st.view.navigate(st.view.View.SYSTEM)
         st.views.system.load(link.dataset.id)
      })
      const btns = dqss(`#contract-${seed} .contract button[data-id]`)
      btns.forEach(btn => btn.onclick = async ev => {
         ev.preventDefault()
         st.view.loading = true
         await st.data.contract.accept(btn.dataset.id)
         load(true)
      })
      st.view.loading = false
   }

   return { load }
})()
