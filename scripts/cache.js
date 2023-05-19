st.cache = (() => {
   const asnumber = key => {
      const cached = localStorage.getItem(key)
      return cached !== null ? Number(cached) : null
   }

   const read = key => {
      const s = localStorage.getItem(key)
      return s ? JSON.parse(s) : null
   }

   const write = (key, o) => localStorage.setItem(key, JSON.stringify(o))

   return {
      get token() { return localStorage.getItem('st.token') },
      set token(value) { localStorage.setItem('st.token', value) },
      removeToken() { localStorage.removeItem('st.token') },

      get view() { return asnumber('st.view') },
      set view(value) { localStorage.setItem('st.view', value) },

      read,
      write
   }
})()
