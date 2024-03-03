import { cache } from './cache.js'
import { state } from './globals.js'
import { view } from './view.js'

import { load as loadAgent } from './views/agent.js'
import { load as loadRegistration } from './views/registration.js'

(async () => {
   await loadRegistration()
   state.token = cache.token
   if (state.token && await loadAgent())
      state.registered = true
   else if (state.token)
      state.token = null
   await view.navigate(-1)
   view.loading = false
})()
