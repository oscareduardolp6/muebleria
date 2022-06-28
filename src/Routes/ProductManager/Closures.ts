import { ProductDTO } from "../../../../../Share/ProductDTO"
import { alerter } from "../../Constants/Notifiers"
import { getProductsById } from "../../Services/ProductsService"
import { getProductId } from "../../Utils/AutoCompletes"

export const handleProductSearchClosure = (selection:string, callbackWithProduct: (product: ProductDTO) => any) => {
  const handleSearch = async () => {
    const id = getProductId(selection)
    const product = await getProductsById(id)
    if(!product)
      return alerter.alertError('Producto no encontrado')
    alerter.alert('Producto Encontrado')
    callbackWithProduct(product)
  }
  return handleSearch
}