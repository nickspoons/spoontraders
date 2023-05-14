(() => {
   const seed = genSeed()
   st.view.get(st.view.View.REGISTRATION).innerHTML = `
<div class="wrapping-row seed-${seed}">
   <form id="reg-form">
      <h2>You need to register</h2>
      <label for="reg-handle">Handle</label>
      <input placeholder="Handle" id="reg-handle" name="reg-handle" required />
      <label for="reg-faction">Faction</label>
      <input placeholder="Faction" id="reg-faction" name="reg-faction" value="COSMIC" required />
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
</style>
`
   const $regForm = dbi('reg-form')
   const $regHandle = dbi('reg-handle')
   const $regFaction = dbi('reg-faction')
   $regForm.onsubmit = async ce => {
      ce.preventDefault()
      const symbol = $regHandle.value
      const faction = $regFaction.value
      const regData = await st.api.post('register', { symbol, faction })
      if (regData && regData.data)
         await saveToken(regData.data.token)
   }

   const $verForm = dbi('ver-form')
   const $verToken = dbi('ver-token')
   $verForm.onsubmit = async ce => {
      ce.preventDefault()
      await saveToken($verToken.value)
   }

   const saveToken = async token => {
      st.state.token = token
      if (!await st.views.agent.load())
         return
      st.cache.token = token
      st.state.registered = true
      st.view.navigate(st.view.View.AGENT)
   }
})()
