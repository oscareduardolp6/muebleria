import { FC } from "react";
import { HTMLButtonProps } from "../Types/TypesAliases";

export const Button:FC<ButtonProps> = ({ children, className, buttonColor = 'primary', ...rest }) => {
  const stylesClasses = `button is-${buttonColor} ${className} `
  const props: HTMLButtonProps = {
    ...rest,
    className: stylesClasses
  }
  return(
    <button {...props}>{ children }</button>
  )
}

export interface ButtonProps extends HTMLButtonProps {
  buttonColor?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger'
}
