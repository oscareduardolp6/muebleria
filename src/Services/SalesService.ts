import axios from "axios"
import StatusCode from "status-code-enum";
import { SaleDTO } from "../../../../Share/Sale";
import { BASE_URL } from "../Config/BaseURL";
import { created } from "../Config/StatusCodeFunctions";

const myAxios = axios.create({ baseURL: `${BASE_URL}/sales`})


export const saveSale = async (sale: SaleDTO) => {
  sale.clientID ||= 'Generic Client'
  console.log('Sale');
  console.log(sale);
  const config = { validateStatus: created }
  const { status } = await myAxios.post('', sale, config)
  if(status !== StatusCode.SuccessCreated)
    return false 
  return true
}