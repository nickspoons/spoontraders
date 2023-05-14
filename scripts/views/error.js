st.views.error = (() => {
   let _lastError

   const show = err => {
      _lastError = err
      st.state.error = true
      st.view.update()
      st.view.current.innerHTML =
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
