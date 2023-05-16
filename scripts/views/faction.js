st.views.faction = (() => {
   const load = async () => {
      st.view.loading = true
      const { data } = await st.api.get('factions')
      const seed = st.seed()
      st.view.current.innerHTML = data.map(faction => `
<div class="faction ${faction.symbol === 'COSMIC' ? 'selected' : ''}"
      data-id="${faction.symbol}">
   <h3>${faction.name}</h3>
   <div class="details">
      <p>${faction.description}</p>

      ${faction.traits.map(t => `
      <details>
         <summary title="${t.symbol}">${t.name}</summary>
         <p>${t.description}</p>
      </details>`).join('')}

   </div>
</div>
`
      ).join('')
      st.view.loading = false
   }

   return { load }
})()
