// Initialise global st object
const st = {
   seed: () => Math.random().toString(36).slice(2)
}

const s = st.seed()
const scripts = [
   'utils',
   'globals',
   'cache',
   'view',
   'api',
   'float',
   'data/faction',
   'data/waypoint',
   'elements/system/draw',
   'elements/waypoint',
   'views/error',
   'views/registration',
   'views/agent',
   'views/system',
   'views/faction',
   'views/status',
   'load'
]
scripts.forEach(scriptName =>
   document.writeln(`<script defer src="scripts/${scriptName}.js?s=${s}"><\/script>`))

