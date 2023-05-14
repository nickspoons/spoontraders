st.views.agent = (() => {
   const thisView = st.view.View.AGENT

   const load = async () => {
      const agentData = await st.api.get('my/agent')
      if (!agentData)
         return false
      const data = agentData.data
      st.agent.headquarters = data.headquarters
      const seed = st.seed()
      st.view.get(thisView).innerHTML = `
<h2>${data.symbol}</h2>

<dl>
   <dt>Headquarters</dt>
   <dd><a href="" id="a-${seed}">${data.headquarters}</a></dd>
   <dt>Credits</dt>
   <dd>${data.credits}</dd>
</dl>
`
      dbi(`a-${seed}`).onclick = ce => {
         ce.preventDefault()
         st.view.navigate(st.view.View.WAYPOINT)
         st.views.waypoint.load(data.headquarters)
      }
      return true
   }

   return { load }
})()
