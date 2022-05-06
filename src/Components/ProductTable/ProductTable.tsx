import { useCallback, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../Config/ProductTableColumns'
import { useForm } from '../../Hooks/useForm'
import { useProductDataRow } from '../../Hooks/useProductDataRow'
import { DataRowProduct } from '../../Types/DataRow'
import { Column } from '../Column'
import { Label } from '../Label'
import { Row } from '../Row'
import { TextInput } from '../TextInput'
import { productTableAsyncEffectClosure } from './asyncEffectClosure'
import { createHandleSearchChange } from './handleSearchChangeClosure'

export const ProductTable = ({ handleSelection, selectable = false }: ProductTableProps) => {
  const [form, handleChange] = useForm({ searched: '' })
  const [products, setProducts, reset] = useProductDataRow()
  const asyncEffect = useCallback(productTableAsyncEffectClosure(setProducts), [])
  const handleSearchChange = createHandleSearchChange(handleChange, reset, setProducts, products)
  useEffect(() => { asyncEffect() }, [])

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
