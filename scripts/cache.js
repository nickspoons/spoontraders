import { storage } from './storage.js'

const asnumber = key => {
   const cached = storage.read(key)
   return cached !== null ? Number(cached) : null
}

const read = key => {
   const s = storage.read(key)
   return s ? JSON.parse(s) : null
}

const write = (key, o) => storage.write(key, JSON.stringify(o))

export const cache = {
   get token() { return storage.read('st.token') },
   set token(value) { storage.write('st.token', value) },
   removeToken() { storage.remove('st.token') },

   get view() { return asnumber('st.view') },
   set view(value) { storage.write('st.view', value) },

   read,
   write
}
