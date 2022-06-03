import { useEffect, useState } from "react"
import { RouteTitle } from "../../Components/RouteTitle"
import { TransactionsTable } from "../../Components/TransactionsTable/TransactionsTable"
import { DataRowTransaction } from "../../Components/TransactionsTable/TransactionTableColumns"
import { getAllTransactionAsDataRows } from "../../Services/TransactionsService"

export const Transactions = () => {
  const [transactions, setTransactions] = useState<DataRowTransaction[]>([]); 
  useEffect(() => { getAllTransactionAsDataRows().then(setTransactions) }, [])

  return (
    <>
      <RouteTitle>Transacciones</RouteTitle>
      <TransactionsTable transactions={transactions}/>
      <FlaticonAttribution />
    </>
  )
}

const FlaticonAttribution = () => 
  <a className='title is-7 has-text-white'  href="https://www.flaticon.com/free-icons/couch" title="couch icons">Couch icons created by Hilmy Abiyyu A. - Flaticon</a>