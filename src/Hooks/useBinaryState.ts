import { useCallback, useState } from "react"

export const useBinaryState = (initialState: boolean = false) => {
  const [value, setValue] = useState(initialState)
  const deny = useCallback(() => setValue(false), [])
  const allow = useCallback(() => setValue(true), [])
  const toggle = useCallback(() => setValue(value => !value), [])
  return [value, deny, allow, toggle] as [boolean, () => void, () => void, () => void]
}