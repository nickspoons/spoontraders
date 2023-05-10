(async () => {
   st.state.token = localStorage.getItem('access_token')
   if (st.state.token) {
      st.state.registered = true
      await st.agent.load()
   }
   st.view.update()
   st.view.loading = false
})()
