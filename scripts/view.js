st.view = (() => {
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
   const $$views = [ // NB: indexes match View ID's
      { view: dbi('view-registration') },
      { view: dbi('view-agent'), onactivate: async () => await st.views.agent.load() },
      { view: dbi('view-contract'), onactivate: async () => await st.views.contract.load() },
      { view: dbi('view-ship'), onactivate: async () => await st.views.ship.load() },
      { view: dbi('view-system'), onactivate: async () => await st.views.system.load() },
      { view: dbi('view-faction'), onactivate: async () => await st.views.faction.load() },
      { view: dbi('view-status'), onactivate: async () => await st.views.status.load() },
      { view: dbi('view-error') }
   ]
   let selected = st.cache.view || View.AGENT
   let $currentView = null

   const getCurrent = () => {
      if (st.state.error) return View.ERROR
      return selected
   }

   const $nav = dbi('nav')
   $nav.onclick = async ce => {
      ce.preventDefault()
      if (ce.target.tagName === 'A')
         navigate(View[ce.target.dataset.id])
   }

   const $loading = dbi('loading')
   const setLoading = loading => {
      if (loading)
         $loading.classList.remove('hidden')
      else
         $loading.classList.add('hidden')
   }

   const navigate = async toview => {
      st.float.clear()
      if (toview === -1)
         toview = st.state.registered ? selected : View.REGISTRATION
      dbts($nav, 'a').forEach(a => {
         if (View[a.dataset.id] === toview)
            a.classList.add('active')
         else
            a.classList.remove('active')
      })
      st.cache.view = toview
      selected = toview
      st.state.error = false
      await update()
   }

   const update = async () => {
      const currentIndex = getCurrent()
      const $next = $$views[currentIndex]
      if ($next !== $currentView) {
         if ($currentView)
            $currentView.view.classList.add('hidden')
         $next.view.classList.remove('hidden')
         $currentView = $next
         if ($currentView.onactivate)
            await $currentView.onactivate()
      }
      $nav.classList.remove('invisible')
      dbts($nav, 'a').forEach(a => {
         if (!st.state.registered && !a.classList.contains('unregistered'))
            a.classList.add('hidden')
         else if (st.state.registered && a.classList.contains('only'))
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
