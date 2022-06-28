import { MouseEventHandler } from "react"
import { alerter } from "../../Constants/Notifiers"
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
      alerter.alertError('Producto no encontrado')
    else 
      alerter.alert('Producto cargado')
    dispatch({
      action: "setProduct", 
      state: product
    })
  }
  return handler 
}