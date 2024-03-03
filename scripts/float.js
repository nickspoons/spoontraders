import { doc } from './doc.js'

export const float = (() => {

   const clear = () => doc.queryAll('.floater').forEach(f => f.innerHTML = '')

   const show = (point, html) => {
      const floater = doc.byID('floater')
      floater.innerHTML = html
      floater.style.top = `${point.y}px`
      floater.style.left = `${point.x}px`
      const frect = floater.getBoundingClientRect()
      const brect = document.body.getBoundingClientRect()
      if (frect.width >= brect.width - 4)
         floater.style.left = '2px'
      else if (floater.offsetLeft + frect.width >= brect.width - 4)
         floater.style.left = (brect.width - frect.width - 2) + 'px'
   }

   return {
      clear,
      show
   }
})()
