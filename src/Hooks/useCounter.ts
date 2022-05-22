import { useState } from "react"

export const useCounter = (initialValue: number = 1, minValue: number = 1,  maxValue: number = 100) => {
  const [counter, setCounter] = useState(initialValue)
  const increment = () => {
    const newCounter = counter + 1 
    if(newCounter > maxValue)
      setCounter(maxValue)
    else if(newCounter < minValue )
      setCounter(minValue)
    else 
      setCounter(newCounter)
  }
  const decrement = () => {
    const newCounter = counter - 1 
    if(newCounter > maxValue)
      setCounter(maxValue)
    else if (newCounter < minValue)
      setCounter(minValue)
    else 
      setCounter(newCounter)
  }
  const reset = () => setCounter(initialValue)
  return [
    counter, 
    increment, 
    decrement, 
    reset
  ] as [
    number, 
    () => void, 
    () => void, 
    () => void
  ]
}