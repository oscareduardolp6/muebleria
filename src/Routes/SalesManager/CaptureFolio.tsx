import { ColumnSize4 } from "../../Components/ColumnSize4"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { ChangeEvent } from "../../Types/TypesAliases"

export const CaptureFolio = ({ text, ...rest }: CaptureFolioProps) => {
  return (
    <>
      <h3 className='is-size-3 has-text-white has-text-centered mt-5'>
        Ingresa el Folio de la venta 
      </h3>
      <hr />
      <Row>
        <ColumnSize4 className='is-offset-4'>
          <TextInput type='text' value={text} {...rest} />
        </ColumnSize4>
      </Row>
    </>
  )
}

export interface CaptureFolioProps {
  text: string 
  onChange: (event: ChangeEvent) => void
  name: string
}