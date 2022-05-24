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
  const rows = transactions.map(transactionDTOParse)
  return rows
}

