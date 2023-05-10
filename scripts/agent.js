st.agent = (() => {
   let _data = null

   const $pre = dbi('pre-agent')
   const load = async () => {
      if (!st.state.token)
         return
      const agentData = await st.api.get('my/agent')
      if (!agentData)
         return false
      _data = agentData.data
      const display = {
         handle: _data.symbol,
         headquarters: _data.headquarters,
         credits: _data.credits
      }
      $pre.textContent = JSON.stringify(display, null, 2)
      return true
   }

   return {
      get data() { return _data },
      load
   }
})()
