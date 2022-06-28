import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"

export const SelectStockQuantity = ({quantity, handleChangeQuantity, name}: SelectStockQuantityProps) => {
  return (
    <>
      <h3 className='is-size-3 has-text-white has-text-centered mt-5'>
        ¿Cuál será la cantidad mínima de Stock? 
      </h3>
      <hr />
      <Row>
        <Column className='is-4 is-offset-4'>
          <TextInput type='number' min='1' value={quantity} onChange={handleChangeQuantity} name={name} />
        </Column>
      </Row>
    </>
  )

}

export interface SelectStockQuantityProps {
  quantity: number
  handleChangeQuantity: any
  name: string
}