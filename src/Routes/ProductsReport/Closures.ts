import { Columns } from "../../Components/ProductTable_v2/Types";
import { ChangeEventSelect } from "../../Types/TypesAliases";

export const filterClosure = ({ key, products, setProducts, originalProducts, emptyValue = '' }: FilterClosureParams) => {
  const filter = ({target: {value}}: ChangeEventSelect) => {
    if(!products) return 
    if(value === emptyValue) return setProducts(originalProducts())
    const filteredProducts = originalProducts().filter(product => product[key] == value)
    setProducts(filteredProducts)
  }
  return filter
}

type FilterClosureParams = {
  key: keyof Columns
  products?: Columns[]
  emptyValue?: string
  setProducts: (products: Columns[]) => void
  originalProducts: () => Columns[]
}



