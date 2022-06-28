import { ProductDTO } from "../../../../../Share/ProductDTO"
import { Column } from "../../Components/Column"
import { TextInput } from "../../Components/TextInput"
import { myStateType } from "../../Hooks/useSitesMovements"

export const SiteQuantityInput = ({ name, product }: SiteQuantityInputProps) => {
  return (
    <Column className='is-4 is-offset-1 mt-5'>
      <TextInput 
        disabled 
        type='number' 
        name={name}  
        value={ product ? product[name]?.toString() : 0}/>
    </Column>
  )
}


interface SiteQuantityInputProps {
  product: myStateType
  name: keyof ProductDTO
}