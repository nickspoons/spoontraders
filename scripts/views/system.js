import { doc } from '../doc.js'
import { agent } from '../globals.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

import { waypoint } from '../data/waypoint.js'

import { render as renderSystem } from '../elements/system.js'

let currentSystemID = null

export const load = async id => {
   let { systemID } = waypoint.splitSymbol(id || agent.headquarters)
   currentSystemID = systemID
   view.loading = true
   const seed = utils.seed()
   view.current.innerHTML = `
<h2>System: ${systemID}</h2>
<canvas height="1000" width="1000" id="canvas-${seed}"></canvas>
`
   await renderSystem(doc.byID(`canvas-${seed}`), systemID, id)
   view.loading = false
}
