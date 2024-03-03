import { api } from '../api.js'
import { cache } from '../cache.js'
import { doc } from '../doc.js'
import { agent, state } from '../globals.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

import { load as loadSystem } from './system.js'

const thisView = view.View.AGENT

export const load = async () => {
   const { ok, resp } = await api.get('my/agent')
   if (!ok) {
      console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      return false
   }
   if (!resp)
      return false
   const data = resp.data
   agent.headquarters = data.headquarters
   const seed = utils.seed()
   view.get(thisView).innerHTML = `
<h2>${data.symbol}</h2>

<dl>
   <dt>Headquarters</dt>
   <dd><a href="" id="a-${seed}">${data.headquarters}</a></dd>
   <dt>Credits</dt>
   <dd>${data.credits}</dd>
</dl>

<details>
   <summary>Access token</summary>
   <pre>${state.token}</pre>
</details>

<button id="button-${seed}">
   Log out
</button>
`
   doc.byID(`a-${seed}`).onclick = ce => {
      ce.preventDefault()
      view.navigate(view.View.SYSTEM, { skipActivation: true })
      loadSystem(data.headquarters)
   }
   doc.byID(`button-${seed}`).onclick = () => {
      cache.token = null
      state.token = null
      state.registered = false
      agent.headquarters = null
      view.navigate(view.View.REGISTRATION)

      view.update()
   }
   return true
}
