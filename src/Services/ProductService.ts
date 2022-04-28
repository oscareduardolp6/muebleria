import axios from "axios"
import { Product } from "../../../../Share/Product"
import { StatusCode } from "status-code-enum"
import { ProductForm } from "../Config/ProductForm"
import { BASE_URL } from "../Config/BaseURL"

const validateStatusGetProductByProductID = (status: number) => 
  status === StatusCode.ClientErrorNotFound || status === StatusCode.RedirectFound 

const validateStatusSaveProduct = (status: number) => 
  status === StatusCode.ClientErrorNotAcceptable || StatusCode.SuccessCreated

const myAxios = axios.create({ baseURL: BASE_URL })

export const getProductByProductID = async (id: string): Promise<Product | null> => {
  const { data, status } = await myAxios.get(`/${id}`, { validateStatus: validateStatusGetProductByProductID })
  if(status !== StatusCode.RedirectFound)
    return null
  return data.product as Product 
}

export const saveProduct = async (product: ProductForm): Promise<boolean> => {
  const newProduct: Product = {...product, recordID: 0}
  const { status } = await myAxios.post('', newProduct, {validateStatus: validateStatusSaveProduct})
  if(status !== StatusCode.SuccessCreated)
    return false 
  return true
}