import { FC } from "react";
import { Column } from "./Column";

export const ColumnSize4:FC<ColumnSize4Props> = ({children, className, ...rest}) => 
  <Column className={`is-4 ${className}`} {...rest} >{ children }</Column>

interface ColumnSize4Props {
  className?: string
}