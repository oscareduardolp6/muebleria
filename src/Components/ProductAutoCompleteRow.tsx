import { SetAction } from "../Types/TypesAliases";
import { AutoCompleteProducts } from "./AutoCompleteProducts";
import { Button } from "./Button";
import { Column } from "./Column";
import { Label } from "./Label";
import { Row } from "./Row";

export const ProductAutoCompleteRow = ({selection, setSelection: setValue, handleSearch, clearSelection}: ProductAutoCompleteRowProps ) => (
  <Row className='ml-5 mt-5'>
    <Column className='is-4'>
      <Label>ID del Producto</Label>
      <div className='is-flex is-justify-content-space-between'>
        <AutoCompleteProducts setValue={setValue} value={selection}  />
        <Button className='ml-5' onClick={handleSearch}>Buscar</Button>
        { clearSelection && <Button buttonColor='info' className='ml-4' onClick={clearSelection}>Limpiar</Button> }
      </div>
    </Column>
  </Row>
)

export interface ProductAutoCompleteRowProps {
  selection: string
  setSelection: SetAction<string>
  handleSearch: (e: any) => Promise<void> | ((e: any) => void)
  clearSelection?: (e: any) => void
}