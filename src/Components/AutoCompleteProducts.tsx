import { useEffect, useState } from "react"
import { getAllProducts } from "../Services/ProductsService"
import { ChangeEvent, SetAction } from "../Types/TypesAliases"
import { AutoComplete, AutoCompleteProps } from "./AutoComplete"

export const AutoCompleteProducts = ({ value, setValue }: AutoCompleteProductsProps) => {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    getAllProducts().then(serviceOptions => {
      const productsDTO = serviceOptions ?? []
      const productsSuggestions = productsDTO.map(({name, id}) => `${name} - ${id}`)
      setOptions(productsSuggestions)
    })
  }, [])

  const handleChange = ({ target: { value }}: ChangeEvent) => setValue(value)

  const autoCompleteProps: AutoCompleteProps = {
    value, 
    options, 
    onChange: handleChange
  }

  return (
      <AutoComplete {...autoCompleteProps} />
  )
}

export interface AutoCompleteProductsProps {
  value: string
  setValue: SetAction<string>
}