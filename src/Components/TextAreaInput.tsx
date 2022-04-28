import { FC } from "react";

export const TextAreaInput: FC<TextAreaInputProps> = ({className = '', ...props}) => 
  <textarea className={`input ${className}`}  {...props} />

type TextAreaInputProps = React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>