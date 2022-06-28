import { useContext, useState } from 'react'
import { OrderRowDTO } from '../../../../../Share/OrderRowDTO'
import { ProductDTO } from '../../../../../Share/ProductDTO'
import { AutoCompleteClientsRow } from '../../Components/AutoCompleteClientsRow'
import { Button } from '../../Components/Button'
import { Column } from '../../Components/Column'
import { ImageInput } from '../../Components/ImageInput'
import { Label } from '../../Components/Label'
import OrderTable from '../../Components/OrderTable'
import { ProductAutoCompleteRow } from '../../Components/ProductAutoCompleteRow'
import { RouteTitle } from '../../Components/RouteTitle'
import { Row } from '../../Components/Row'
import { TextInput } from '../../Components/TextInput'
import { alerter } from '../../Constants/Notifiers'
import { RowProductDTO, useOrder } from '../../Hooks/useOrder'
import useStockQuantities from '../../Hooks/useStockQuantitie'
import { loadFileToServer } from '../../Services/FilesService'
import { getProductsById } from '../../Services/ProductsService'
import {
  saveTransaction,
  saveTransactionData,
} from '../../Services/TransactionsV2Service'
import { ChangeEvent } from '../../Types/TypesAliases'

const getProductId = (selection: string) =>
  selection.includes('-') ? selection.split('-')[1].trim() : selection

export const SalesManager = () => {
  const [selection, setSelection] = useState('')
  const [clientSelection, setClientSelection] = useState('')
  const { orderProducts, displayOrderRows, addRow } = useOrder()
  const [currentProduct, setCurrentProduct] = useState<ProductDTO>()
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const {
    decrementPrivateStock,
    decrementPublicStock,
    incrementPrivateStock,
    incrementPublicStock,
    resetSellQuantities,
    setMaxStock,
    quantities: {
      sellPrivateStockQuantity,
      sellPublicStockQuantity,
    },
  } = useStockQuantities()

  const clearClientSelection = () => setClientSelection('')

  const handleFile = ({ target: { files } }: ChangeEvent) => {
    const data = files?.item(0)
    setSelectedFile(data)
  }

  const handleSaveTransaction = async () => {
    const results = await Promise.allSettled(orderProducts.map(saveTransaction))
    await loadFileToServer(selectedFile)
    const promisesResults = results.map((result) =>
      result.status === 'fulfilled' ? result.value : result.reason
    ) as saveTransactionData[]
    const transactionMessages = promisesResults.map((result) => result.message)
    const productNeedStock = promisesResults.map((result) =>
      result.productInfo?.map((info) => `${info.name} - ${info.id}`)
    )

    // alert(`Resultado Transacción(es) : ${transactionMessages.join()}`)
    // alert(`Productos que necesitan Stock: ${productNeedStock.join()}`)
  }

  const handleAddProductToOrder = () => {
    const orderRowDTO: OrderRowDTO = {
      clientID: clientSelection,
      productID: getProductId(selection),
      privateSiteQuantity: sellPrivateStockQuantity,
      publicSiteQuantity: sellPublicStockQuantity,
    }
    const rowProductDTO: RowProductDTO = {
      mortgagePrice: currentProduct?.mortgagePrice ?? 0,
      name: currentProduct?.name ?? '',
      price: currentProduct?.price ?? 0,
      publicPrice: currentProduct?.publicPrice ?? 0,
    }

    addRow(orderRowDTO, rowProductDTO)
    resetSellQuantities()
    setSelection('')
  }

  const clearProductSearch = () => setSelection('')

  const handleSearch = async () => {
    const id = getProductId(selection)
    const product = await getProductsById(id)
    if (!product) return alerter.alertError('Producto no encontrado')
    alerter.alert('Producto cargado con éxito')
    const { privateSiteQuantity: privateSite, showSiteQuantity: publicSite } =
      product
    
    setMaxStock({
      privateStock: privateSite, 
      publicStock: publicSite
    })
    
    setCurrentProduct(product)
    resetSellQuantities()
  }

  const autoCompleteProducts = {
    selection,
    setSelection,
    handleSearch,
    clearSelection: clearProductSearch,
  }

  return (
    <>
      <RouteTitle>Ventas</RouteTitle>
      <ProductAutoCompleteRow {...autoCompleteProducts} />
      <AutoCompleteClientsRow
        selection={clientSelection}
        setSelection={setClientSelection}
        handleClean={clearClientSelection}
      />
      <Row className='ml-5'>
        <Column className='is-4'>
          <Label>Cantidad en almacén</Label>
          <div className='is-flex is-justify-content-space-between'>
            <TextInput
              disabled
              type='number'
              name='quantity'
              value={sellPrivateStockQuantity}
            />
          </div>
        </Column>
        <Column className='is-3 ml-6'>
          <Label>Cantidad en Exhibición</Label>
          <div className='is-flex is-justify-content-space-between'>
            <TextInput
              type='number'
              disabled
              name='publicQuantity'
              value={sellPublicStockQuantity}
            />
          </div>
        </Column>
        <Column className='is-2'>
          <Button
            className='ml-5 mt-6'
            buttonColor='success'
            onClick={handleAddProductToOrder}>
            Agregar a la venta
          </Button>
        </Column>
        <Column className='ml-6 mt-6'>
          <ImageInput handleFile={handleFile} />
        </Column>
      </Row>
      <Row className='ml-6'>
        <Button
          className='column is-1 ml-5'
          style={{ paddingBottom: '2em' }}
          onClick={decrementPrivateStock}>
          ➖
        </Button>
        <Button
          className='column is-1 ml-5'
          style={{ paddingBottom: '2em' }}
          onClick={incrementPrivateStock}>
          ➕
        </Button>
        <Column className='is-2'></Column>{' '}
        {/*Solo para ajustar la posición de los botones */}
        <Button
          className='column is-1 ml-5'
          style={{ paddingBottom: '2em' }}
          onClick={decrementPublicStock}>
          ➖
        </Button>
        <Button
          className='column is-1 ml-5'
          style={{ paddingBottom: '2em' }}
          onClick={incrementPublicStock}>
          ➕
        </Button>
      </Row>
      <Row className='mt-6 ml-6'>
        <Button
          className='column is-1'
          style={{ paddingBottom: '2em' }}
          buttonColor='link'
          onClick={handleSaveTransaction}>
          Guardar
        </Button>
        <Button
          buttonColor='danger'
          className='column is-1 ml-5'
          style={{ paddingBottom: '2em' }}>
          Cancelar
        </Button>
      </Row>
      <OrderTable products={displayOrderRows} />
    </>
  )
}
