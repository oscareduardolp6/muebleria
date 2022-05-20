import { FC } from "react";

export const Row:FC<RowProps> = ({ children, className = '' }) => <div className={`columns ${className}`}>{children}</div>

interface RowProps {
  className?: string;
}