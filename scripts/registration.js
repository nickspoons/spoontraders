(() => {
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
      if (!await st.agent.load())
         return
      localStorage.setItem('access_token', token)
      st.state.registered = true
      st.view.update()
   }
})()
