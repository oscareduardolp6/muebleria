import { Children, FC } from "react"
import { InputProps } from "../Types/TypesAliases"
import { TextInput } from "./TextInput"

export const AutoComplete:FC<AutoCompleteProps> = ({ options, ...rest }) => {
  return(
    <>
      <TextInput list='options' {...rest}/>
      <datalist id='options' >
        { 
          Children.toArray( 
            options.map( 
              option => 
                <option value={option} />
            ) 
          )
        }
      </datalist>
    </>
  )
}

export interface AutoCompleteProps extends InputProps {
  options: string[]
}