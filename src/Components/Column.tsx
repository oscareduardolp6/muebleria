import { FC } from "react";

export const Column:FC<ColumnProps> = ({children, className = ''}) => <div className={`column ${className}`}>{children}</div>

interface ColumnProps {
  className?: string
}