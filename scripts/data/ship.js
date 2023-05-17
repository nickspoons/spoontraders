st.data.ship = (() => {

   let ships = null

   const fetch = async () => {
      const { data, meta } = await st.api.get('my/ships')
      if (meta.total > 10) alert(`TODO: something with meta`)
      ships = data
      return ships
   }

   const find = async refresh => (ships && !refresh) ? ships : await fetch()

   return { find }
})()
