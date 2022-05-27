import { TableColumn } from "react-data-table-component"
import { DataRowProduct } from "../Types/DataRow"

// const myColumns_: DataRowProduct = {
//   productID: 'ID', 
//   name: 'Nombre', 
//   basePrice: 'Precio Base', 
//   publicPrice: 'P. Público', 
//   mortgagePrice: 'P. Hipoteca', 
//   publicStockQuantity: 'Exhibición', 
//   privateStockQuantity: 'Almacén',
//   totalStockQuantity: 'Total'
// }

const entries = Object.entries([])

const createDataRow = ([key, name]: string[]) => {
  const result = {
    name, 
    selector: (row: any) => row[key], 
    sortable: true
  }
  if(key === 'name') 
    return { ...result, width: '25%'}
  return result
}

// export const columns: TableColumn<DataRowProduct>[] = entries.map(createDataRow)
export const columns: any[] = []


