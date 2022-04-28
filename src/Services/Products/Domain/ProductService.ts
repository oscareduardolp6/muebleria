import axios from "axios"
import { Product } from "../../../../../../Share/Product"
import { StatusCode } from "status-code-enum"

const validateStatus = (status: number) => 
  status === StatusCode.ClientErrorNotFound || status === StatusCode.RedirectFound 


export const getProductByProductID = async (id: string): Promise<Product | null> => {
  const { data, status } = await axios.get(`http://localhost:3030/products/${id}`, { validateStatus })
  if(status !== StatusCode.RedirectFound)
    return null
  return data.product as Product 
}