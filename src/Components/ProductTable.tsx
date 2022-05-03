import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../Config/ProductTableColumns'
import { Testdata } from '../Config/TestData'
import { useForm } from '../Hooks/useForm'
import { useProductDataRow } from '../Hooks/useProductDataRow'
import { useStateCustom } from '../Hooks/useStateCustom'
import { getProducts } from '../Services/ProductService'
import { DataRowProduct } from '../Types/DataRow'
import { ChangeEvent } from '../Types/TypesAliases'
import { Column } from './Column'
import { Label } from './Label'
import { Row } from './Row'
import { TextInput } from './TextInput'

export const ProductTable = ({ handleSelection, selectable = false }: ProductTableProps) => {
  const [form, handleChange] = useForm({ searched: '' })
  const [products, setProducts, reset] = useProductDataRow()

  useEffect(() => {
    const asyncEffect = async () => {
      const products = await getProducts() 
      console.log('products');
      console.log(products);
      if(!products) 
        return alert('No hay productos para mostrar')
      const newProducts = products as DataRowProduct[]
      console.log('New Products'); 
      console.log(newProducts); 
      setProducts(products as DataRowProduct[])
    }
    asyncEffect()
  }, [])

  const handleSearchChange = createHandleSearchChange(handleChange, reset, setProducts, products)
  return(
    <>
      <Row>
        <Column className='is-3 ml-5 is-flex'>
          <div>
            <Label>ID Producto</Label>
            <TextInput 
              name='searched' 
              placeholder='A20' 
              onChange={handleSearchChange} 
              value={form.searched} />
          </div>
        </Column>
      </Row>
      <div className='mx-5 my-5'>
        <DataTable 
          className='mt-5 mx-5' 
          columns={columns} 
          data={products} 
          onSelectedRowsChange={handleSelection}
          selectableRows={selectable} />
      </div>
    </>
  )
}

export type SelectedParam = {
  allSelected: boolean, 
  selectedCount: number, 
  selectedRows: DataRowProduct[]
}

export type HandleSelectionFunction = (selected: SelectedParam) => void
export interface ProductTableProps { 
  selectable?: boolean 
  handleSelection: HandleSelectionFunction
}

const createHandleSearchChange = (handleChange: any, reset: any, setData: any, data: DataRowProduct[]) => {
  return (e: ChangeEvent) => {
    handleChange(e)
    const { value } = e.target
    if(value === '')
      return reset()
    const newData = data.filter(row => row.productID.includes(value))
    console.log('Nwe Data');
    console.log(newData);
    setData(newData)
  }
}