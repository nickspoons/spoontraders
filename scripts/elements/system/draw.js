st.elements.system = (() => {
   const clear = ctx => {
      ctx.fillStyle = '#1d2021';
      ctx.fillRect(0, 0, 2000, 2000);
   }

   const drawWaypoints = (ctx, wps, orbs) => {
      wps.forEach(wp => {
         ctx.beginPath()
         let radius
         if (wp.type === 'PLANET') {
            ctx.fillStyle = `#b8bb26`
            radius = 50
         }
         else if (wp.type === 'GAS_GIANT') {
            ctx.fillStyle = `#98971a`
            radius = 80
         }
         else if (wp.type === 'ASTEROID_FIELD') {
            ctx.fillStyle = `#665c54`
            radius = 30
         }
         else if (wp.type === 'JUMP_GATE') {
            ctx.fillStyle = `#83a598`
            radius = 30
         }
         else {
            ctx.fillStyle = `#fb4934`
            radius = 10
         }
         ctx.arc(1000 + wp.x * 10, 1000 + wp.y * 10, radius, 0, 2 * Math.PI)
         ctx.fill()
         ctx.strokeStyle = '#f9f5d7'
         ctx.lineWidth = 2
         ctx.stroke()
         wp.orbitals.forEach(wo => {
            const orb = orbs.find(ob => ob.symbol === wo.symbol)
            if (!orb)
               console.log(`Orbital ${wo.symbol} not found`)
            else {
               radius += 10
               ctx.lineWidth = 10
               if (orb.type === 'MOON')
                  ctx.strokeStyle = `#83a598`
               else if (orb.type === 'ORBITAL_STATION')
                  ctx.strokeStyle = `#b16286`
               else
                  ctx.fillStyle = `#fb4934`
               ctx.arc(1000 + wp.x * 10, 1000 + wp.y * 10, radius, 0, 2 * Math.PI)
               ctx.stroke()
               ctx.strokeStyle = '#f9f5d7'
               ctx.lineWidth = 2
               ctx.lineCap = 'square'
               ctx.stroke()
            }
         })
      })
   }

   const draw = (canvas, waypoints) => {
      const ctx = canvas.getContext('2d');
      clear(ctx)
      let orbsymbols = waypoints.map(wp => wp.orbitals.map(wo => wo.symbol)).flat()
      let wps = waypoints.filter(wp => orbsymbols.indexOf(wp.symbol) < 0)
      let orbs = waypoints.filter(wp => orbsymbols.indexOf(wp.symbol) >= 0)
      drawWaypoints(ctx, wps, orbs)
      canvas.onclick = () => {
         wps = wps.reverse()
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
