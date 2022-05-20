import { TransactionDTO, transactionTypesDescription, TransactionTypes } from "../../../../../Share/TransactionDTO";
import { DataRowTransaction } from "./TransactionTableColumns";

export const parse = (transactionDTO: TransactionDTO): DataRowTransaction => {
  const date = new Date(transactionDTO.date)
  console.log('Parseand');
  console.log(transactionDTO);
  const transactionRow: DataRowTransaction = {
    clientId: transactionDTO.clientId, 
    date: date.toLocaleDateString(), 
    price: transactionDTO.price.toString(), 
    productId: transactionDTO.productId, 
    quantity: transactionDTO.quantity.toString(), 
    supplierId: transactionDTO.supplierId.toString(),
    transactionId: transactionDTO.transactionId.toString(), 
    type: `${transactionTypesDescription[transactionDTO.type]} ${typeSymbols[transactionDTO.type]}`, 
    fromSite: transactionDTO.fromSite, 
    toSite: transactionDTO.toSite
  }
  return transactionRow
}

const typeSymbols: Record<TransactionTypes,string> = {
  "1": '⬆️', 
  "2": '⬇️', 
  "3": '💥', 
  "4": '🔃'
}