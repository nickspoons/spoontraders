st.data.faction = (() => {

   let enriched = false // Factions have been enriched with reputation scores
   let factions = null

   const fetch = async factionSymbol => {
      const { data, meta } = await st.api.get('factions')
      if (meta.total > 10) alert(`TODO: something with meta`)
      factions = data
      if (factionSymbol)
         return factions.find(f => f.symbol === factionSymbol)
      return factions
   }

   const find = async factionSymbol =>
      factions
         ? factions.find(f => f.symbol === factionSymbol)
         : await fetch(factionSymbol)

   const findAll = async () => factions || await fetch()

   // Enrich with reputation scores
   const enrich = async force => {
      if (enriched && !force)
         return
      const { data, meta } = await st.api.get('my/factions')
      if (meta.total > 10) alert(`TODO: something with meta`)
      data.forEach(d => factions.find(f => f.symbol === d.symbol).reputation = d.reputation)
      enriched = true
   }

   return {
      find,
      findAll,
      enrich
   }
})()
