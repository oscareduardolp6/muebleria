import { useState } from "react"
import { OrderRowDTO } from "../../../../../Share/OrderRowDTO"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { AutoCompleteClientsRow } from "../../Components/AutoCompleteClientsRow"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import OrderTable from "../../Components/OrderTable"
import { ProductAutoCompleteRow } from "../../Components/ProductAutoCompleteRow"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { RowProductDTO, useOrder } from "../../Hooks/useOrder"
import { getProductsById } from "../../Services/ProductsService"
import { saveTransaction } from "../../Services/TransactionsV2Service"

const getProductId = (selection: string) => 
  selection.includes('-')
    ? selection.split('-')[1].trim()
    : selection

export const SalesManager = () => {
  const [selection, setSelection] = useState('')
  const [maxStock, setMaxStock] = useState(0)
  const [sellQuantity, setSellQuantity] = useState(1)
  const [clientSelection, setClientSelection] = useState('')
  const {orderProducts, displayOrderRows, addRow} = useOrder()
  const [currentProduct, setCurrentProduct] = useState<ProductDTO>()
  
  const clearClientSelection = () => setClientSelection('')

  const handleSaveTransaction = async () => {
    console.log(orderProducts)
    const results = await Promise.allSettled(orderProducts.map(saveTransaction))
    // const messages = results.map(JSON.stringify)
    alert('kfjasl') //TODO: Aquí poner que aparezca la transformación en json 
  }

  const handleAddProductToOrder = () => {
    const orderRowDTO: OrderRowDTO = {
      clientID: clientSelection, 
      productID: getProductId(selection), 
      quantity: sellQuantity
    }
    const rowProductDTO: RowProductDTO = {
      mortgagePrice: currentProduct?.mortgagePrice ?? 0, 
      name: currentProduct?.name ?? '', 
      price: currentProduct?.price ?? 0, 
      publicPrice: currentProduct?.publicPrice ?? 0
    }

    addRow(orderRowDTO, rowProductDTO)
    setSellQuantity(1)
    setSelection('')
  }

  const handleSearch = async () => {
    const id = getProductId(selection)
    const product = await getProductsById(id)
    if(!product)
      return alert('Producto no encontrado')
    alert('Producto cargado')
    const { privateSiteQuantity: privateSite, showSiteQuantity: publicSite } = product
    const total = privateSite + publicSite
    setMaxStock(total)
    setCurrentProduct(product)
    setSellQuantity(1)
  }

  const increment = () => {
    const newQuantity = sellQuantity + 1 
    if(newQuantity > maxStock)
      setSellQuantity(maxStock)
    else if(newQuantity < 0)
      setSellQuantity(0)
    else 
      setSellQuantity(newQuantity)
  }

  const decrement = () => {
    const newQuantity = sellQuantity - 1 
    if(newQuantity > maxStock)
      setSellQuantity(maxStock)
    else if (newQuantity < 0)
      setSellQuantity(0)
    else 
      setSellQuantity(newQuantity)
  }

  const autoCompleteProducts = {
    selection, 
    setSelection, 
    handleSearch
  }

  return (
    <>
      <ProductAutoCompleteRow {...autoCompleteProducts} />
      <AutoCompleteClientsRow selection={clientSelection} setSelection={setClientSelection} handleClean={clearClientSelection} />
      <Row className="ml-5">
        <Column className='is-4'>
          <Label>Cantidad</Label>
          <div className='is-flex is-justify-content-space-between'>
            <TextInput disabled type='number' name='quantity' value={sellQuantity} />
            <Button className='ml-5' buttonColor="success" onClick={handleAddProductToOrder}>Agregar a la venta</Button>
          </div>
        </Column>
      </Row>
      <Row className="ml-6">
        <Button className="column is-1 ml-5" style={{ paddingBottom: '2em' }} onClick={decrement} >➖</Button>
        <Button className="column is-1 ml-5" style={{ paddingBottom: '2em' }} onClick={increment}>➕</Button>
      </Row>
      <Row className='mt-6 ml-6'>
        <Button className='column is-1' style={{ paddingBottom: '2em'}} buttonColor='link' onClick={handleSaveTransaction}>Guardar</Button>
        <Button buttonColor='danger' className='column is-1 ml-5' style={{paddingBottom: '2em'}}>Cancelar</Button>
      </Row>
      <OrderTable products={displayOrderRows} />

    </>
  )
}