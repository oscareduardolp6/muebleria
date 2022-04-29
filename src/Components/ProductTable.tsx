import DataTable, { TableColumn } from 'react-data-table-component'

interface DataRow {
  productID: string 
  name: string
  publicStock: number
  privateStock: number
  totalStock: number 
  basePrice: number
  publicPrice: number 
  mortagagePrice: number 
}

const sortable = true

const columns: TableColumn<DataRow>[] = [
  {
    name: 'ID Producto', 
    selector: row => row.productID, 
    sortable
  },
  {
    name: 'Nombre', 
    selector: row => row.name,
    sortable
  }, 
  {
    name: 'Stock en exhibición', 
    selector: row => row.publicStock, 
    sortable 
  }, 
  {
    name: 'Stock en almacén', 
    selector: row => row.privateStock, 
    sortable 
  }, 
  {
    name: 'Stock total', 
    selector: row => row.totalStock, 
    sortable
  }, 
  {
    name: 'Precio Base', 
    selector: row => row.basePrice, 
    sortable
  }, 
  {
    name: 'Precio Público', 
    selector: row => row.publicPrice, 
    sortable
  }, 
  {
    name: 'Precio Hipoteca', 
    selector: row => row.mortagagePrice, 
    sortable
  }
]

const data: DataRow[] = [
  {
    basePrice: 100, 
    name: 'Artículo de prueba para la tabla', 
    mortagagePrice: 120, 
    privateStock: 10, 
    productID: 'A10',  
    publicPrice: 150, 
    publicStock: 15, 
    totalStock: 25
  }, 
  {
    basePrice: 100, 
    name: 'Artículo de prueba para la tabla', 
    mortagagePrice: 120, 
    privateStock: 10, 
    productID: 'A10',  
    publicPrice: 150, 
    publicStock: 15, 
    totalStock: 25
  },
  {
    basePrice: 100, 
    name: 'Artículo de prueba para la tabla', 
    mortagagePrice: 120, 
    privateStock: 10, 
    productID: 'A10',  
    publicPrice: 150, 
    publicStock: 15, 
    totalStock: 25
  }, 
  {
    basePrice: 100, 
    name: 'Artículo de prueba para la tabla', 
    mortagagePrice: 120, 
    privateStock: 10, 
    productID: 'A10',  
    publicPrice: 150, 
    publicStock: 15, 
    totalStock: 25
  }
]

export const ProductTable = () => (
  <div className='mx-5 my-5'>
    <DataTable className='mt-5 mx-5' columns={columns} data={data} selectableRows/>
  </div>
)