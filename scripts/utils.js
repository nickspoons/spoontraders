const dbi = id => document.getElementById(id)

const dbt = (element, tag) => element.getElementsByTagName(tag)[0]
const dbts = (element, tag) => [...element.getElementsByTagName(tag)]

const genSeed = () => Math.random().toString(36).slice(2)
