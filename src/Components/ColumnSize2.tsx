import { FC } from "react";
import { Column } from "./Column";

export const ColumnSize2:FC<ColumnSize2Props> = ({children, className, ...rest}) => 
  <Column className={`is-2 ${className}`} {...rest}>{ children}</Column>

interface ColumnSize2Props { className?: string }