import { Children } from "react"
import { ChangeEventSelect } from "../Types/TypesAliases"
import { Label } from "./Label"

export const DropDown = ({labelText, onChange, defaultValue, defaultText, options = [], className = ''}: DropDownProps) => 
  <>
    {labelText && <Label>{labelText}</Label>}
    <div className={`select ${className}`}>
      <select id={`id-${labelText}`} onChange={onChange}>
        <option value={defaultValue || ''}>{defaultText || 'Seleccione una opción' }</option>
        {
          Children.toArray(
            options.map(
              option => 
                <option value={option}>{option}</option>
            )
          )
        }
      </select>
    </div>
  </>

export interface DropDownProps {
  labelText?: string
  className?: string
  defaultText?: string
  defaultValue?: string
  options?: string[]
  onChange: (e: ChangeEventSelect) => void
}