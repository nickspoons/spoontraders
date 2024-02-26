// Initialise global st object
const st = {
   seed: () => Math.random().toString(36).slice(2)
}

const s = st.seed()
const scripts = [
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
scripts.forEach(scriptName =>
   document.writeln(`<script defer src="scripts/${scriptName}.js?s=${s}"><\/script>`))

