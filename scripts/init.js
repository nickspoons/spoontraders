const seed = Math.random()
const scripts = [
   'globals',
   'view',
   'error',
   'api',
   'registration',
   'agent',
   'load'
]
scripts.forEach(scriptName =>
   document.writeln(`<script defer src="scripts/${scriptName}.js?s=${seed}"><\/script>`))

