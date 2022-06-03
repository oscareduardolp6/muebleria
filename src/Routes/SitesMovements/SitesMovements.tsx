import { useReducer, useState } from "react"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { AutoCompleteProducts } from "../../Components/AutoCompleteProducts"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { RouteTitle } from "../../Components/RouteTitle"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { siteMovementsReducer } from "../../Hooks/useSitesMovements"
import { updateProduct } from "../../Services/ProductsService"
import { DecrementButton, IncrementButton } from "./ActionsButtons"
import { getSearchHandler } from "./HandlerGenerators"

const initialState: Partial<ProductDTO> = {
  showSiteQuantity: 0, 
  privateSiteQuantity: 0
}

export const SitesMovements = () => {
  const [selection, setSelection] = useState('')
  const [product, dispatch] = useReducer(siteMovementsReducer, initialState)

  const handleSearch = getSearchHandler(selection, dispatch)

  const decrementPrivateSite = () => dispatch({action: 'decrementPriveteSiteQuantity'})
  const incrementPrivateSite = () => dispatch({action: 'incrementPrivateSiteQuantity'})
  const decrementPublicSite = () => dispatch({action: 'decrementPublicSiteQuantity'})
  const incrementPublicSite = () => dispatch({action: 'incrementPublicSiteQuantity'})

  const handleSave = async () => {
    const updated = await updateProduct(product as ProductDTO)
    const message = updated 
                      ? `Producto con ID: ${product?.id} fue actualizado con éxito`
                      : `Producto con ID: ${product?.id} tuvo un problema para ser actualizado`
    alert(message)
  }

  return (
    <>
      <RouteTitle>Movimientos entre almacenes</RouteTitle>
      <Row className='ml-5 mt-5'>
        <Column className="is-4">
          <Label>Producto</Label>
          <div className="is-flex is-justify-content-space-between">
            <AutoCompleteProducts value={selection} setValue={setSelection} />
            <Button className="ml-5" onClick={handleSearch}>Buscar</Button>
            <Button buttonColor='info' className='ml-5'>Limpiar</Button>
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
          <TextInput disabled type='number' name="showSiteQuantity"  value={product?.showSiteQuantity ?? 0}/>
        </Column>
        <Column className='is-4 is-offset-1 mt-5'>
          <TextInput disabled type='number' name='privateSiteQuantity'  value={product?.privateSiteQuantity ?? 0} />
        </Column>
      </Row>
      <Row className="mt-5">
        <DecrementButton onClick={decrementPublicSite}/>
        <IncrementButton onClick={incrementPublicSite}/>
        <DecrementButton onClick={decrementPrivateSite} className="is-offset-3"/>
        <IncrementButton onClick={incrementPrivateSite}/>
      </Row>
      <Row>
        <Button 
          className="column is-offset-5 mt-6 is-1" 
          style={{paddingBottom: '2em' }} 
          buttonColor='success'
          onClick={handleSave}>
            Guardar
        </Button>
      </Row>
    </>
  )
}