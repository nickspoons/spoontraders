const seed = Math.random()
const scripts = [
   'utils',
   'globals',
   'cache',
   'view',
   'api',
   'elements/system/draw',
   'views/error',
   'views/registration',
   'views/agent',
   'views/status',
   'views/waypoint',
   'load'
]
scripts.forEach(scriptName =>
   document.writeln(`<script defer src="scripts/${scriptName}.js?s=${seed}"><\/script>`))

