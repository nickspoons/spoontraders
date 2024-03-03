export const doc = {
   byID: id => document.getElementById(id),
   byTag: (element, tag) => element.getElementsByTagName(tag)[0],
   byTagAll: (element, tag) => [...element.getElementsByTagName(tag)],
   query: selector => document.querySelector(selector),
   queryAll: selector => [...document.querySelectorAll(selector)]
}
