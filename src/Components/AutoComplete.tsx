import { Children, FC } from "react"
import { InputProps } from "../Types/TypesAliases"
import { TextInput } from "./TextInput"

export const AutoComplete:FC<AutoCompleteProps> = ({ options, name, ...rest }) => {
  return(
    <>
      <TextInput list={`options-${name}`} {...rest}/>
      <datalist id={`options-${name}`} >
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
  name: string
}