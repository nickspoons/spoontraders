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
      { view: dbi('view-waypoint'), onactivate: () => st.waypoint.load() },
      { view: dbi('view-status'), onactivate: () => st.status.load() },
      { view: dbi('view-error') }
   ]
   let $currentView = $$views[View.AGENT]
   let selected = View.AGENT

   const getCurrent = () => {
      if (st.state.error) return View.ERROR
      if (!st.state.registered) return View.REGISTRATION
      return selected
   }

   const $nav = dbi('nav')
   $nav.onclick = async ce => {
      ce.preventDefault()
      navigate(Number(ce.target.dataset.id))
   }

   const $loading = dbi('loading')
   const setLoading = loading => {
      if (loading)
         $loading.classList.remove('hidden')
      else
         $loading.classList.add('hidden')
   }

   const navigate = toview => {
      [...dbts($nav, 'a')].forEach(a => {
         if (a.dataset.id === toview)
            a.classList.add('active')
         else
            a.classList.remove('active')
      })
      selected = toview
      st.state.error = false
      update()
   }

   const update = () => {
      const currentIndex = getCurrent()
      const $next = $$views[currentIndex]
      if ($next !== $currentView) {
         $currentView.view.classList.add('hidden')
         $next.view.classList.remove('hidden')
         $currentView = $next
         if ($currentView.onactivate)
            $currentView.onactivate()
      }
      if (st.state.registered)
         $nav.classList.remove('invisible')
   }

   return {
      View,
      get current() { return $currentView.view },
      set loading(value) { setLoading(value) },
      navigate,
      update
   }
})()
