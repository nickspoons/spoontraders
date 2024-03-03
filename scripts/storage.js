export const storage = {
   read: key => localStorage.getItem(key),
   write: (key, value) => localStorage.setItem(key, value)
}
