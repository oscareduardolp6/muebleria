import { DropDown } from "../../../Components/DropDown";
import { DropDownFilterProps } from "./DropDownFilterProps";

export const SellersFilter = ({options, ...props}: DropDownFilterProps) => {
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