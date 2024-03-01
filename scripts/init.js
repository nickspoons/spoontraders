// Initialise global st object
const st = {
   seed: () => Math.random().toString(36).slice(2)
}

const s = st.seed()
const scriptNames = [
   'utils',
   'globals',
   'storage',
   'cache',
   'view',
   'api',
   'float',
   'data/contract',
   'data/faction',
   'data/survey',
   'data/ship',
   'data/waypoint',
   'elements/system/draw',
   'elements/contract',
   'elements/ship',
   'elements/faction',
   'elements/waypoint',
   'views/error',
   'views/registration',
   'views/agent',
   'views/contract',
   'views/ship',
   'views/system',
   'views/faction',
   'views/status',
   'load'
]
scriptNames.forEach(scriptName => {
   const script = document.createElement('script')
   script.async = true
   script.src = `scripts/${scriptName}.js?s=${s}`
   document.head.appendChild(script)
})
