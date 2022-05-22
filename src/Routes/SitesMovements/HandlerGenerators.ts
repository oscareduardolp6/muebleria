import { MouseEventHandler } from "react"
import { ActionPayload } from "../../Hooks/useSitesMovements"
import { getProductsById } from "../../Services/ProductsService"

export const getSearchHandler = (selection: string, dispatch: React.Dispatch<ActionPayload>) => {
  const handler: MouseEventHandler = async () => {
    const includesHyphen = selection.includes('-')
    const id = includesHyphen
                ? selection.split('-')[1].trim()
                : selection 
    const product = await getProductsById(id)
    if(!product)
      alert('Producto no encontrado')
    dispatch({
      action: "setProduct", 
      state: product
    })
  }
  return handler 
}