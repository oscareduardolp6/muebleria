import { Currency } from "../../../../Share/Currency"
import { Product } from "../../../../Share/Product"

export type ProductForm = Omit<Product, "recordID"> 

const nationalCurrency: Currency = {
  name: 'pesos', 
  shortName: 'MXN', 
  sufix: '$'
}

export const initialState: ProductForm = {
  productID: '', 
  basePrice: {
    value: 0, 
    currency: nationalCurrency
  }, 
  mortagePriceRelation: 1.25, 
  mortgagePrice: {
    currency: nationalCurrency, 
    value: 0
  }, 
  // mortgagePrice: {
  //   value: 0, 
  //   nationalCurrency
  // }, 
  name: '', 
  privateStockQuantity: {
    quantity: 0, 
    unit: 'unidades'
  }, 
  publicPrice: {
    value: 0, 
    currency: nationalCurrency
  }, 
  publicPriceRelation: 1.5, 
  publicStockQuantity: {
    quantity: 0, 
    unit: ''
  }, 
  totalStockQuantity: {
    quantity: 0, 
    unit: 'unidades'
  }, 
  brand: { name: '' }, 
  color: { name: '' }, 
  description: '', 
  fabric: { name: '' }, 
  lowStockAlert: true, 
  lowStockAlertQuantity: 0, 
  size: { name: '' }, 
  suppliers: [{ name: '' }]
}