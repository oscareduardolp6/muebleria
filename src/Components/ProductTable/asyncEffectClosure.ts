import { getProducts } from "../../Services/ProductService"
import { DataRowProduct } from "../../Types/DataRow"

export const productTableAsyncEffectClosure = (setProducts: (val: any) => void) => {
  const asyncEffect = async () => {
    const products = await getProducts()
    if(!products)
      return alert('No hay productos para mostrar')
    const newProducts = products as DataRowProduct[]
    setProducts(newProducts)
  }
  return asyncEffect
}