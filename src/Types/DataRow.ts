import { Product } from "../../../../Share/Product"

export type DataRowProduct = Pick<Product, 
  'productID' 
  | 'name' 
  | 'publicStockQuantity' 
  | 'privateStockQuantity'
  | 'totalStockQuantity'
  | 'basePrice'
  | 'publicPrice'
  | 'mortgagePrice'> 