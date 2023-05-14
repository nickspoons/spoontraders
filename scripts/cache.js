st.cache = (() => {
   const asnumber = key => {
      const cached = localStorage.getItem(key)
      return cached !== null ? Number(cached) : null
   }

   return {
      get token() { return localStorage.getItem('st.token') },
      set token(value) { localStorage.setItem('st.token', value) },
      removeToken() { localStorage.removeItem('st.token') },

      get view() { return asnumber('st.view') },
      set view(value) { localStorage.setItem('st.view', value) }
   }
})()
