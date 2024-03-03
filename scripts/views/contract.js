import { doc } from '../doc.js'
import { colours } from '../globals.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

import { contract } from '../data/contract.js'

import { render } from '../elements/contract.js'

import { load as loadSystem } from './system.js'

export const load = async refresh => {
   view.loading = true
   const contracts = await contract.findAll(refresh)
   const seed = utils.seed()
   view.current.innerHTML = `
<h2>Contracts</h2>

<div id="contract-${seed}">
   ${contracts.map(c => render(c)).join('')}
</div>

<style>
   #contract-${seed} .contract dl.deliver  {
      background-color: ${colours.backgroundMedium};
      border: 1px solid ${colours.border};
      border-radius: 0.3em 0;
      padding: 0.5em;
      flex-grow: 0;
   }
   #contract-${seed} .contract.accepted {
      border: 1px solid ${colours.active};
   }
   #contract-${seed} .contract.fulfilled {
      border: 1px solid ${colours.success};
   }
</style>

<button id="btn-${seed}" class="refresh">Refresh</button>
`
   doc.byID(`btn-${seed}`).onclick = () => load(true)
   const hqlinks = doc.queryAll(`#contract-${seed} .contract a[data-id]`)
   hqlinks.forEach(link => link.onclick = ev => {
      ev.preventDefault()
      view.navigate(view.View.SYSTEM, { skipActivation: true })
      loadSystem(link.dataset.id)
   })
   const btns = doc.queryAll(`#contract-${seed} .contract button[data-id]`)
   btns.forEach(btn => btn.onclick = async ev => {
      ev.preventDefault()
      view.loading = true
      await contract.accept(btn.dataset.id)
      load(true)
   })
   view.loading = false
}
