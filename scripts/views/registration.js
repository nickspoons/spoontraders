import { api } from '../api.js'
import { cache } from '../cache.js'
import { doc } from '../doc.js'
import { colours, state } from '../globals.js'
import { view } from '../view.js'
import { utils } from '../utils.js'

import { faction } from '../data/faction.js'

import { load as loadAgent } from './agent.js'

const addFactionHandlers = $factions => {
   const factionDivs = doc.queryAll(`#${$factions.id} > div`)
   factionDivs.forEach(factionDiv =>
      factionDiv.onclick = () => {
         factionDivs.forEach(f => f.classList.remove('selected'))
         factionDiv.classList.add('selected')
      })
}

const loadFactions = async $factions => {
   const factions = await faction.findAll()
   $factions.innerHTML = factions.map(faction => `
<div class="faction ${faction.symbol === 'COSMIC' ? 'selected' : ''}"
   data-id="${faction.symbol}">
<h3>${faction.name}</h3>
<div class="details">
   <p>${faction.description}</p>

   ${faction.traits.map(t => `
   <details>
      <summary title="${t.symbol}">${t.name}</summary>
      <p>${t.description}</p>
   </details>`).join('')}

</div>
</div>
`
   ).join('')
   addFactionHandlers($factions)
}

const saveToken = async token => {
   state.token = token
   if (!await loadAgent())
      return
   cache.token = token
   state.registered = true
   view.navigate(view.View.AGENT)
}

export const load = async () => {
   const seed = utils.seed()
   view.get(view.View.REGISTRATION).innerHTML = `
<div class="wrapping-row seed-${seed}">

   <form id="reg-form">
      <h2>You need to register</h2>
      <label for="reg-handle">Choose a handle</label>
      <input placeholder="Handle" id="reg-handle" name="reg-handle" required />
      <label>Select a faction</label>
      <div id="factions-${seed}">
         <div class="faction selected" data-id="COSMIC">
            <h3>Cosmic Engineers</h3>
         </div>
      </div>
      <button type="submit">
         Register
      </button>
   </form>

   <form id="ver-form">
      <h2>... or enter an access token</h2>
      <label for="ver-token">Access token</label>
      <input placeholder="Access token" id="ver-token" name="ver-token" required />
      <button type="submit">
         Verify
      </button>
   </form>

</div>
<style>
   .seed-${seed} form {
      display: flex;
      flex-direction: column;
   }
   .seed-${seed} label {
      font-size: smaller;
      margin-top: 0.5em;
      opacity: 0.6;
   }
   .seed-${seed} input {
      max-width: 20em;
   }
   .seed-${seed} button {
      place-self: flex-start;
   }

   #factions-${seed} .faction {
      border: 1px solid ${colours.borderDim};
      border-bottom-color: transparent;
      cursor: pointer;
      max-width: 20em;
      padding: 0.3em;
   }
   #factions-${seed} .faction:first-child {
      border-radius: 0.3em 0.3em 0 0;
   }
   #factions-${seed} .faction:last-child {
      border-radius: 0 0 0.3em 0.3em;
      border-bottom-color: ${colours.borderDim};
   }
   #factions-${seed} .faction.selected {
      border-color: ${colours.borderBright};
   }
   #factions-${seed} .faction h3 {
      font-size: 1em;
      margin: 0;
   }
   #factions-${seed} .faction .details {
      display: none;
   }
   #factions-${seed} .faction.selected .details {
      display: block;
   }
</style>
`
   const $regForm = doc.byID('reg-form')
   const $handle = doc.byID('reg-handle')
   $regForm.onsubmit = async ce => {
      ce.preventDefault()
      const symbol = $handle.value
      const faction = doc.query(`#factions-${seed} > div.selected`).dataset.id
      const { ok, resp } = await api.post('register', { symbol, faction })
      if (!ok)
         console.log(`Error ${resp.error.code}: ${resp.error.message}`)
      else
         await saveToken(resp.data.token)
   }
   const $factions = doc.byID(`factions-${seed}`)
   addFactionHandlers($factions)
   loadFactions($factions)

   const $verForm = doc.byID('ver-form')
   const $verToken = doc.byID('ver-token')
   $verForm.onsubmit = async ce => {
      ce.preventDefault()
      await saveToken($verToken.value)
   }
}
