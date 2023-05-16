st.elements.faction = (() => {

   const render = faction => `
<div class="faction datacard">
   <h3 title="${faction.symbol}">${faction.name}</h3>
   <div class="details">
      <p>${faction.description}</p>

      <dl>
         <dt>Headquarters</dt>
         <dd><a href="" data-id="${faction.headquarters}">${faction.headquarters}</a></dd>

         ${faction.reputation ? `
         <dt>Reputation</dt>
         <dd>${faction.reputation}</dd>` : ''}

      </dl>

      ${faction.traits.map(t => `
      <details>
         <summary title="${t.symbol}">${t.name}</summary>
         <p>${t.description}</p>
      </details>`).join('')}

   </div>
</div>
`

   return { render }
})()
