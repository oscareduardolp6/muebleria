import { siteNames } from "../../../../../Share/SiteTypes";
import { TransactionDTO, transactionTypesDescription, TransactionTypes } from "../../../../../Share/TransactionDTO";
import { DataRowTransaction } from "./TransactionTableColumns";

export const parse = ({
  date, 
  clientId, 
  price, 
  productId, 
  quantity, 
  supplierId, 
  transactionId, 
  type, 
  fromSite, 
  toSite, 
  sellerName, 
  folio, 
  productCategory
}: TransactionDTO): DataRowTransaction => {
  const myDate = new Date(date)
  const transactionRow: DataRowTransaction = {
    clientId: clientId, 
    date: myDate.toLocaleDateString(), 
    price: price.toString(), 
    productId: productId, 
    quantity: quantity.toString(), 
    supplierId: supplierId.toString(),
    transactionId: transactionId.toString(), 
    type: `${transactionTypesDescription[type]} ${typeSymbols[type]}`, 
    fromSite: siteNames[fromSite],
    toSite: siteNames[toSite],
    sellerName: sellerName || 'No registrado', 
    folio: folio || transactionId.toString() , 
    productCategory: productCategory ||  'Sin categoría'
  }
  return transactionRow
}

const typeSymbols: Record<TransactionTypes,string> = {
  "1": '⬇️', 
  "2": '⬆️', 
  "3": '💥', 
  "4": '🔃', 
  "5": '⤵️'
}