import { ProductDTO } from '../../../../Share/ProductDTO'
import { getAllGenerator, getByIdGenerator, updateGenerator, saveGenerator } from './GeneralService'

const route = '/products_v2'

export const getAllProducts = getAllGenerator<ProductDTO>(route, 'products')

export const getProductsById = getByIdGenerator<ProductDTO>(route, 'product')

export const updateProduct = updateGenerator<ProductDTO>(route)

export const createProduct = saveGenerator<ProductDTO>(route)