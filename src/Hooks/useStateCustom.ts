import { useState } from "react"
import { SetAction } from "../Types/TypesAliases"

export const useStateCustom = <T>(initialState: T) => {
  const [state, setState] = useState(initialState)
  const reset = () => setState(initialState)
  return [state, setState, reset] as [any, SetAction<T>, () => void]

}