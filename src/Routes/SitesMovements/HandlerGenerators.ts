import { MouseEventHandler } from "react"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { getProductsById } from "../../Services/ProductsService"
import { SetAction } from "../../Types/TypesAliases"

export const getSearchHandler = (selection: string, setProduct: SetAction<ProductDTO | null | undefined>) => {
  const handler: MouseEventHandler = async () => {
    const includesHyphen = selection.includes('-')
    const id = includesHyphen
                ? selection.split('-')[1].trim()
                : selection 
    const product = await getProductsById(id)
    if(!product)
      alert('Producto no encontrado')
    setProduct(product)
  }
  return handler 
}