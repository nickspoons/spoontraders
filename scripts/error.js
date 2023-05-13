st.error = (() => {
   const show = err => {
      st.state.error = true
      st.view.update()
      st.view.current.innerHTML = `<pre>${err}</pre>`
      return null
   }
   const showFromResponse = async resp => {
      const msg = `
[${resp.status}] ${resp.statusText}
${JSON.stringify(await resp.json(), null, 2)}`
      return show(msg.trim())
   }

   return { show, showFromResponse }
})()
