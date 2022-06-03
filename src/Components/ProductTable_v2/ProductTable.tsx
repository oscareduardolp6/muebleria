import DataTable from "react-data-table-component"
import { useProductsInProductsTable } from "../../Hooks/useProductsInProductsTable"
import { dataTableHeaders } from "./Columns"
import { Columns } from "./Types"

export const ProductTable = ({products}: ProductTableProps) => 
  <DataTable columns={dataTableHeaders} data={products ?? []} />
export interface ProductTableProps{
  products?: Columns[]
}