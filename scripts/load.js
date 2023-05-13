(async () => {
   st.state.token = st.cache.token
   if (st.state.token) {
      st.state.registered = true
      await st.agent.load()
   }
   await st.view.navigate(-1)
   st.view.loading = false
})()
