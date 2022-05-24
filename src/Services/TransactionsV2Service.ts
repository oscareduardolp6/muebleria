import axios from "axios";
import StatusCode from "status-code-enum";
import { OrderRowDTO } from "../../../../Share/OrderRowDTO";
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

export const saveTransaction = async (order: OrderRowDTO): Promise<string> => {
  const { status } = await myAxios.post(route, order, transactionSavedConfig)
  const message = resultMessage[status] || DEFAULT_MESSAGE
  return message + order.productID
}