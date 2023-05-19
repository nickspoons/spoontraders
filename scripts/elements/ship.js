st.elements.ship = (() => {

   const render = ship => `
<div class="ship datacard
      ${ship.extracting ? 'extracting' : ''}
      ${ship.surveying ? 'surveying' : ''}">
   <h3>${ship.symbol}</h3>

   <details>
      <summary>nav</summary>
      <dl>
         <dt>Waypoint</dt>
         <dd><a href="" data-id="${ship.nav.waypointSymbol}">${ship.nav.waypointSymbol}</a></dd>
         <dt>Status</dt>
         <dd>${ship.nav.status}</dd>
         <dt>Flight mode</dt>
         <dd>${ship.nav.flightMode}</dd>
         <dt>Departure</dt>
         <dd title="${new Date(ship.nav.route.departureTime).toLocaleString()}"
            ><a href=""
               data-id="${ship.nav.route.departure.symbol}"
            >${ship.nav.route.departure.symbol}</a> (${ship.nav.route.departure.type})
         </dd>
         <dt>Destination</dt>
         <dd title="${new Date(ship.nav.route.arrival).toLocaleString()}"
            ><a href=""
               data-id="${ship.nav.route.destination.symbol}"
            >${ship.nav.route.destination.symbol}</a> (${ship.nav.route.destination.type})
         </dd>
      </dl>
   </details>

   <dl>
      <dt>Cargo</dt>
      <dd>${ship.cargo.units} of ${ship.cargo.capacity}</dd>
   </dl>

   <div class="wrapping-row">
      ${ship.cargo.inventory.map(inv => `
      <dl class="cargo" title="${inv.description}">
         <dt>Name</dt>
         <dd title="${inv.symbol}">${inv.name}</dd>
         <dt>Units</dt>
         <dd>${inv.units}</dd>
      </dl>`).join('')}
   </div>

   <details>
      <summary>Full JSON</summary>
      <pre>${JSON.stringify(ship, null, 2)}</pre>
   </details>

</div>
`

   return { render }
})()
