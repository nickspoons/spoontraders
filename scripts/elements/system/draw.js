st.elements.system.draw = (() => {
   const offsetBy = 1000
   const scaleBy = 10

   const clear = ctx => {
      ctx.fillStyle = st.colors.backgroundDark;
      ctx.fillRect(0, 0, offsetBy * 2, offsetBy * 2);
   }

   const getMouse = (canvas, ev) => {
      const raw = st.utils.canvas.getMouse(canvas, ev)
      return {
         x: Math.round((raw.x - offsetBy) / scaleBy),
         y: Math.round((raw.y - offsetBy) / scaleBy)
      }
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
         ctx.fillStyle = st.colors.waypoint[wp.type] || st.colors.waypoint.unknown
         radius = st.sizes.waypoint[wp.type] || st.colors.sizes.unknown
         circle(wp, radius)
         ctx.fill()
         ctx.strokeStyle = st.colors.foregroundBright
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
            ctx.strokeStyle = st.colors.orbital[orb.type] || st.colors.orbital.unknown
            circle(wp, radius)
            ctx.stroke()
            ctx.beginPath()
            radius += 5
            circle(wp, radius)
            ctx.strokeStyle = st.colors.foregroundBright
            ctx.lineWidth = 5
            ctx.stroke()
         }
         wp.radius = radius / scaleBy
      })
   }

   const system = (canvas, waypoints) => {
      const ctx = canvas.getContext('2d');
      clear(ctx)
      let orbsymbols = waypoints.map(wp => wp.orbitals.map(wo => wo.symbol)).flat()
      let wps = waypoints.filter(wp => orbsymbols.indexOf(wp.symbol) < 0)
      let orbs = waypoints.filter(wp => orbsymbols.indexOf(wp.symbol) >= 0)
      drawWaypoints(ctx, wps, orbs)
      canvas.onclick = ev => {
         st.elements.system.render.clearFloats()
         const coord = getMouse(canvas, ev)
         const reversed = wps.map((wp, i, a) => a[a.length - 1 - i])
         for (const wp of reversed)
            if (st.utils.canvas.isInsideCircle(wp, coord)) {
               st.elements.system.render.floatWaypoint(wp, { x: ev.clientX, y: ev.clientY })
               return
            }
         // If a waypoint was not clicked, redraw reversed (to toggle
         // overlapping waypoint display/click order
         wps = reversed
         clear(ctx)
         drawWaypoints(ctx, wps, orbs)
      }
   }

   return { system }
})()
