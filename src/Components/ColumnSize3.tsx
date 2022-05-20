import { FC } from "react";
import { Column } from "./Column";

export const ColumnSize3:FC<ColumnSize3Props> = ({ children, className = '', ...rest }) => 
  <Column className={`is-3 ${className}`} {...rest}>{ children }</Column>

interface ColumnSize3Props { className?: string }