import { useEffect, useState } from "react"
import { TransactionsTable } from "../../Components/TransactionsTable/TransactionsTable"
import { DataRowTransaction } from "../../Components/TransactionsTable/TransactionTableColumns"
import { getAllTransactionAsDataRows } from "../../Services/TransactionsService"

export const Transactions = () => {
  const [transactions, setTransactions] = useState<DataRowTransaction[]>([]); 
  useEffect(() => { getAllTransactionAsDataRows().then(setTransactions) }, [])

  return (
    <>
      <TransactionsTable transactions={transactions}/>
    </>
  )
}