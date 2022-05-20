import DataTable from "react-data-table-component"
import { columns, DataRowTransaction } from "./TransactionTableColumns"

export const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div className="mt-5 mx-5">
      <DataTable 
        columns={columns} 
        data={transactions}/>
    </div>
  )
}

export interface TransactionTableProps {
  transactions: DataRowTransaction[]
}