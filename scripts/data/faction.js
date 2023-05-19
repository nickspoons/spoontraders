st.data.faction = (() => {

   let enriched = false // Factions have been enriched with reputation scores
   let factions = null

   const _fetch = async factionSymbol => {
      const { ok, resp } = await st.api.get('factions')
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         return []
      }
      factions = resp.data
      if (factionSymbol)
         return factions.find(f => f.symbol === factionSymbol)
      return factions
   }

   const find = async factionSymbol =>
      factions
         ? factions.find(f => f.symbol === factionSymbol)
         : await _fetch(factionSymbol)

   const findAll = async () => factions || await _fetch()

   // Enrich with reputation scores
   const enrich = async force => {
      if (enriched && !force)
         return
      const { ok, resp } = await st.api.get('my/factions')
      if (!ok) {
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
         return
      }
      resp.data.forEach(d => factions.find(f => f.symbol === d.symbol).reputation = d.reputation)
      enriched = true
   }

   return {
      find,
      findAll,
      enrich
   }
})()
