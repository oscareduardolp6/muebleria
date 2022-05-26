import { useEffect, useState } from "react"
import { TransactionsTable } from "../../Components/TransactionsTable/TransactionsTable"
import { DataRowTransaction } from "../../Components/TransactionsTable/TransactionTableColumns"
import { getAllTransactionAsDataRows } from "../../Services/TransactionsService"

export const Transactions = () => {
  const [transactions, setTransactions] = useState<DataRowTransaction[]>([]); 
  useEffect(() => { getAllTransactionAsDataRows().then(setTransactions) }, [])

  return (
    <>
      <h1 className='title is-1 mt-5 ml-6 has-text-primary'>Transacciones</h1>
      <hr />
      <TransactionsTable transactions={transactions}/>
      <a className='title is-7 has-text-white'  href="https://www.flaticon.com/free-icons/couch" title="couch icons">Couch icons created by Hilmy Abiyyu A. - Flaticon</a>
    </>
  )
}