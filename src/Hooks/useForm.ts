import { Dispatch, SetStateAction, useState } from "react"

// export const useForm = (initialState: any) => {
//   const [form, setForm] = useState(initialState)
//   const handleChange = (e: any) => setForm({
//     ...form, 
//     [e.target.name] : e.target.value
//   })
//   console.log(form)
//   const reset = () => setForm(initialState)
//   return [form, handleChange, reset]
// }

export function useForm<T> (initialState: T) {
  type setAction = Dispatch<SetStateAction<T>>
  const [form, setForm] = useState(initialState)
  const handleChange = (e: any) => setForm({
    ...form, 
    [e.target.name] : e.target.value
  })
  console.log(form);
  const reset = () => setForm(initialState)
  return [form, handleChange, reset, setForm] as [T, (e: any) => void, () => void, setAction]
} 
