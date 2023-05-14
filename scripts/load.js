(async () => {
   st.state.token = st.cache.token
   if (st.state.token && await st.views.agent.load())
      st.state.registered = true
   else if (st.state.token)
      st.state.token = null
   await st.view.navigate(-1)
   st.view.loading = false
})()
