(() => {
   const $regForm = dbi('reg-form')
   const $regHandle = dbi('reg-handle')
   const $regFaction = dbi('reg-faction')
   $regForm.onsubmit = async ce => {
      ce.preventDefault()
      const symbol = $regHandle.value
      const faction = $regFaction.value
      const data = await st.api.post('register', { symbol, faction })
      if (data) {
         await saveToken(data.token)
      }
   }

   const $verForm = dbi('ver-form')
   const $verToken = dbi('ver-token')
   $verForm.onsubmit = async ce => {
      await saveToken($verToken.value)
   }

   const saveToken = async token => {
      localStorage.setItem('access_token', token)
      st.state.token = token
      st.state.registered = true
      await st.agent.load()
      st.view.update()
   }
})()
