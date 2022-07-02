import { TableColumn } from "react-data-table-component";
import { TransactionDTO } from "../../../../../Share/TransactionDTO"

export type DataRowTransaction = Record<keyof Omit<TransactionDTO, 'sellerId'>, string>

const myColumns: DataRowTransaction = {
  transactionId: 'Transacción', 
  type: 'Tipo de Transacción',
  productId: 'ID Producto', 
  price: 'Precio',
  quantity: 'Cantidad', 
  date: 'Fecha',
  clientId: 'ID Cliente',
  supplierId: 'Proveedor',
  fromSite: 'Origen', 
  toSite: 'Destino', 
  sellerName: 'Vendedor'
}

const entries = Object.entries(myColumns)

const createDataRow = ([key, name]: string[]) => {
  return {
    name, 
    selector: (row: any) => row[key], 
    sortable: true
  }
}

export const columns: TableColumn<DataRowTransaction>[] = entries.map(createDataRow)
