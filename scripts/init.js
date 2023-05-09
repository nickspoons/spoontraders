const seed = Math.random()
const scripts = [
   'utils',
   'globals',
   'view',
   'error',
   'api',
   'registration',
   'agent',
   'waypoint',
   'status',
   'load'
]
scripts.forEach(scriptName =>
   document.writeln(`<script defer src="scripts/${scriptName}.js?s=${seed}"><\/script>`))

