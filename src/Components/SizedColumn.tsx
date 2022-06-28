import { FC } from "react"
import { Column } from "./Column"

export const SizedColumn:FC<SizedColumnProps> = ({children, size, className}) => 
  <Column className={`is-${size} ${className}`}>{ children }</Column>

interface SizedColumnProps extends CustomClassName {
  size: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' 
}

export interface CustomClassName {
  className?: string
}

