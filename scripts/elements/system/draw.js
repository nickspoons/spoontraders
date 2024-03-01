st.elements.system.draw = (() => {
   const offsetBy = 500
   const scaleBy = 1

   const clear = ctx => {
      ctx.fillStyle = st.colours.backgroundDark;
      ctx.fillRect(0, 0, offsetBy * 2, offsetBy * 2);
   }

   const getMouse = (canvas, ev) => {
      const raw = st.utils.canvas.getMouse(canvas, ev)
      return {
         x: Math.round((raw.x - offsetBy) / scaleBy),
         y: Math.round((raw.y - offsetBy) / scaleBy)
      }
   }

   const drawCircle = (ctx, {x, y}, radius, width, style, fillStyle) => {
      ctx.beginPath()
      ctx.lineWidth = width
      ctx.strokeStyle = style
      ctx.arc(
         offsetBy + x * scaleBy,
         offsetBy + y * scaleBy,
         radius,
         0,
         2 * Math.PI)
      if (fillStyle) {
         ctx.fillStyle = fillStyle
         ctx.fill()
      }
      ctx.stroke()
   }

   const drawTarget = (ctx, waypoint, radius, width, style) => {
      ctx.beginPath()
      ctx.setLineDash([10, 80])
      ctx.lineDashOffset = 40
      ctx.shadowColor = st.colours.highlight
      ctx.shadowBlur = 20
      drawCircle(ctx, waypoint, radius, 20, st.colours.highlight)
      ctx.shadowBlur = 0
      ctx.setLineDash([])
   }

   const drawWaypoints = (ctx, waypoints, selectedWaypointID) => {
      waypoints.forEach(wp => {
         let radius = st.getSize(wp)
         drawCircle(ctx, wp, radius, 1, st.colours.foregroundBright, st.getColour(wp))
         let highlighted = wp.symbol === selectedWaypointID
         for (const orb of wp.orbitals) {
            if (orb.symbol === selectedWaypointID)
               highlighted = true
            drawCircle(ctx, wp, radius += 2.5, 5, st.getColour(orb))
            drawCircle(ctx, wp, radius += 1, 1, st.colours.foregroundBright)
         }
         if (highlighted) {
            radius += 10
            if (radius < 60) radius = 60
            drawTarget(ctx, wp, radius)
         }
         wp.radius = radius / scaleBy
      })
   }

   const system = async (canvas, systemID, selectedWaypointID) => {
      const ctx = canvas.getContext('2d');
      clear(ctx)
      let waypoints = await st.data.waypoint.findInSystem(systemID)
      drawWaypoints(ctx, waypoints, selectedWaypointID)
      canvas.onclick = ev => {
         st.float.clear()
         const coord = getMouse(canvas, ev)
         const reversed = waypoints.map((wp, i, a) => a[a.length - 1 - i])
         for (const wp of reversed)
            if (st.utils.canvas.isInsideCircle(wp, coord)) {
               st.float.show(
                  { x: ev.pageX, y: ev.pageY },
                  st.elements.waypoint.render(wp))
               clear(ctx)
               drawWaypoints(ctx, waypoints, wp.symbol)
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
