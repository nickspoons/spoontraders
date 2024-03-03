import { doc } from '../doc.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

import { faction } from '../data/faction.js'

import { render } from '../elements/faction.js'

import { load as loadSystem } from './system.js'

export const load = async refresh => {
   view.loading = true
   await faction.enrich(refresh)
   const factions = await faction.findAll()
   const seed = utils.seed()
   view.current.innerHTML = `
<h2>Factions</h2>

<div id="factions-${seed}">
   ${factions.map(f => render(f)).join('')}
</div>

<style>
   #factions-${seed} .faction {
      margin-bottom: 2em;
   }
   #factions-${seed} .faction:last-child {
      margin-bottom: 0;
   }
   @media all and (max-width: 30em) {
      #factions-${seed} .faction {
         margin-bottom: 1em;
      }
   }
</style>
<button id="btn-${seed}" class="refresh">Refresh</button>
`
   doc.byID(`btn-${seed}`).onclick = () => load(true)
   const hqlinks = doc.queryAll(`#factions-${seed} .faction a[data-id]`)
   hqlinks.forEach(link => link.onclick = ev => {
      ev.preventDefault()
      view.navigate(view.View.SYSTEM, { skipActivation: true })
      loadSystem(link.dataset.id)
   })
   view.loading = false
}
