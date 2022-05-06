import { Column } from "../Components/Column";
import { Label } from "../Components/Label";
import { ProductTable } from "../Components/ProductTable/ProductTable"
import { Row } from "../Components/Row";
import { TextInput } from "../Components/TextInput";
import { useSelection } from "../Hooks/useSelection";

export const Sales = () => {
  const [selection, setSelection] = useSelection()
  
  
  return (
    <>
      <div className='mx-5 my-5'>
        <Row>
          <Column className="is-3">
            <Label>Nombre Cliente</Label>
            <TextInput />
          </Column>
          <Column className="is-3">
            <Label>Fecha</Label>
            <TextInput type='datetime-local' />
          </Column>
          <Column>
            <button 
              className="button is-primary" 
              onClick={e => alert(JSON.stringify(selection))}
              style={{ marginTop: '2.5em' }}>
                Registrar Venta
            </button>
          </Column>
        </Row>
      </div>
      <ProductTable selectable handleSelection={setSelection}/>
    </>
  )
}