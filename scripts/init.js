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
   'elements/system/render',
   'elements/system/draw',
   'views/error',
   'views/registration',
   'views/agent',
   'views/status',
   'views/waypoint',
   'load'
]
scripts.forEach(scriptName =>
   document.writeln(`<script defer src="scripts/${scriptName}.js?s=${s}"><\/script>`))

