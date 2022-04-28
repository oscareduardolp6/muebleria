import { FC } from "react"

const classes = 'input has-text-centered'

export const TextInput:FC<TextInputProps> = ({ className = '', ...props}) => 
  <input className={`${classes} ${className}`} {...props} />

interface TextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}