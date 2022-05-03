import { FC } from "react";
import { InputProps } from "../Types/TypesAliases";
import { Label } from "./Label";
import { TextInput } from "./TextInput";

export const ProductFormField:FC<InputProps> = ({children, ...props}) => {

  return (
    <>
      <Label>{ children }</Label>
      <TextInput {...props} />
    </>
  )
}