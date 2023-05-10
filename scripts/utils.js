const dbi = id => document.getElementById(id)

const dbt = (element, tag) => element.getElementsByTagName(tag)[0]

const genSeed = () => Math.random().toString(36).slice(2)
