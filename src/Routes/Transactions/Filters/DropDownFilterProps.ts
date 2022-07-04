import { ChangeEventSelect } from './../../../Types/TypesAliases'
export interface DropDownFilterProps {
  onChange: (e: ChangeEventSelect) => void 
  options: string[]
}