st.storage = (() => {
   return {
      read: key => localStorage.getItem(key),
      remove: key => localStorage.removeItem(key),
      write: (key, value) => localStorage.setItem(key, value)
   }
})()
