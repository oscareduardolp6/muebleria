import { useState } from "react"
import { AutoCompleteProducts } from "../../Components/AutoCompleteProducts"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { Row } from "../../Components/Row"

export const ProductManager = () => {
  const [selection, setSelection] = useState('')
  return (
    <>
      <Row className='ml-5 mt-5'>
        <Column className='is-4'>
          <Label>ID del Producto</Label>
          <div className='is-flex is-justify-content-space-between'>
            <AutoCompleteProducts value={selection} setValue={setSelection} />
            <Button className='ml-5'>Buscar</Button>
            <Button buttonColor='info' className='ml-5'>Limpiar</Button>
          </div>
        </Column>
      </Row>
    </>
  )
}