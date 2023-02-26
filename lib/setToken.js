import Cookies from "universal-cookie";

export const setToken = (useFor, token) => useFor === 'set' ? new Cookies().set('puzzleToken', token, {path:'/'}) : new Cookies().remove('puzzleToken', {path: '/'})