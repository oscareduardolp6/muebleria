import { useState } from "react"
import { AutoCompleteProducts } from "../../Components/AutoCompleteProducts"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { useSitesMovements } from "../../Hooks/useSitesMovements"
import { DecrementButton, IncrementButton } from "./ActionsButtons"
import { getSearchHandler } from "./HandlerGenerators"


export const SitesMovements = () => {
  const [selection, setSelection] = useState('')
  const [[showSite, privateSite], setProduct, incrementPublicSite, decrementPublicSite, incrementPrivateSite, decrementPrivateSite] = useSitesMovements()
  const handleSearch = getSearchHandler(selection, setProduct)

  return (
    <>
      <Row className='ml-5 mt-5'>
        <Column className="is-3">
          <Label>Producto</Label>
          <div className="is-flex is-justify-content-space-between">
            <AutoCompleteProducts value={selection} setValue={setSelection} />
            <Button className="ml-5" onClick={handleSearch}>Buscar</Button>
          </div>
        </Column>
      </Row>
      <Row>
        <Column className='is-half is-offset-2 mt-5'>
          <Label>Exhibición</Label>
        </Column>
        <Column className='is-half'>
          <Label>Almacén</Label>
        </Column>
      </Row>
      <Row>
        <Column className='is-4 is-offset-1 mt-5'>
          <TextInput disabled type='number' name="product.showSiteQuantity"  value={showSite ?? 0}/>
        </Column>
        <Column className='is-4 is-offset-1 mt-5'>
          <TextInput disabled type='number' name='privateSiteQuantity'  value={privateSite ?? 0} />
        </Column>
      </Row>
      <Row className="mt-5">
        <DecrementButton onClick={decrementPublicSite}/>
        <IncrementButton onClick={incrementPublicSite}/>
        <DecrementButton onClick={decrementPrivateSite} className="is-offset-3"/>
        <IncrementButton onClick={incrementPrivateSite}/>
      </Row>
      <Row>
        <Button className="column is-offset-8 mt-6 is-2" style={{paddingBottom: '2em' }}>Guardar</Button>
      </Row>
    </>
  )
}