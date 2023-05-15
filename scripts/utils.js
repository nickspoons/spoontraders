const dbi = id => document.getElementById(id)
const dbt = (element, tag) => element.getElementsByTagName(tag)[0]
const dbts = (element, tag) => [...element.getElementsByTagName(tag)]
const dqs = selector => document.querySelector(selector)
const dqss = selector => [...document.querySelectorAll(selector)]

st.utils = (() => {

   const canvas = (() => {
      const getMouse = (canvas, ev) => {
         const rect = canvas.getBoundingClientRect()
         const scaleX = canvas.width / rect.width
         const scaleY = canvas.height / rect.height

         return {
            x: (ev.clientX - rect.left) * scaleX,
            y: (ev.clientY - rect.top) * scaleY
         }
      }

      const isInsideCircle = (circle, coord) => {
         var dx = circle.x - coord.x;
         var dy = circle.y - coord.y;
         return dx * dx + dy * dy <= circle.radius * circle.radius;
      }

      return { getMouse, isInsideCircle }
   })()

   return { canvas }
})()
