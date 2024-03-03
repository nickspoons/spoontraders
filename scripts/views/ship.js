import { doc } from '../doc.js'
import { colours } from '../globals.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

import { ship } from '../data/ship.js'

import { render } from '../elements/ship.js'

import { load as loadSystem } from './system.js'

export const load = async refresh => {
   view.loading = true
   const ships = await ship.findAll(refresh)
   const seed = utils.seed()
   view.current.innerHTML = `
<h2>Ships</h2>

<div id="ship-${seed}">
   ${ships.map(ship => render(ship)).join('')}
</div>

<style>
   #ship-${seed} .ship .wrapping-row dl  {
      background-color: ${colours.backgroundMedium};
      border: 1px solid ${colours.border};
      border-radius: 0.3em 0;
      padding: 0.5em;
      flex-grow: 0;
   }
   #ship-${seed} .ship.extracting {
      border: 1px solid ${colours.active};
   }
   #ship-${seed} .ship.surveying {
      border: 1px solid ${colours.query};
   }
</style>

<button id="btn-${seed}" class="refresh">Refresh</button>
`
   doc.byID(`btn-${seed}`).onclick = () => load()
   const hqlinks = doc.queryAll(`#ship-${seed} .ship a[data-id]`)
   hqlinks.forEach(link => link.onclick = ev => {
      ev.preventDefault()
      view.navigate(view.View.SYSTEM, { skipActivation: true })
      loadSystem(link.dataset.id)
   })
   view.loading = false
}
