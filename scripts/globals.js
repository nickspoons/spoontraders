// Data
st.agent = {
   headquarters: null
}
st.state = {
   registered: false,
   error: false,
   token: null
}

// Constants
st.constants = {
   surveyingTarget: 50
}

// Namespaces
st.data = { }
st.elements = { }
st.elements.system = { }
st.views = { }

// Constants
st.colours = {
   foregroundBright: '#f9f5d7',
   foreground: '#ebdbb2',
   border: '#ebdbb29a',
   borderBright: '#ebdbb2',
   borderDim: '#ebdbb222',
   backgroundDark: '#1d2021',
   backgroundMedium: '#3c3836',
   active: '#83a598',
   success: '#b8bb26',
   query: '#8ec07c',
   highlight: '#076678',

   waypoint: {
      ASTEROID_FIELD: '#665c54',
      ASTEROID_BASE: '#7c6f64',
      ENGINEERED_ASTEROID: '#b57614',
      FUEL_STATION: '#fabd2f',
      GAS_GIANT: '#79740e',
      JUMP_GATE: '#689d6a',
      MOON: '#83a598',
      ORBITAL_STATION: '#b16286',
      PLANET: '#b8bb26',
      unknown: '#fb4934'
   }
}
st.sizes = {
   waypoint: {
      ASTEROID: 10,
      ASTEROID_BASE: 15,
      ASTEROID_FIELD: 30,
      ENGINEERED_ASTEROID: 15,
      FUEL_STATION: 15,
      GAS_GIANT: 40,
      JUMP_GATE: 10,
      PLANET: 20,
      unknown: 5
   }
}

// #1d2021
// #282828
// #32302f
// #3c3836
// #504945
// #665c54
// #7c6f64
//
// #928374
//
// #f9f5d7
// #fbf1c7
// #f2e5bc
// #ebdbb2
// #d5c4a1
// #bdae93
// #a89984
//
// #fb4934
// #b8bb26
// #fabd2f
// #83a598
// #d3869b
// #8ec07c
// #fe8019
//
// #cc241d
// #98971a
// #d79921
// #458588
// #b16286
// #689d6a
// #d65d0e
//
// #9d0006
// #79740e
// #b57614
// #076678
// #8f3f71
// #427b58
// #af3a03
