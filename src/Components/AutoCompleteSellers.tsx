import { getAllSellers } from "../Services/SellerService";
import { ChildCustomAutoCompleteProps, CustomAutoComplete } from "./CustomAutoComplete";

export const AutoCompleteSelles = ({ setValue, value}: ChildCustomAutoCompleteProps) => 
  <CustomAutoComplete 
    getAllService={getAllSellers} 
    itemIdKey='id'
    itemNameKey='names'
    name='sellers'
    setValue={setValue}
    value={value}
    /> 



