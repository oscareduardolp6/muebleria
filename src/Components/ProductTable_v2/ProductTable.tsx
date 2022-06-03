import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { getAllProducts } from '../../Services/ProductsService'

export const ProductTable = () => {
  const [products, setProducts] = useState<Columns[]>()

  useEffect(() => {
    const asyncEffect = async () => {
      const serviceProducts = await getAllProducts()
      if(!serviceProducts) return alert('No se pudieron recuperar los productos, tal vez el servidor está caído o exíste algún problema')
      const rows = serviceProducts.map(product => {
        const result: Columns = {
          ...product, 
          totalStock: (product.privateSiteQuantity + product.showSiteQuantity)
        }
        return result
      })
      setProducts(rows)
    }
    asyncEffect()
  }, [])

  return (
    <DataTable columns={dataTableHeaders} data={products ?? []} />
  )
}

type ColumnsKeys = Pick<ProductDTO, 
    'color'
  | 'id' 
  | 'mortgagePrice'
  | 'name' 
  | 'price'
  | 'publicPrice'
  | 'privateSiteQuantity' 
  | 'showSiteQuantity'> 

type ColumnKeysWithTotals = keyof ColumnsKeys | 'totalStock' 

type Columns = Record<ColumnKeysWithTotals, string | number>

const headers: Columns = {
  id: 'ID Producto', 
  name: 'Nombre', 
  color: 'Categoría', 
  price: 'Precio', 
  publicPrice: 'Precio Público', 
  mortgagePrice: 'Precio Hipóteca', 
  privateSiteQuantity: 'Almacén', 
  showSiteQuantity: 'Exhibición', 
  totalStock: 'Total'
}

const toDataRow = ([key, name]: (string | number)[]) => {
  const result = {
    name, 
    selector: (row: any) => row[key], 
    sortable: true
  }
  if(key === 'name') 
    return { ...result, width: '25%'}
  return result 
} 

const dataTableHeaders = Object.entries(headers).map(toDataRow)