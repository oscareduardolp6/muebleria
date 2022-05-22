import { TableColumn } from "react-data-table-component"

export type DataRowOrder = {
  product: string 
  basePrice: number | string
  mortgagePrice: number | string
  publicPrice: number | string
  quantity: number | string
  unitPrice: number | string
}

const myColumns: DataRowOrder = {
  product: 'Producto', 
  unitPrice: 'Precio unitario',
  basePrice: 'Precio Base', 
  mortgagePrice: 'Precio Hipóteca', 
  publicPrice: 'Precio Público', 
  quantity: 'Cantidad' 
}

const entries = Object.entries(myColumns)

const createDataRow = ([key, name]: (string|number)[]) => {
  return {
    name, 
    selector: (row: any) => row[key], 
    sortable: true
  }
}

export const columns: TableColumn<DataRowOrder>[] = entries.map(createDataRow)