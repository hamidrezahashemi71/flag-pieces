import Cookies from "universal-cookie";

export const setToken = (useFor, token) =>
  useFor === 'set' ?
    new Cookies().set('flagPiecesToken', token, { path: '/' })
      :
    new Cookies().remove('flagPiecesToken', { path: '/' })