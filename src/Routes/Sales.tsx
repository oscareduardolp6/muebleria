import React, { useState } from "react"
import path from 'path'

export const Sales = () => {
  const [state, setState] = useState()

  const handleChange = (e: any) => {
    e.preventDefault()
    setState(e.target.value)
  }

  const handleClick = (e: any) => {
    console.log(path.join(__dirname, 'index.html'))
  }

  return (
    <form>
      
    </form>
  )

}