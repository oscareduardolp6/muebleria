import { DropDown } from "../../../Components/DropDown";
import { DropDownFilterProps } from "./DropDownFilterProps";

export const CategoryFilter = ({options, ...props}: DropDownFilterProps) => {
  const uniqueOptions = [...new Set(options)]
  return (
    <DropDown
      defaultText="Categoría"
      defaultValue=""
      name="category"
      labelText="Categoría"
      options={uniqueOptions}
      {...props}
    />
  )
}