import { Dispatch, SetStateAction, useState } from "react"
import { loadConfigFromFile } from "vite"

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
  const handleChange = (e: any) => {
    const isSubObject = e.target.name.includes('.')
    console.log('isSubObject');
    console.log(isSubObject);
    if(isSubObject){
      const [firstKey, secondKey] = e.target.name.split('.')
      const newState = {
        ...form, 
        [firstKey] : {
          [secondKey]: e.target.value
        }
      }
      console.log('NewState');
      console.log(newState);
      setForm(newState)
    }
    else
      setForm({
        ...form, 
        [e.target.name] : e.target.value
      })
      
  }
  // const handleChange = (e: any) => setForm({
  //   ...form, 
  //   [e.target.name] : e.target.value
  // })
  console.log(form);
  const reset = () => setForm(initialState)
  return [form, handleChange, reset, setForm] as [T, (e: any) => void, () => void, setAction]
} 
