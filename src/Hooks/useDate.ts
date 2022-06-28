import { useState } from "react"

export type InputDate = {
  text: string 
  date: Date | null
}

const defaultInitialDate: InputDate = {
  text: '', 
  date: null 
}

export const useDate = (initialValue: InputDate = defaultInitialDate) => {
  const [dateState, setDateState] = useState(initialValue)

  const setDate = (valueFromInputOfDateType: string) => {
    setDateState({
      text: valueFromInputOfDateType, 
      date: convertInputDateStringToDate(valueFromInputOfDateType)
    })
  }
  
  return [dateState, setDate] as [InputDate, (valueFromInputOfDateType: string) => void]

}


export const convertInputDateStringToDate = (date: string): Date | null  => {
  if(date === '') return null 
  const [year, month, day] = date.split('/')
  return new Date(`${month}/${day}/${year}`)
}