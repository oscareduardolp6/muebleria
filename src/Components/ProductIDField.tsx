import { ButtonHTMLAttributes } from "react"
import { InputButtonProps } from "../TypesAliases"
import { Label } from "./Label"
import { TextInput } from "./TextInput"

const textInputRawProps = {
  name: 'productID', 
  placeholder: 'A20', 
  required: true, 
  style: { maxWidth: '120%' }
}

const searchButtonRawProps: InputButtonProps = {
  style: { marginTop: '2.4em' }, 
  type: 'button', 
}

export const ProductIDField = ({ handleChange, value, loadingSearchButton, disabled, handleClickSearchButton }: ProductIDFieldProps) => {
  const textInputProps = {
    ...textInputRawProps,
    onChange: handleChange,  
    value
  }
  const searchButtonProps: InputButtonProps = {
    ...searchButtonRawProps,
    className: `button is-primary ml-5 ${loadingSearchButton ? 'is-loading' : ''}`, 
    disabled: disabled, 
    onClick: handleClickSearchButton
  }
  return (
    <>
      <div>
        <Label>ID Producto</Label>
        <TextInput {...textInputProps} />
      </div>
      <button {...searchButtonProps}>
        Buscar
      </button>
    </>
  )
}

interface ProductIDFieldProps {
  handleChange: (e: any) => void
  value: string, 
  loadingSearchButton: boolean
  disabled: boolean
  handleClickSearchButton: (e: any) => void
}