import { ProductDTO } from "../../../../../Share/ProductDTO"

export type ColumnsKeys = Pick<ProductDTO,
    'color'
  | 'id'
  | 'mortgagePrice'
  | 'name'
  | 'price'
  | 'publicPrice'
  | 'privateSiteQuantity'
  | 'showSiteQuantity'
  | 'suppliers'>

export type ColumnKeysWithTotals = keyof ColumnsKeys | 'totalStock'

export type Columns = Record<ColumnKeysWithTotals, string | number>