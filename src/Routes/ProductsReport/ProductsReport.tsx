import { useEffect, useState } from "react";
import { Column } from "../../Components/Column";
import { DropDown } from "../../Components/DropDown";
import ProductTable from "../../Components/ProductTable_v2";
import { Columns } from "../../Components/ProductTable_v2/Types";
import { RouteTitle } from "../../Components/RouteTitle";
import { Row } from "../../Components/Row";
import { useProductsInProductsTable } from "../../Hooks/useProductsInProductsTable";
import { filterClosure } from "./Closures";

export const ProductsReport = () => {
  const [products, setProducts, getOriginalProducts] = useProductsInProductsTable()
  const [categories, setCategories] = useState<string[]>([])
  const [prices, setPrices] = useState<string[]>([])

  useEffect(() => {
    const categories = getCategories(getOriginalProducts() ?? [])
    const prices = getPrices(getOriginalProducts() ?? [])
    setCategories(categories)
    setPrices(prices)
  }, [products])

  const createFilter = (key:  keyof Columns) => {
    return filterClosure({
      key, 
      setProducts, 
      products, 
      originalProducts: getOriginalProducts, 
      emptyValue: ''
    })
  }

  const filterByCategory = createFilter('color')

  const filterByPrice = createFilter('price')

  return (
    <>
      <RouteTitle>Reporte de Productos</RouteTitle>
      <Row className="ml-5 mb-5 mt-5">
        <Column className=' is-2'>
          <DropDown 
            defaultText='Seleccione una categoría' 
            onChange={filterByCategory} 
            labelText='Categoría' 
            options={categories} />
        </Column>
        <Column>
          <DropDown  
            defaultText='Seleccione un precio' 
            onChange={filterByPrice} 
            labelText='Precio' 
            options={prices} />
        </Column>
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