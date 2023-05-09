st.view = (() => {
   const View = {
      LOADING: 0,
      REGISTRATION: 1,
      AGENT: 2,
      ERROR: 3
   }
   const getCurrent = () => {
      if (st.state.loading) return View.LOADING
      if (st.state.error) return View.ERROR
      if (!st.state.registered) return View.REGISTRATION
      return View.AGENT
   }
   const $loading = dbi('view-loading')
   const $registration = dbi('view-registration')
   const $agent = dbi('view-agent')
   const $error = dbi('view-error')
   let $current = $loading
   const $$views = [ // NB: indexes match View ID's
      $loading,
      $registration,
      $agent,
      $error
   ]
   const update = () => {
      const $next = $$views[getCurrent()]
      if ($next === $current) return
      $current.classList.add('hidden')
      $next.classList.remove('hidden')
      $current = $next
   }

   return { update }
})()
