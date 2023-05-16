(() => {

   const addFactionHandlers = $factions => {
      const factionDivs = dqss(`#${$factions.id} > div`)
      factionDivs.forEach(factionDiv =>
         factionDiv.onclick = () => {
            factionDivs.forEach(f => f.classList.remove('selected'))
            factionDiv.classList.add('selected')
         })
   }

   const loadFactions = async $factions => {
      const factions = await st.data.faction.findAll()
      $factions.innerHTML = factions.map(faction => `
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
      addFactionHandlers($factions)
   }

   const saveToken = async token => {
      st.state.token = token
      if (!await st.views.agent.load())
         return
      st.cache.token = token
      st.state.registered = true
      st.view.navigate(st.view.View.AGENT)
   }
   const seed = st.seed()

   st.view.get(st.view.View.REGISTRATION).innerHTML = `
<div class="wrapping-row seed-${seed}">

   <form id="reg-form">
      <h2>You need to register</h2>
      <label for="reg-handle">Choose a handle</label>
      <input placeholder="Handle" id="reg-handle" name="reg-handle" required />
      <label>Select a faction</label>
      <div id="factions-${seed}">
         <div class="faction selected" data-id="COSMIC">
            <h3>Cosmic Engineers</h3>
         </div>
      </div>
      <button type="submit">
         Register
      </button>
   </form>

   <form id="ver-form">
      <h2>... or enter an access token</h2>
      <label for="ver-token">Access token</label>
      <input placeholder="Access token" id="ver-token" name="ver-token" required />
      <button type="submit">
         Verify
      </button>
   </form>

</div>
<style>
   .seed-${seed} form {
      display: flex;
      flex-direction: column;
   }
   .seed-${seed} label {
      font-size: smaller;
      margin-top: 0.5em;
      opacity: 0.6;
   }
   .seed-${seed} input {
      max-width: 20em;
   }
   .seed-${seed} button {
      place-self: flex-start;
   }

   #factions-${seed} .faction {
      border: 1px solid ${st.colors.borderDim};
      border-bottom-color: transparent;
      cursor: pointer;
      max-width: 20em;
      padding: 0.3em;
   }
   #factions-${seed} .faction:first-child {
      border-radius: 0.3em 0.3em 0 0;
   }
   #factions-${seed} .faction:last-child {
      border-radius: 0 0 0.3em 0.3em;
      border-bottom-color: ${st.colors.borderDim};
   }
   #factions-${seed} .faction.selected {
      border-color: ${st.colors.borderBright};
   }
   #factions-${seed} .faction h3 {
      font-size: 1em;
      margin: 0;
   }
   #factions-${seed} .faction .details {
      display: none;
   }
   #factions-${seed} .faction.selected .details {
      display: block;
   }
</style>
`
   const $regForm = dbi('reg-form')
   const $handle = dbi('reg-handle')
   $regForm.onsubmit = async ce => {
      ce.preventDefault()
      const symbol = $handle.value
      const faction = dqs(`#factions-${seed} > div.selected`).dataset.id
      const regData = await st.api.post('register', { symbol, faction })
      if (regData && regData.data)
         await saveToken(regData.data.token)
   }
   const $factions = dbi(`factions-${seed}`)
   addFactionHandlers($factions)
   loadFactions($factions)

   const $verForm = dbi('ver-form')
   const $verToken = dbi('ver-token')
   $verForm.onsubmit = async ce => {
      ce.preventDefault()
      await saveToken($verToken.value)
   }
})()
