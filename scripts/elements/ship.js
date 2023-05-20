st.elements.ship = (() => {

   const render = ship => `
<div class="ship datacard
      ${ship.extracting ? 'extracting' : ''}
      ${ship.surveying ? 'surveying' : ''}">
   <h3>${ship.symbol}</h3>

   <p>${ship.nav.status === 'IN_TRANSIT'
      ? (new Date() < new Date(ship.nav.route.arrival)
         ? 'Navigating to '
            +  ship.nav.route.destination.type
            + ` <a href="" data-id="${ship.nav.route.destination.symbol}">${ship.nav.route.destination.symbol}</a>`
            + `, arriving in `
            + Math.round((new Date(ship.nav.route.arrival) - new Date()) / 1000)
            + ' seconds)'
         : `<a href="" data-id="${ship.nav.route.destination.symbol}">${ship.nav.route.destination.symbol}</a>`)
      : (ship.nav.status === 'IN_ORBIT' ? 'Orbiting' : 'Docked at')
         + ` <a href="" data-id="${ship.nav.waypointSymbol}">${ship.nav.waypointSymbol}</a>`}</p>

   <details>
      <summary>Navigation</summary>
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

   <details>
      <summary>Crew</summary>
      <dl>
         <dt>Current</dt>
         <dd>${ship.crew.current} of ${ship.crew.capacity} (${ship.crew.current} required)</dd>
         <dt>Rotation</dt>
         <dd>${ship.crew.rotation}</dd>
         <dt>Morale</dt>
         <dd>${ship.crew.morale}</dd>
         <dt>Wages</dt>
         <dd>${ship.crew.wages}</dd>
      </dl>
   </details>

   <details>
      <summary>Fuel</summary>
      <dl>
         <dt>Current</dt>
         <dd>${ship.fuel.current} of ${ship.fuel.capacity}</dd>
         <dt>Consumed</dt>
         <dd>${ship.fuel.consumed.amount} at ${new Date(ship.fuel.consumed.timestamp).toLocaleString()}</dd>
      </dl>
   </details>

   <details>
      <summary>Frame</summary>
      <dl>
         <dt>Name</dt>
         <dd>${ship.frame.name} (${ship.frame.symbol})</dd>
         <dt>Description</dt>
         <dd>${ship.frame.description}</dd>
         <dt>Module slots</dt>
         <dd>${ship.frame.moduleSlots}</dd>
         <dt>Mounting points</dt>
         <dd>${ship.frame.mountingPoints}</dd>
         <dt>Fuel capacity</dt>
         <dd>${ship.frame.fuelCapacity}</dd>
         <dt>Condition</dt>
         <dd>${ship.frame.condition}</dd>
         <dt>Required power</dt>
         <dd>${ship.frame.requirements.power}</dd>
         <dt>Required crew</dt>
         <dd>${ship.frame.requirements.crew}</dd>
      </dl>
   </details>

   <details>
      <summary>Reactor</summary>
      <dl>
         <dt>Name</dt>
         <dd>${ship.reactor.name} (${ship.reactor.symbol})</dd>
         <dt>Description</dt>
         <dd>${ship.reactor.description}</dd>
         <dt>Condition</dt>
         <dd>${ship.reactor.condition}</dd>
         <dt>Power output</dt>
         <dd>${ship.reactor.powerOutput}</dd>
         <dt>Required crew</dt>
         <dd>${ship.reactor.requirements.crew}</dd>
      </dl>
   </details>

   <details>
      <summary>Engine</summary>
      <dl>
         <dt>Name</dt>
         <dd>${ship.engine.name} (${ship.engine.symbol})</dd>
         <dt>Description</dt>
         <dd>${ship.engine.description}</dd>
         <dt>Condition</dt>
         <dd>${ship.engine.condition}</dd>
         <dt>Speed</dt>
         <dd>${ship.engine.speed}</dd>
         <dt>Required power</dt>
         <dd>${ship.engine.requirements.power}</dd>
         <dt>Required crew</dt>
         <dd>${ship.engine.requirements.crew}</dd>
      </dl>
   </details>

   <details>
      <summary>Modules</summary>
      <div class="wrapping-row">
         ${ship.modules.map(mod => `
         <dl title="${mod.description}">
            <dt>Name</dt>
            <dd title="${mod.symbol}">${mod.name}</dd>

            ${mod.capacity ?
            `<dt>Capacity</dt>
            <dd>${mod.capacity}</dd>`
            : ''}

            ${mod.range ?
            `<dt>Range</dt>
            <dd>${mod.range}</dd>`
            : ''}

            <dt>Requirements</dt>
            <dd>Power: ${mod.requirements.power}, Crew: ${mod.requirements.crew}, Slots: ${mod.requirements.slots}</dd>
         </dl>`).join('')}
      </div>
   </details>

   <details>
      <summary>Mounts</summary>
      <div class="wrapping-row">
         ${ship.mounts.map(mount => `
         <dl title="${mount.description}">
            <dt>Name</dt>
            <dd title="${mount.symbol}">${mount.name}</dd>
            <dt>Strength</dt>
            <dd>${mount.strength}</dd>

            ${mount.deposits ?
            `<dt>Deposits</dt>
            <dd>${mount.deposits.join(', ')}</dd>`
            : ''}

            <dt>Requirements</dt>
            <dd>Power: ${mount.requirements.power}, Crew: ${mount.requirements.crew}</dd>
         </dl>`).join('')}
      </div>
   </details>

   <dl>
      <dt>Cargo</dt>
      <dd>${ship.cargo.units} of ${ship.cargo.capacity}</dd>
   </dl>

   <div class="wrapping-row">
      ${ship.cargo.inventory.map(inv => `
      <dl title="${inv.description}">
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
