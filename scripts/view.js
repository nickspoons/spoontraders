st.view = (() => {
   const View = {
      LOADING: 0,
      REGISTRATION: 1,
      AGENT: 2,
      SYSTEM: 3,
      STATUS: 4,
      ERROR: 5
   }
   const $$views = [ // NB: indexes match View ID's
      dbi('view-loading'),
      dbi('view-registration'),
      dbi('view-agent'),
      dbi('view-waypoints'),
      dbi('view-status'),
      dbi('view-error')
   ]
   let $currentView = $$views[0] // view-loading
   let selected = View.AGENT

   const getCurrent = () => {
      if (st.state.loading) return View.LOADING
      if (st.state.error) return View.ERROR
      if (!st.state.registered) return View.REGISTRATION
      return selected
   }

   const $nav = dbi('nav')
   $nav.onclick = async ce => {
      selected = Number(ce.target.dataset.id)
      update()
   }

   const update = () => {
      const currentIndex = getCurrent()
      const $next = $$views[currentIndex]
      if ($next === $currentView) return
      $currentView.classList.add('hidden')
      $next.classList.remove('hidden')
      $currentView = $next
      if (!st.state.loading && st.state.registered) {
         [...$nav.getElementsByTagName('a')].forEach(a => {
            if (Number(a.dataset.id) === currentIndex)
               a.classList.add('active')
            else
               a.classList.remove('active')
         })
         $nav.classList.remove('invisible')
      }
   }

   return { update }
})()
