import { InputButtonProps } from "../../Types/TypesAliases"
import { ActionButton } from "./ActionButton"

export const IncrementButton = ({ className, ...rest }: InputButtonProps) => 
  <ActionButton className='ml-5' {...rest}>➕</ActionButton>

  
export const DecrementButton = ({ className, ...rest}: InputButtonProps) => 
  <ActionButton className={`is-offset-2 ${className}`} {...rest} >➖</ActionButton>