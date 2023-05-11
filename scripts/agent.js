st.agent = (() => {
   let _data = null

   const $pre = dbi('pre-agent')
   const load = async () => {
      const agentData = await st.api.get('my/agent')
      if (!agentData)
         return false
      _data = agentData.data
      st.view.current.innerHTML = `
<h2>${_data.symbol}</h2>

<dl>
  <dt>Headquarters</dt>
  <dd>${_data.headquarters}</dd>
  <dt>Credits</dt>
  <dd>${_data.credits}</dd>
</dl>
`
      return true
   }

   return {
      get data() { return _data },
      load
   }
})()
