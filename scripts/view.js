import { cache } from './cache.js'
import { doc } from './doc.js'
import { float } from './float.js'
import { state } from './globals.js'

export const view = (() => {
   const View = {
      REGISTRATION: 0,
      AGENT: 1,
      CONTRACT: 2,
      SHIP: 3,
      SYSTEM: 4,
      FACTION: 5,
      STATUS: 6,
      ERROR: 7
   }

   const loadView = async script =>
      await import(`./views/${script}.js`)
         .then(async v => await v.load())

   const $$views = [ // NB: indexes match View ID's
      { view: doc.byID('view-registration') },
      { view: doc.byID('view-agent'), onactivate: async () => await loadView('agent') },
      { view: doc.byID('view-contract'), onactivate: async () => await loadView('contract') },
      { view: doc.byID('view-ship'), onactivate: async () => await loadView('ship') },
      { view: doc.byID('view-system'), onactivate: async () => await loadView('system') },
      { view: doc.byID('view-faction'), onactivate: async () => await loadView('faction') },
      { view: doc.byID('view-status'), onactivate: async () => await loadView('status') },
      { view: doc.byID('view-error') }
   ]

   let selected = cache.view || View.AGENT
   let $currentView = null

   const getCurrent = () => {
      if (state.error) return View.ERROR
      return selected
   }

   const $nav = doc.byID('nav')
   $nav.onclick = async ce => {
      ce.preventDefault()
      if (ce.target.tagName === 'A')
         navigate(View[ce.target.dataset.id])
   }

   const $loading = doc.byID('loading')
   const setLoading = loading => {
      if (loading)
         $loading.classList.remove('hidden')
      else
         $loading.classList.add('hidden')
   }

   const navigate = async (toview, options) => {
      float.clear()
      if (toview === -1)
         toview = state.registered ? selected : View.REGISTRATION
      doc.byTagAll($nav, 'a').forEach(a => {
         if (View[a.dataset.id] === toview)
            a.classList.add('active')
         else
            a.classList.remove('active')
      })
      cache.view = toview
      selected = toview
      state.error = false
      await update(options)
   }

   const update = async options => {
      const currentIndex = getCurrent()
      const $next = $$views[currentIndex]
      if ($next !== $currentView) {
         if ($currentView)
            $currentView.view.classList.add('hidden')
         $next.view.classList.remove('hidden')
         $currentView = $next
         if ($currentView.onactivate && !(options || {}).skipActivation)
            await $currentView.onactivate()
      }
      $nav.classList.remove('invisible')
      doc.byTagAll($nav, 'a').forEach(a => {
         if (!state.registered && !a.classList.contains('unregistered'))
            a.classList.add('hidden')
         else if (state.registered && a.classList.contains('only'))
            a.classList.add('hidden')
         else
            a.classList.remove('hidden')
      })
   }

   return {
      View,
      get current() { return $currentView.view },
      set loading(value) { setLoading(value) },
      get: view => $$views[view].view,
      navigate,
      update
   }
})()
