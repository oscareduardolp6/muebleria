import { DropDown } from "../../../Components/DropDown";
import { ChangeEventSelect } from "../../../Types/TypesAliases";

export const SellersFilter = ({options, ...props}: SellersFilterProps) => {
  const uniqueOptions = [...new Set(options)]
  return (
    <DropDown
      defaultText="Vendedor" 
      defaultValue=""
      name="seller"
      labelText="Vendedor"
      options={uniqueOptions}
      {...props} />
  ) 
}
    
export interface SellersFilterProps {
  onChange: (e: ChangeEventSelect) => void
  options: string[]
}