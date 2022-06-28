import { useEffect, useState } from "react"
import { getAllProducts } from "../Services/ProductsService"
import { changeHandlerClosure } from "../Utils/ChangeHandler"
import { AutoComplete, AutoCompleteProps } from "./AutoComplete"
import { AutoCompleteProductsProps } from "./AutoCompleteProducts"

export const AutoCompleteCategories = ({value, setValue}: AutoCompleteProductsProps) => {
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    getAllProducts().then(serviceOptions => {
      const productsDTO = serviceOptions ?? []
      const categoriesOfProducts = productsDTO.map(({color: categorie}) => categorie)
      const uniqueCategories = [...new Set(categoriesOfProducts)]
      setOptions(uniqueCategories) 
    })
  }, [])

  const handleChange = changeHandlerClosure(setValue)

  const autoCompleteProps: AutoCompleteProps = {
    name: 'categories', 
    value, 
    options, 
    onChange: handleChange
  }

  return <AutoComplete {...autoCompleteProps} />
}
