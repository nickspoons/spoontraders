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

   const drawWaypoints = (ctx, waypoints) => {
      const circle = (waypoint, radius) =>
         ctx.arc(
            offsetBy + waypoint.x * scaleBy,
            offsetBy + waypoint.y * scaleBy,
            radius,
            0,
            2 * Math.PI)

      waypoints.forEach(wp => {
         ctx.beginPath()
         let radius = 0
         ctx.fillStyle = st.colors.waypoint[wp.type] || st.colors.waypoint.unknown
         radius = st.sizes.waypoint[wp.type] || st.sizes.waypoint.unknown
         circle(wp, radius)
         ctx.fill()
         ctx.strokeStyle = st.colors.foregroundBright
         ctx.lineWidth = 5
         ctx.stroke()
         for (const orb of wp.orbitals) {
            ctx.beginPath()
            radius += 5
            ctx.lineWidth = 10
            ctx.strokeStyle = st.colors.waypoint[orb.type] || st.colors.waypoint.unknown
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

   const system = async (canvas, systemID) => {
      const ctx = canvas.getContext('2d');
      clear(ctx)
      let waypoints = await st.data.waypoint.findInSystem(systemID)
      drawWaypoints(ctx, waypoints)
      canvas.onclick = ev => {
         st.float.clear()
         const coord = getMouse(canvas, ev)
         const reversed = waypoints.map((wp, i, a) => a[a.length - 1 - i])
         for (const wp of reversed)
            if (st.utils.canvas.isInsideCircle(wp, coord)) {
               st.float.show(
                  { x: ev.pageX, y: ev.pageY },
                  st.elements.waypoint.render(wp))
               return
            }
         // If a waypoint was not clicked, redraw reversed (to toggle
         // overlapping waypoint display/click order
         waypoints = reversed
         clear(ctx)
         drawWaypoints(ctx, waypoints)
      }
   }

   return { system }
})()
