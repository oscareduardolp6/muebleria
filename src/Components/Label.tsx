import { FC } from "react"

export const Label:FC<LabelProps> = ({ children, className }) => 
  <label className={`label has-text-primary is-italic is-size-5 is-family-primary ${className}`}>{ children }</label>

export interface LabelProps {
  className?: string
}