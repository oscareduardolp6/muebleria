import { Button } from "../../Components/Button"
import { Row } from "../../Components/Row"

export const SaveButton = ({handleSave}: SaveButtonProps) => (
  <Row>
  <Button 
    className="column is-offset-5 mt-6 is-1" 
    style={{paddingBottom: '2em' }} 
    buttonColor='success'
    onClick={handleSave}>
      Guardar
  </Button>
</Row>
)

interface SaveButtonProps {
  handleSave: () => Promise<void>
}