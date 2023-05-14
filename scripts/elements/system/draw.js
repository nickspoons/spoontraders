st.elements.system = (() => {
   const offsetBy = 1000
   const scaleBy = 10

   const clear = ctx => {
      ctx.fillStyle = '#1d2021';
      ctx.fillRect(0, 0, offsetBy * 2, offsetBy * 2);
   }

   const getMouse = (canvas, ev) => {
      const raw = st.utils.canvas.getMouse(canvas, ev)
      return {
         x: Math.round((raw.x - offsetBy) / scaleBy),
         y: Math.round((raw.y - offsetBy) / scaleBy)
      }
   }

   const displayDetail = (canvas, wp) => {
      alert(`${wp.symbol} (${wp.type}) ${wp.orbitals.map(o => o.symbol).join(', ')}`)
   }

   const drawWaypoints = (ctx, wps, orbs) => {
      const circle = (waypoint, radius) =>
         ctx.arc(
            offsetBy + waypoint.x * scaleBy,
            offsetBy + waypoint.y * scaleBy,
            radius,
            0,
            2 * Math.PI)

      wps.forEach(wp => {
         ctx.beginPath()
         let radius = 0
         if (wp.type === 'PLANET') {
            ctx.fillStyle = `#b8bb26`
            radius = 50
         }
         else if (wp.type === 'GAS_GIANT') {
            ctx.fillStyle = `#79740e`
            radius = 80
         }
         else if (wp.type === 'ASTEROID_FIELD') {
            ctx.fillStyle = `#665c54`
            radius = 30
         }
         else if (wp.type === 'JUMP_GATE') {
            ctx.fillStyle = `#689d6a`
            radius = 30
         }
         else {
            ctx.fillStyle = `#fb4934`
            radius = 10
         }
         circle(wp, radius)
         ctx.fill()
         ctx.strokeStyle = '#f9f5d7'
         ctx.lineWidth = 5
         ctx.stroke()
         for (const wo of wp.orbitals) {
            const orb = orbs.find(ob => ob.symbol === wo.symbol)
            if (!orb) {
               alert(`Orbital ${wo.symbol} not found`)
               continue
            }
            ctx.beginPath()
            radius += 5
            ctx.lineWidth = 10
            if (orb.type === 'MOON')
               ctx.strokeStyle = `#83a598`
            else if (orb.type === 'ORBITAL_STATION')
               ctx.strokeStyle = `#b16286`
            else
               ctx.strokeStyle = `#fb4934`
            circle(wp, radius)
            ctx.stroke()
            ctx.beginPath()
            radius += 5
            circle(wp, radius)
            ctx.strokeStyle = '#f9f5d7'
            ctx.lineWidth = 5
            ctx.stroke()
         }
         wp.radius = radius / scaleBy
      })
   }

   const draw = (canvas, waypoints) => {
      const ctx = canvas.getContext('2d');
      clear(ctx)
      let orbsymbols = waypoints.map(wp => wp.orbitals.map(wo => wo.symbol)).flat()
      let wps = waypoints.filter(wp => orbsymbols.indexOf(wp.symbol) < 0)
      let orbs = waypoints.filter(wp => orbsymbols.indexOf(wp.symbol) >= 0)
      drawWaypoints(ctx, wps, orbs)
      canvas.onclick = ev => {
         const coord = getMouse(canvas, ev)
         const reversed = wps.map((wp, i, a) => a[a.length - 1 - i])
         for (const wp of reversed)
            if (st.utils.canvas.isInsideCircle(wp, coord)) {
               displayDetail(canvas, wp)
               return
            }
         // If a waypoint was not clicked, redraw reversed (to toggle
         // overlapping waypoint display/click order
         wps = reversed
         clear(ctx)
         drawWaypoints(ctx, wps, orbs)
      }
   }

   return { draw }
})()

// #1d2021
// #282828
// #32302f
// #3c3836
// #504945
// #665c54
// #7c6f64
//
// #928374
//
// #f9f5d7
// #fbf1c7
// #f2e5bc
// #ebdbb2
// #d5c4a1
// #bdae93
// #a89984
//
// #fb4934
// #b8bb26
// #fabd2f
// #83a598
// #d3869b
// #8ec07c
// #fe8019
//
// #cc241d
// #98971a
// #d79921
// #458588
// #b16286
// #689d6a
// #d65d0e
//
// #9d0006
// #79740e
// #b57614
// #076678
// #8f3f71
// #427b58
// #af3a03

