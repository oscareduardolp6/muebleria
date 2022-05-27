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
import { loadFileToServer } from "../../Services/FilesService"
import { getProductsById } from "../../Services/ProductsService"
import { productResult, saveTransaction, saveTransactionData } from "../../Services/TransactionsV2Service"
import { ChangeEvent } from "../../Types/TypesAliases"

const getProductId = (selection: string) => 
  selection.includes('-')
    ? selection.split('-')[1].trim()
    : selection

export const SalesManager = () => {
  const [selection, setSelection] = useState('')
  const [maxPrivateStock, setMaxPrivateStock] = useState(0)
  const [maxPublicStock, setMaxPublicStock] = useState(0)
  const [sellPrivateQuantity, setSellPrivateQuantity] = useState(1)
  const [sellPublicQuantity, setSellPublicQuantity] = useState(0)
  const [clientSelection, setClientSelection] = useState('')
  const {orderProducts, displayOrderRows, addRow} = useOrder()
  const [currentProduct, setCurrentProduct] = useState<ProductDTO>()
  const [selectedFile, setSelectedFile] = useState<any>(null)
  
  const clearClientSelection = () => setClientSelection('')

  const handleFile = ({target: {files}}:ChangeEvent) => {
    const data = files?.item(0)
    console.log('Archivos');
    console.log(files);
    setSelectedFile(data)
  }

  const handleSaveTransaction = async () => {
    console.log(orderProducts)
    const results = await Promise.allSettled(orderProducts.map(saveTransaction))
    await loadFileToServer(selectedFile)
    const promisesResults = results.map(result => result.status === 'fulfilled' ? result.value : result.reason) as saveTransactionData[]
    console.log('Promises Results');
    console.log(promisesResults);
    const transactionMessages = promisesResults.map(result => result.message)
    const productNeedStock = promisesResults.map(result => result.productInfo?.map(info => `${info.name} - ${info.id}` ))
    console.log('Products Need Stock');
    console.log(productNeedStock);
    alert(`Resultado Transacción(es) : ${transactionMessages.join()}`)
    alert(`Productos que necesitan Stock: ${productNeedStock.join()}`)
  }

  const handleAddProductToOrder = () => {
    const orderRowDTO: OrderRowDTO = {
      clientID: clientSelection, 
      productID: getProductId(selection), 
      privateSiteQuantity: sellPrivateQuantity, 
      publicSiteQuantity: sellPublicQuantity
    }
    const rowProductDTO: RowProductDTO = {
      mortgagePrice: currentProduct?.mortgagePrice ?? 0, 
      name: currentProduct?.name ?? '', 
      price: currentProduct?.price ?? 0, 
      publicPrice: currentProduct?.publicPrice ?? 0
    }

    addRow(orderRowDTO, rowProductDTO)
    setSellPrivateQuantity(1)
    setSelection('')
  }

  const handleSearch = async () => {
    const id = getProductId(selection)
    const product = await getProductsById(id)
    if(!product)
      return alert('Producto no encontrado')
    alert('Producto cargado')
    const { privateSiteQuantity: privateSite, showSiteQuantity: publicSite } = product
    setMaxPrivateStock(privateSite)
    setMaxPublicStock(publicSite)
    setCurrentProduct(product)
    setSellPrivateQuantity(1)
    setSellPublicQuantity(0)
  }

  const incrementPrivateStock = () => {
    const newQuantity = sellPrivateQuantity + 1 
    if(newQuantity > maxPrivateStock)
      setSellPrivateQuantity(maxPrivateStock)
    else if(newQuantity < 0)
      setSellPrivateQuantity(0)
    else 
      setSellPrivateQuantity(newQuantity)
  }

  const incrementPublicStock = () => {
    const newQuantity = sellPublicQuantity + 1 
    if(newQuantity > maxPublicStock)
      setSellPublicQuantity(maxPublicStock)
    else if(newQuantity < 0)
      setSellPublicQuantity(0)
    else 
      setSellPublicQuantity(newQuantity)
  }

  const decrementPrivateStock = () => {
    const newQuantity = sellPrivateQuantity - 1 
    if(newQuantity > maxPrivateStock)
      setSellPrivateQuantity(maxPrivateStock)
    else if (newQuantity < 0)
      setSellPrivateQuantity(0)
    else 
      setSellPrivateQuantity(newQuantity)
  }

  const decrementPublicStock = () => {
    const newQuantity = sellPublicQuantity - 1 
    if(newQuantity > maxPublicStock) 
      setSellPublicQuantity(maxPublicStock)
    else if (newQuantity < 0)
      setSellPublicQuantity(0)
    else 
      setSellPublicQuantity(newQuantity)
  }

  const autoCompleteProducts = {
    selection, 
    setSelection, 
    handleSearch
  }

  return (
    <>
      <h1 className='title is-1 mt-5 ml-6 has-text-primary'>Ventas</h1>
      <hr />
      <ProductAutoCompleteRow {...autoCompleteProducts} />
      <AutoCompleteClientsRow selection={clientSelection} setSelection={setClientSelection} handleClean={clearClientSelection} />
      <Row className="ml-5">
        <Column className='is-4'>
          <Label>Cantidad en almacén</Label>
          <div className='is-flex is-justify-content-space-between'>
            <TextInput disabled type='number' name='quantity' value={sellPrivateQuantity} />
          </div>
        </Column>
        <Column className='is-3 ml-6'>
          <Label>Cantidad en Exhibición</Label>
          <div className="is-flex is-justify-content-space-between">
            <TextInput type='number' disabled name='publicQuantity' value={sellPublicQuantity}/>
          </div>
        </Column>
        <Column className="is-2">
          <Button className='ml-5 mt-6' buttonColor="success" onClick={handleAddProductToOrder}>Agregar a la venta</Button>
        </Column>
        <Column className='ml-6 mt-6'>
          <div className="file is-info">
            <label className="file-label">
              <input className="file-input" type="file" name="resume" onChange={handleFile}/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Cargar Evidencia
                </span>
              </span>
            </label>
          </div>
        </Column>
      </Row>
      <Row className="ml-6">
        <Button className="column is-1 ml-5" style={{ paddingBottom: '2em' }} onClick={decrementPrivateStock} >➖</Button>
        <Button className="column is-1 ml-5" style={{ paddingBottom: '2em' }} onClick={incrementPrivateStock}>➕</Button>
        <Column className="is-2"></Column> {/*Solo para ajustar la posición de los botones */ }
        <Button className="column is-1 ml-5" style={{ paddingBottom: '2em' }} onClick={decrementPublicStock} >➖</Button>
        <Button className="column is-1 ml-5" style={{ paddingBottom: '2em' }} onClick={incrementPublicStock}>➕</Button>
      </Row>
      <Row className='mt-6 ml-6'>
        <Button className='column is-1' style={{ paddingBottom: '2em'}} buttonColor='link' onClick={handleSaveTransaction}>Guardar</Button>
        <Button buttonColor='danger' className='column is-1 ml-5' style={{paddingBottom: '2em'}}>Cancelar</Button>
      </Row>
      <OrderTable products={displayOrderRows} />

    </>
  )
}