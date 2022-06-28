import { useReducer, useState } from "react"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { AutoCompleteProducts } from "../../Components/AutoCompleteProducts"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { RouteTitle } from "../../Components/RouteTitle"
import { Row } from "../../Components/Row"
import { alerter } from "../../Constants/Notifiers"
import { siteMovementsReducer } from "../../Hooks/useSitesMovements"
import { updateProduct } from "../../Services/ProductsService"
import { DecrementButton, IncrementButton } from "./ActionsButtons"
import { getSearchHandler } from "./HandlerGenerators"
import { SaveButton } from "./SaveButton"
import { SiteQuantityInput } from "./SiteQuantityInput"

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
    updated 
      ? alerter.alert(`Producto con ID: ${product?.id} fue actualizado con éxito`) 
      : alerter.alertError(`Producto con ID: ${product?.id} tuvo un problema para ser actualizado`)
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
        <SiteQuantityInput name='showSiteQuantity' product={product} />
        <SiteQuantityInput name='privateSiteQuantity' product={product} />
      </Row>
      <Row className="mt-5">
        <DecrementButton onClick={decrementPublicSite}/>
        <IncrementButton onClick={incrementPublicSite}/>
        <DecrementButton onClick={decrementPrivateSite} className="is-offset-3"/>
        <IncrementButton onClick={incrementPrivateSite}/>
      </Row>
      <SaveButton handleSave={handleSave} />
    </>
  )
}