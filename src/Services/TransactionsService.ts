import { TransactionDTO } from "../../../../Share/TransactionDTO";
import { parse as transactionDTOParse } from "../Components/TransactionsTable/TransactionDTOToDataRowTransactionParser";
import { getAllGenerator } from "./GeneralService";
import { DataRowTransaction } from '../Components/TransactionsTable/TransactionTableColumns';

const route = '/transactions'

export const getAllTransactions = getAllGenerator<TransactionDTO>(route, 'transactions')
export const getAllTransactionAsDataRows = async (): Promise<DataRowTransaction[]> => {
  let transactions: TransactionDTO[] | null
  try {
    transactions = await getAllTransactions()
  } catch (error) {
    alert('Servidor no levantado :(')
    console.error(error)
    return []
  }
  if(!transactions) return []
  let rows = transactions.map(transactionDTOParse)
  if(transactions.length > 1) 
    rows = [...rows, getTotalRow(rows)]
  return rows
}

export const getTotalRow  = (rows: DataRowTransaction[]) => {
  const prices = rows.map(row => row.price)
  const quantities = rows.map(row => row.quantity)
  const totalPrice = prices.reduce((prev, current) => Number(prev) + Number(current), 0)
  const totalQuantity = quantities.reduce((prev, current) => Number(prev) + Number(current), 0)
  const result: DataRowTransaction = {
    clientId: '', 
    date: '', 
    fromSite: '', 
    price: totalPrice.toString() , 
    productId: '', 
    quantity: totalQuantity.toString(), 
    supplierId: '', 
    toSite: '', 
    transactionId: 'Total', 
    type: 'Total'
  }
  return result
}
