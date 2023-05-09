st.error = (() => {
   const $pre = dbi('pre-error')
   const show = err => {
      $pre.textContent = err
      st.state.error = true
      st.view.update()
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
