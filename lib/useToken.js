import Cookies from "universal-cookie"

export const useToken = () => new Cookies().get('puzzleToken')