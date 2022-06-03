import { useEffect, useState } from "react"
import { ProductDTO } from "../../../../Share/ProductDTO"
import { Columns } from "../Components/ProductTable_v2/Types"
import { getAllProducts } from "../Services/ProductsService"

let originalProducts: Columns[]

export const useProductsInProductsTable = () => {
  const [products, setProducts] = useState<Columns[]>()

  const getProducts = async () => {
    const serviceProducts = await getAllProducts()
    if(!serviceProducts) throw new Error("No se pudieron recuperar los productos, tal vez el servidor está caído o exíste algún problema");
    const rows = serviceProducts.map(productDTOToColumnType)
    setProducts(rows)
    originalProducts = rows
  }

  const getOriginalProducts = () => originalProducts

  useEffect(() => { getProducts() }, [])

  return [products, setProducts, getOriginalProducts] as [Columns[] , React.Dispatch<React.SetStateAction<Columns[]>>, () => Columns[]]
}

const productDTOToColumnType = (product: ProductDTO): Columns => {
  const { privateSiteQuantity, showSiteQuantity } = product
  const result: Columns = {
    ...product, 
    totalStock: (privateSiteQuantity + showSiteQuantity)
  }
  return result
}