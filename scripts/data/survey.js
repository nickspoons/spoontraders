st.data.survey = (() => {

   let surveys = st.cache.read('st.surveys') || {}
   let sizes = {
      SMALL: 0.8,
      MODERATE: 1.0,
      LARGE: 1.2
   };

   const _score = (survey, tradeGoods, targets) => {
      let score = 0
      survey.deposits.forEach(d => {
         const tradeGood = tradeGoods.find(tg => tg.symbol === d.symbol)
         if (tradeGood) {
            let price = tradeGood.sellPrice
            if (targets && targets.indexOf(tradeGood.symbol) >= 0)
               price += 50
            else if (targets)
               price -= 5
            score += price * sizes[survey.size]
         }
         else {
            score -= 50
            alert(`Unknown tradeGood ${d.symbol}`)
         }
      })
      return score
   }

   const add = (waypointSymbol, newSurveys) => {
      surveys[waypointSymbol] = [...(surveys[waypointSymbol] || []), ...newSurveys]
         .filter(s => new Date(s.expiration) > new Date)
      st.cache.write('st.surveys', surveys)
   }

   const find = async (waypointSymbol, targets) => {
      let found = await findAll(waypointSymbol, targets)
      const withDiamonds = found.find(s => s.survey.deposits.indexOf('DIAMONDS') >= 0)
      if (withDiamonds) {
         console.log('================================= Diamonds! =================================')
         console.log('================================= Diamonds! =================================')
         console.log('================================= Diamonds! =================================')
      }
      return found.length > 0 ? found[0] : null
   }

   const findAll = async (waypointSymbol, targets) => {
      const { tradeGoods } = await st.data.waypoint.market(waypointSymbol)
      surveys[waypointSymbol] = (surveys[waypointSymbol] || [])
         .filter(s => new Date(s.expiration) > new Date)
      st.cache.write('st.surveys', surveys)
      let found = surveys[waypointSymbol]
      found.sort((a, b) => _score(b, tradeGoods, targets) - _score(a, tradeGoods, targets))
      return found.map(s => ({
         survey: s,
         score: _score(s, tradeGoods, targets)
      }))
   }

   return {
      add,
      find,
      findAll
   }
})()
