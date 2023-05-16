st.data.faction = (() => {

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

   return {
      find,
      findAll
   }
})()
