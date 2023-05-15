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

<details>
   <summary>Access token</summary>
   <pre>${st.state.token}</pre>
</details>

<button id="button-${seed}">
   Log out
</button>
`
      dbi(`a-${seed}`).onclick = ce => {
         ce.preventDefault()
         st.view.navigate(st.view.View.WAYPOINT)
         st.views.waypoint.load(data.headquarters)
      }
      dbi(`button-${seed}`).onclick = () => {
         st.cache.token = null
         st.state.token = null
         st.state.registered = false
         st.agent.headquarters = null
         st.view.navigate(st.view.View.REGISTRATION)

         st.view.update()
      }
      return true
   }

   return { load }
})()
