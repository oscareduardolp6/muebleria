import DataTable from "react-data-table-component"
import { forwardRef, LegacyRef } from "react"
import { columns, DataRowTransaction } from "./TransactionTableColumns"

export const TransactionsTable = forwardRef(({ transactions }: TransactionTableProps, ref ) => (
    <div className="mt-5 mx-5" ref={ref as LegacyRef<HTMLDivElement> | undefined}>
      <DataTable 
        columns={columns} 
        data={transactions}/>
    </div>
  ))

export interface TransactionTableProps {
  transactions: DataRowTransaction[]
}