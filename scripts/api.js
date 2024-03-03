import { state } from './globals.js'

import { error } from './views/error.js'

export const api = (() => {
   const burl = 'https://api.spacetraders.io/v2'

   const authHeader = () => state.token
      ? { Authorization: `Bearer ${state.token}` }
      : {}

   const request = async (url, options) => {
      let resp;
      try {
         resp = await fetch(`${burl}/${url}`, options)
      }
      catch (err) {
         return error.show(err)
      }
      return {
         ok: resp.ok,
         resp: await resp.json()
      }
   }

   const get = async url => {
      return await request(url, {
         headers: authHeader()
      })
   }

   const getAll = async (url) => {
      const limit = 20
      const geturl = page => { return `${url}?limit=${limit}&page=${page}` }
      let page = 1
      console.debug(`Fetching ${url} page ${page}`)
      let { ok, resp } = await get(geturl(page++))
      let combined = ok ? resp.data : []
      while (ok && resp.meta.page * limit < resp.meta.total) {
         console.debug(`Fetching ${url} page ${page} of ${Math.ceil(resp.meta.total / limit)}`);
         ({ ok, resp } = await get(geturl(page++)))
         combined = [ ...combined, ...resp.data ]
      }
      resp.data = combined
      return { ok, resp }
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

   return { get, getAll, post }
})()
