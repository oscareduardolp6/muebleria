import { FC } from "react"
import { CustomClassName, SizedColumn } from "./SizedColumn"

export const ColumnSize6:FC<CustomClassName> = ({children, ...rest}) => 
  <SizedColumn size='6' {...rest}>{ children }</SizedColumn>
  