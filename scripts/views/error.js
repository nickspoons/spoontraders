import { state } from '../globals.js'
import { view } from '../view.js'

export const error = (() => {
   let _lastError

   const show = err => {
      _lastError = err
      state.error = true
      view.update()
      view.current.innerHTML =
         `<pre>${typeof(err) === 'string' ? err : JSON.stringify(err, null, 2)}</pre>`
      return null
   }
   const showFromResponse = async resp => {
      const err = await resp.json()
      const msg = `
[${resp.status}] ${resp.statusText}
${JSON.stringify(err, null, 2)}`
      show(msg.trim())
      _lastError = err
      return null
   }

   return {
      get lastError() { return _lastError },
      show,
      showFromResponse
   }
})()
