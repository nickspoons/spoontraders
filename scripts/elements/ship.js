st.elements.ship = (() => {

   const render = ship => `
<div class="ship datacard">
   <h3>${ship.symbol}</h3>
   <pre>${JSON.stringify(ship, null, 2)}</pre>
</div>
`

   return { render }
})()
