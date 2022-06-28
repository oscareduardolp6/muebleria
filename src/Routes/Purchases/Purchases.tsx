import { useState } from "react"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { ProductAutoCompleteRow } from "../../Components/ProductAutoCompleteRow"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { getProductsById } from "../../Services/ProductsService"
import { ChangeEvent } from "../../Types/TypesAliases"
import { PurchaseDTO } from "../../../../../Share/PurchaseDTO"
import { savePurchase } from "../../Services/PurchasesService"
import { RouteTitle } from "../../Components/RouteTitle"
import { alerter } from "../../Constants/Notifiers"

const getProductId = (selection: string) => 
  selection.includes('-')
    ? selection.split('-')[1].trim()
    : selection

const handleProductSearchClosure = (selection:string, callbackWithProduct: (product: ProductDTO) => any) => {
  const handleSearch = async () => {
    const id = getProductId(selection)
    const product = await getProductsById(id)
    if(!product)
      return alerter.alertError('Producto no encontrado')
    alerter.alert('Producto Encontrado')
    callbackWithProduct(product)
  }
  return handleSearch
}

const handleChangeClosure = (callback: (value: string) => any) => 
  ({target: {value}}: ChangeEvent) => callback(value)

/////////////////////////////////////////////////////////////////////////////////

export const Purchases = () => {
  const [selection, setSelection] = useState('')
  const [product, setProduct] = useState<ProductDTO>()
  const [publicStock, setPublicStock] = useState(0)
  const [privateStock, setPrivateStock] = useState(0)
  const [supplier, setSupplier] = useState('')

  const handleChangePrivateStock = handleChangeClosure(value => setPrivateStock(Number(value)))
  const handleChangePublicStock = handleChangeClosure(value => setPublicStock(Number(value)))
  const handleChangePrice = handleChangeClosure(value => {
    if(!product) return 
    setProduct({
      ...product, 
      price: Number(value)
    })
  })

  const handleSupplierChange = handleChangeClosure(setSupplier)

  const handleSearch = handleProductSearchClosure(selection, product => {
    setProduct(product)
    setPublicStock(0)
    setPrivateStock(0)
  })

  const handleSavePurchase = async () => {
    if(!product?.id) return alerter.alertError('No hay producto seleccionado'); 
    const purchase: PurchaseDTO = {
      privateStockAdded: privateStock, 
      productId: product.id , 
      publicStockAdded: publicStock, 
      price: product.price, 
      supplierId: supplier
    }
    const result = await savePurchase(purchase)
    result ? alerter.alert('Stock agregado con éxito') : alerter.alertError('Problema al modificar el stock')
    handleSearch()
  }
  const autoCompleteProducts = {
    selection,
    setSelection, 
    handleSearch, 
    clearSelection: () => setSelection('')
  }
  return (
    <>
      <RouteTitle>Compras</RouteTitle>
      <ProductAutoCompleteRow {...autoCompleteProducts} />
      <hr className='mx-6' />
      <Label className='ml-6'>ID Producto: <span className='has-text-weight-light ml-3'>{product?.id ?? ''}</span></Label>
      <Label className='ml-6'>Nombre del Producto: <span className='has-text-weight-light ml-3'>{product?.name ?? '' }</span></Label>
      <Label className='ml-6'>Cantidad actual en almacén: <span className='has-text-weight-light ml-3'>{product?.privateSiteQuantity}</span></Label>
      <Label className='ml-6'>Cantidad actual en exhibición: <span className='has-text-weight-light ml-3'>{product?.showSiteQuantity}</span></Label>
      <hr className='mx-6' />
      <Row className='ml-5'>
        <Column className='is-2'>
        <Label>Precio de Compra</Label>
        <TextInput type='number' name='price' value={product?.price ?? 0} onChange={handleChangePrice} min='1'  /> 
        </Column>
        <Column className='is-3'>
          <Label>Proveedor</Label>
          <TextInput type='text' name='supplier' value={supplier} onChange={handleSupplierChange}  />
        </Column>
      </Row>
      <Row className="ml-5 mt-5">
        <Column className="is-3">
          <Label>Cantidad ingresada a almacén</Label>
          <div className="is-flex is-justify-content-space-between">
            <TextInput type="number" name="quantity" value={privateStock} onChange={handleChangePrivateStock} min='0'/>
          </div>
        </Column>
        <Column className="is-3 ml-6">
          <Label>Cantidad ingresada a exhibición</Label>
          <div className="is-flex is-justify-content-space-between">
            <TextInput type='number' name='publicQuantity' onChange={handleChangePublicStock} min='0' value={publicStock} />
          </div>
        </Column>
        <Button className="column is-2 ml-6" style={{ marginTop: '3em', paddingBottom: '2em'}} onClick={handleSavePurchase}>Guardar</Button>
      </Row>
    </>
  )
}