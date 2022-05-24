import axios from "axios";
import StatusCode from "status-code-enum";
import { OrderRowDTO } from "../../../../Share/OrderRowDTO";
import { ProductDTO } from "../../../../Share/ProductDTO";
import { BASE_URL } from "../Config/BaseURL";

const myAxios = axios.create({ baseURL: `${BASE_URL}`})

const route = '/sales_v2'

const DEFAULT_MESSAGE = 'Hubo un problema con la transacción verifique existencias del producto y vuelva a intentar, producto: '

const transactionSavedStatus = (status: number) => 
      status === StatusCode.SuccessCreated 
  ||  status === StatusCode.ClientErrorRangeNotSatisfiable 
  ||  status === StatusCode.ClientErrorNotAcceptable

const transactionSavedConfig = { validateStatus: transactionSavedStatus}

export enum SavedTransactionsResult {
  Created         = StatusCode.SuccessCreated,
  NotEnoughStock  = StatusCode.ClientErrorRangeNotSatisfiable,
  Error           = StatusCode.ClientErrorNotAcceptable
}

const resultMessage: Record<Partial<SavedTransactionsResult>, string> = {
  201: 'Transacción completada con éxito, del producto: ', 
  416: 'No existe suficiente stock para satisfacer la transacción del producto: '
}

export const saveTransaction = async (order: OrderRowDTO): Promise<saveTransactionData> => {
  const { status, data } = await myAxios.post(route, order, transactionSavedConfig)
  const productData = data.transactionResults as productResult[]
  console.log('Data del update ');
  console.log(productData);
  const message = resultMessage[status] || DEFAULT_MESSAGE
  const result: saveTransactionData = {
    message: message + order.productID, 
    productInfo: productData
  }
  return result
}

type saveTransactionData = {
  message: string 
  productInfo?: productResult[]
}

type productResult = Pick<ProductDTO, 'name' | 'id' | 'alertLowStockQuantity'>