st.api = (() => {
   const burl = 'https://api.spacetraders.io/v2'

   const authHeader = () => st.state.token
      ? { Authorization: `Bearer ${st.state.token}` }
      : {}

   const request = async (url, options) => {
      let resp;
      try {
         resp = await fetch(`${burl}/${url}`, options)
      }
      catch (err) {
         return st.error.show(JSON.stringify(err))
      }
      if (!resp.ok)
         return st.error.showFromResponse(resp)
      return (await resp.json())
   }

   const get = async url => {
      return await request(url, {
         headers: authHeader()
      })
   }

   const post = async (url, payload) => {
      return await request(url, {
         method: 'POST',
         headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(payload)
      });
   }

   return { get, post }
})()
