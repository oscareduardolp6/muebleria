import { useEffect, useState } from "react"
import { SetAction } from "../Types/TypesAliases"
import { changeHandlerClosure } from "../Utils/ChangeHandler"
import { AutoComplete, AutoCompleteProps } from "./AutoComplete"

export const CustomAutoComplete = <T,> ({
  setValue, 
  value, 
  getAllService, 
  itemIdKey, 
  itemNameKey, 
  name
}: CustomAutoCompleteProps<T>) => {
  const [options, setOptions] = useState<string[]>([])
  useEffect(() => {
    getAllService().then(serviceOptions => {
      const itemsDTO = serviceOptions ?? []
      const itemsSuggestions = itemsDTO.map(item => {
        const name = item[itemNameKey]
        const id   = item[itemIdKey]
        return `${name} - ${id}`
      })
      setOptions(itemsSuggestions)
    })
  }, [])
  const onChange = changeHandlerClosure(setValue)
  const customAutoCompleteProps: AutoCompleteProps = {
    name, 
    value, 
    options, 
    onChange
  }

  return <AutoComplete {...customAutoCompleteProps} />
}

export interface CustomAutoCompleteProps<T> extends ChildCustomAutoCompleteProps {
  getAllService: () => Promise<T[] | null>
  itemNameKey: keyof T 
  itemIdKey: keyof T
  name: string
}

export interface ChildCustomAutoCompleteProps {
  value: string
  setValue: SetAction<string>
}