import { useState } from "react"
import { DataRowProduct } from "../Types/DataRow"

let storageProducts: any = null

export const useProductDataRow = () => {
  const [products, setProducts] = useState<any>([])
  const mySetProducts = (serviceProducts: DataRowProduct[]) => {
    const dataArray = serviceProducts.map(flatProductObject)
    setProducts(dataArray)
    if(!storageProducts)
      storageProducts = dataArray
  }
  const reset = () => setProducts(storageProducts)
  return [products, mySetProducts, reset] as [DataRowProduct[], (val: any) => void, (x: any) => any]
}

const flatProductObject = (obj: DataRowProduct) => {
  const result = {
    productID: obj.productID, 
    name: obj.name, 
    publicStockQuantity: obj.publicStockQuantity?.quantity ?? obj.publicStockQuantity,
    privateStockQuantity: obj.privateStockQuantity?.quantity ?? obj.privateStockQuantity, 
    totalStockQuantity: obj.totalStockQuantity?.quantity ?? obj.totalStockQuantity, 
    basePrice: obj.basePrice?.value ?? obj.basePrice, 
    mortgagePrice: obj.mortgagePrice?.value ?? obj.mortgagePrice, 
    publicPrice: obj.publicPrice?.value ?? obj.publicPrice, 
  }
  return result
}