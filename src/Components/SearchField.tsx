import { ButtonTypes, InputButtonProps } from "../Types/TypesAliases"
import { Label } from "./Label"
import { TextInput } from "./TextInput"

export const SearchField = ({ 
  label, 
  inputName, 
  handleChange, 
  value, 
  loadingSearchButton,
  handleClickSearchButton ,
  disabled = false ,
  required = false, 
  buttonType = 'button',  
  placeholder = '' 
}: SearchFieldProps) => {
  const textInputProps = {
    style: { maxWidth: '120%' },
    name: inputName, 
    placeholder, 
    required, 
    onChange: handleChange,  
    value
  }
  const searchButtonProps: InputButtonProps = {
    style: { marginTop: '2.4em' }, 
    type: buttonType, 
    className: `button is-primary ml-5 ${loadingSearchButton ? 'is-loading' : ''}`, 
    disabled: disabled, 
    onClick: handleClickSearchButton
  }
  return (
    <>
      <div>
        { label && <Label>{ label }</Label> }
        <TextInput {...textInputProps} />
      </div>
      <button {...searchButtonProps}>
        Buscar
      </button>
    </>
  )
}

export interface SearchFieldProps {
  inputName: string
  placeholder?: string
  required?: boolean
  handleChange: (e: any) => void
  value: string, 
  loadingSearchButton: boolean
  disabled?: boolean
  handleClickSearchButton: (e: any) => void
  label?: string 
  buttonType?: ButtonTypes
}