import { useState } from "react"
import { SetAction } from "../Types/TypesAliases";

export function useForm<T> (initialState: T) {
  const [form, setForm] = useState(initialState)
  const handleChange = (e: any) => {
    console.log(e.target.value);
    const isSubObject = e.target.name.includes('.')
    if(isSubObject){
      const [firstKey, secondKey] = e.target.name.split('.')
      const newState = {
        ...form, 
        [firstKey] : {
          [secondKey]: e.target.value
        }
      }
      setForm(newState)
    }
    else
      setForm({
        ...form, 
        [e.target.name] : e.target.value
      })
    console.log(form);
  }
  const reset = () => setForm(initialState)
  return [
    form, 
    handleChange, 
    reset, 
    setForm
  ] as [T, (e: any) => void, () => void, SetAction<T>]
} 
