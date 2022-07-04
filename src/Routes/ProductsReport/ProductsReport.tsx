import { useEffect, useState } from "react";
import { ProductDTO } from "../../../../../Share/ProductDTO";
import { Button } from "../../Components/Button";
import { Column } from "../../Components/Column";
import { ColumnSize2 } from "../../Components/ColumnSize2";
import { DropDown } from "../../Components/DropDown";
import ProductTable from "../../Components/ProductTable_v2";
import { Columns } from "../../Components/ProductTable_v2/Types";
import { RouteTitle } from "../../Components/RouteTitle";
import { Row } from "../../Components/Row";
import { useProductsInProductsTable } from "../../Hooks/useProductsInProductsTable";
import { changeSelectHandlerClosure } from "../../Utils/ChangeHandler";
import { filterClosure } from "./Closures";

interface ProductsReportFilters {
  category: string 
  price: string 
  supplier: string
}

interface FiltersOptions {
  suppliers: string[]
}

const initialOptions: FiltersOptions = {
  suppliers: []
}

const initialFilters: ProductsReportFilters = {
  category: '', 
  price: '', 
  supplier: ''
}

const productFilterKeyEquivalences: Record<keyof ProductsReportFilters, keyof Columns> = {
  category: 'color', 
  price: 'price', 
  supplier: 'suppliers'
}



export const ProductsReport = () => {
  const [products, setProducts, getOriginalProducts] = useProductsInProductsTable()
  const [categories, setCategories] = useState<string[]>([])
  const [prices, setPrices] = useState<string[]>([])

  const [filters, setFilters] = useState(initialFilters)
  const [options, setOptions] = useState(initialOptions)

  useEffect(() => {
    const categories = getCategories(getOriginalProducts() ?? [])
    const prices = getPrices(getOriginalProducts() ?? [])
    const suppliers = getSuppliers(getOriginalProducts() ?? [])
    setOptions({
      ...options, 
      suppliers
    })
    setCategories(categories)
    setPrices(prices)
  }, [products])

  const changeFilterClosure = (key: keyof ProductsReportFilters) => changeSelectHandlerClosure(value => setFilters({
    ...filters, 
    [key]: value
  }))

  const changeCategory  = changeFilterClosure('category')
  const changePrice     = changeFilterClosure('price')
  const changeSuppier   = changeFilterClosure('supplier')

  const filterProducts = () => {
    let filteredProducts = getOriginalProducts()
    const filtersKeys = Object.keys(filters)
    filtersKeys.forEach(key_ => {
      const key = key_ as keyof ProductsReportFilters
      console.log(`El resultado de filters[key] : ${filters[key]}`);
      if(filters[key]) 
        filteredProducts = filteredProducts.filter(
          product => {
            const productKey = productFilterKeyEquivalences[key]
            console.log(`Comparando ${product[productKey]} con ${filters[key]}`)
            console.log(`Es: ${product[productKey] == filters[key]}`);
            
            return product[productKey] == filters[key]
          }
        )
    })
    console.log(filteredProducts);
    
    setProducts(filteredProducts)
  }

  return (
    <>
      <RouteTitle>Reporte de Productos</RouteTitle>
      <Row className="ml-5 mb-5 mt-5">
        <Column className=' is-2'>
          <DropDown 
            defaultText='Seleccione una categoría' 
            onChange={changeCategory} 
            labelText='Categoría' 
            options={categories} />
        </Column>
        <Column className='is-2'>
          <DropDown  
            defaultText='Seleccione un precio' 
            onChange={changePrice} 
            labelText='Precio' 
            options={prices} />
        </Column>
        <ColumnSize2>
          <DropDown 
            defaultText="Seleccione un proveedor"
            onChange={changeSuppier}
            labelText='Proveedor'
            options={options.suppliers} />
        </ColumnSize2>
        <ColumnSize2>
          <Button type='button' onClick={filterProducts} style={{marginTop: '2em'}} buttonColor='link'>Buscar</Button>
        </ColumnSize2>
      </Row>
      <hr className='mx-5' />
      <div className="mt-5 mx-5">
        <ProductTable products={products} />
      </div>
    </>
  )
}

const getKeyOfColumns = (key: keyof Columns) => 
  (products: Columns[]): string[] => {
    const filterElements = products.map(product => product[key] as string)
    const elements = new Set(filterElements)
    return [...elements]
  }

const getCategories = getKeyOfColumns('color')
const getPrices = getKeyOfColumns('price')
const getSuppliers = getKeyOfColumns('suppliers')