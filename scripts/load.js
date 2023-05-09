(async () => {
   st.state.token = localStorage.getItem('access_token')
   if (!st.state.token)
      st.state.loading = false
   else {
      st.state.registered = true
      await st.agent.load()
      st.state.loading = false
   }
   st.view.update()
})()
