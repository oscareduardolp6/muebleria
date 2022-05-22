import DataTable from "react-data-table-component";
import { columns, DataRowOrder } from "./OrderTableColumns";

export const OrderTable = ({ products }: OrderTableProps) => (
  <div className="mt-5 mx-5">
    <DataTable 
      columns={columns} 
      data={products} />
  </div>
)

export interface OrderTableProps {
  products: DataRowOrder[]
}