import { Columns } from "./Types"

const headers: Columns = {
  id: 'ID Producto', 
  name: 'Nombre', 
  color: 'Categoría', 
  price: 'Precio', 
  publicPrice: 'Precio Público', 
  mortgagePrice: 'Precio Hipóteca', 
  privateSiteQuantity: 'Almacén', 
  showSiteQuantity: 'Exhibición', 
  totalStock: 'Total'
}

const toDataRow = ([key, name]: (string | number)[]) => {
  const result = {
    name, 
    selector: (row: any) => row[key], 
    sortable: true
  }
  if(key === 'name') 
    return { ...result, width: '25%'}
  return result 
} 

export const dataTableHeaders = Object.entries(headers).map(toDataRow)