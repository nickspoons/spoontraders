st.agent = (() => {
   let _data = null

   const $pre = dbi('pre-agent')
   const load = async () => {
      const agentData = await st.api.get('my/agent')
      if (!agentData)
         return false
      _data = agentData.data
      const seed = genSeed()
      st.view.get(st.view.View.AGENT).innerHTML = `
<h2>${_data.symbol}</h2>

<dl>
   <dt>Headquarters</dt>
   <dd><a href="" id="a-${seed}">${_data.headquarters}</a></dd>
   <dt>Credits</dt>
   <dd>${_data.credits}</dd>
</dl>
`
      dbi(`a-${seed}`).onclick = ce => {
         ce.preventDefault()
         st.view.navigate(st.view.View.WAYPOINT)
         st.waypoint.load(_data.headquarters)
      }
      return true
   }

   return {
      get data() { return _data },
      load
   }
})()
