st.view = (() => {
   const View = {
      REGISTRATION: 0,
      AGENT: 1,
      WAYPOINT: 2,
      STATUS: 3,
      ERROR: 4
   }
   const $$views = [ // NB: indexes match View ID's
      { view: dbi('view-registration') },
      { view: dbi('view-agent') },
      { view: dbi('view-waypoint'), onactivate: async () => await st.views.waypoint.load() },
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
      st.elements.system.render.clearFloats()
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
