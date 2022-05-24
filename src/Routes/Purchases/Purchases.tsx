import { useState } from "react"
import { ProductAutoCompleteRow } from "../../Components/ProductAutoCompleteRow"

export const Purchases = () => {
  const [selection, setSelection] = useState('')

  const handleSearch = async () => {}
  const autoCompleteProducts = {
    selection,
    setSelection, 
    handleSearch
  }
  return (
    <>
      <h1 className='title is-1 mt-5 ml-6 has-text-primary'>Compras</h1>
      <hr />
      <ProductAutoCompleteRow {...autoCompleteProducts} />
      
    </>
  )
}