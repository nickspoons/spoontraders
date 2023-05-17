st.data.contract = (() => {

   let contracts = null

   const accept = async id => {
      const { agent } = await st.api.post(`my/contracts/${id}/accept`)
      // TODO: update/refresh agent with updated credits
      console.log(res)
   }

   const fetch = async () => {
      const { data, meta } = await st.api.get('my/contracts')
      if (meta.total > 10) alert(`TODO: something with meta`)
      contracts = data
      return contracts
   }

   const find = async refresh => (contracts && !refresh) ? contracts : await fetch()

   return {
      accept,
      find
   }
})()
