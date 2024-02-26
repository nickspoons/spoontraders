st.cache = (() => {
   const asnumber = key => {
      const cached = st.storage.read(key)
      return cached !== null ? Number(cached) : null
   }

   const read = key => {
      const s = st.storage.read(key)
      return s ? JSON.parse(s) : null
   }

   const write = (key, o) => st.storage.write(key, JSON.stringify(o))

   return {
      get token() { return st.storage.read('st.token') },
      set token(value) { st.storage.write('st.token', value) },
      removeToken() { st.storage.remove('st.token') },

      get view() { return asnumber('st.view') },
      set view(value) { st.storage.write('st.view', value) },

      read,
      write
   }
})()
