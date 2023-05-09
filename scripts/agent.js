st.agent = (() => {
   const $pre = dbi('pre-agent')
   const load = async () => {
      if (!st.state.token)
         return
      st.state.registered = true
      const data = await st.api.get('my/agent')
      const display = {
         handle: data.symbol,
         headquarters: data.headquarters,
         credits: data.credits
      }
      $pre.textContent = JSON.stringify(display, null, 2)
      st.view.update()
   }

   return { load }
})()
