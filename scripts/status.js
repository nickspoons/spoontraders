st.status = (() => {
   const $pre = dbi('pre-status')
   const $button = dbi('stat-load')
   $button.onclick = () => load()

   const load = async () => {
      const data = await st.api.get('')
      console.log(data)
      $pre.textContent = JSON.stringify(data, null, 2)
      st.view.update()
   }

   return { load }
})()
