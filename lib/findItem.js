import { useDatabase } from "./useDatabase"
import { useToken } from "./useToken"

export const findItem = () => useDatabase().find(item => item.token === useToken())