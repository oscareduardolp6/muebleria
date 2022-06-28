import { useEffect, useState, SetStateAction, Dispatch } from "react"

let original: any

export const useReseteableState = <T>({fetchFunction, initialState}: ReseteableStateParams<T>) => {
  const [state, setState] = useState<T>(initialState)
  let reset: () => any = () => {}

  useEffect(() => { 
    fetchFunction().then(result => { 
      setState(result)
      reset = () => setState(result)
      original = result
    }) 
  }, [])

  const getOriginalState = () => original as T

  return [state, setState, reset, getOriginalState] as [T , Dispatch<SetStateAction<T>>, () => void, () => T]
}

type ReseteableStateParams<T> = {
  fetchFunction: () => Promise<T>
  initialState: T 
}