import { SetAction } from "../Types/TypesAliases";
import { AutoCompleteClients } from "./AutoCompleteClients";
import { Button } from "./Button";
import { Column } from "./Column";
import { Label } from "./Label";
import { Row } from "./Row";

export const AutoCompleteClientsRow = ({ selection, setSelection, handleSearch, handleClean }: AutoCompleteClientsRowProps) => (
  <Row className="ml-5">
    <Column className="is-4">
      <Label>ID del Cliente</Label>
      <div className="is-flex is-justify-content-space-between">
        <AutoCompleteClients setValue={setSelection} value={selection} />
        { handleSearch && <Button className="ml-5" onClick={handleSearch}>Buscar</Button> }
        { handleClean && <Button className="ml-4" onClick={handleClean} buttonColor='info'>Limpiar</Button> }
        </div>
    </Column>
  </Row>
)

export interface AutoCompleteClientsRowProps {
  selection: string
  setSelection: SetAction<string>
  handleSearch?: (e: any) => Promise<void>
  handleClean?: (e:any) => void
}