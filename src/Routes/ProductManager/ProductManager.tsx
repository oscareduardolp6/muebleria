import { useState } from 'react'
import {
  initializedProductDTO,
  ProductDTO,
} from '../../../../../Share/ProductDTO'
import { AutoCompleteCategories } from '../../Components/AutoCompleteCategories'
import { AutoCompleteProducts } from '../../Components/AutoCompleteProducts'
import { Button } from '../../Components/Button'
import { Column } from '../../Components/Column'
import { Label } from '../../Components/Label'
import Modal from '../../Components/Modal'
import { RouteTitle } from '../../Components/RouteTitle'
import { Row } from '../../Components/Row'
import { TextAreaInput } from '../../Components/TextAreaInput'
import { TextInput } from '../../Components/TextInput'
import { alerter } from '../../Constants/Notifiers'
import { useBinaryState } from '../../Hooks/useBinaryState'
import { useForm } from '../../Hooks/useForm'
import { createProduct } from '../../Services/ProductsService'
import { ChangeEvent, SubmitHandler } from '../../Types/TypesAliases'
import { handleProductSearchClosure } from './Closures'
import { SelectStockQuantity } from './SelectStockQuantity'

export const ProductManager = () => {
  const [selectedProduct, setSelectedProduct] = useState('')
  const [category, setCategory] = useState('')
  const [isVisible, hide, show] = useBinaryState(false)
  const [form, handleChange, reset, setForm] = useForm(initializedProductDTO)

  const searchProduct = handleProductSearchClosure(selectedProduct, setForm)

  const cleanSelection = () => {
    setSelectedProduct('')
    reset()
  }
  const toggleAlert = ({ target: { checked } }: ChangeEvent) => {
    setForm({
      ...form,
      shouldAlertLowStock: checked,
    })
    checked && show()
  }

  const validateForm = () => {
    const isIdEmpty = selectedProduct === ''
    const isNameEmtpy = form.name === ''
    if(isIdEmpty) {
      alerter.alertError('Id se encuentra vacío')
      return 'Id'
    }
    if(isNameEmtpy){
      alerter.alertError('El nombre se encuentra vacío')
      return 'Nombre'
    }
    return ''
  }

  const saveProduct: SubmitHandler = async (e) => {
    e.preventDefault()
    const invalidField = validateForm()
    if(invalidField) return 
    const {
      price,
      publicPrice,
      mortgagePrice,
      showSiteQuantity,
      privateSiteQuantity,
      alertLowStockQuantity,
    } = form
    const newProduct: ProductDTO = {
      ...form,
      color: category,
      id: selectedProduct,
      price: Number(price),
      publicPrice: Number(publicPrice),
      mortgagePrice: Number(mortgagePrice),
      showSiteQuantity: Number(showSiteQuantity),
      privateSiteQuantity: Number(privateSiteQuantity),
      alertLowStockQuantity: Number(alertLowStockQuantity),
    }
    const created = await createProduct(newProduct)
    const { id } = newProduct
    created
      ? alerter.alert(`Se creó el producto con el ID: ${id}`)
      : alerter.alertError(`Ocurrió un error al crear el producto: ${id}`)
    reset()
  }

  return (
    <>
      <RouteTitle>Mantenimiento Productos</RouteTitle>
      <form onSubmit={saveProduct}>
        <Row className='ml-5 mt-5'>
          <Column className='is-3'>
            <Label>ID del Producto</Label>
            <div className='is-flex is-justify-content-space-between'>
              <AutoCompleteProducts
                value={selectedProduct}
                setValue={setSelectedProduct}
              />
              <Button className='ml-5' onClick={searchProduct} type='button'>
                Buscar
              </Button>
              <Button
                buttonColor='info'
                className='ml-5'
                onClick={cleanSelection}
                type='button'>
                Limpiar
              </Button>
            </div>
          </Column>
          <Column className='is-4'>
            <Label>Nombre Producto</Label>
            <TextInput value={form.name} onChange={handleChange} name='name' />
          </Column>
          <Column className='is-2'>
            <Label>Categoría Producto</Label>
            <AutoCompleteCategories setValue={setCategory} value={category} />
          </Column>
          <Column className='is-2'>
            <Label>Tamaño Producto</Label>
            <TextInput value={form.size} onChange={handleChange} name='size' />
          </Column>
        </Row>
        <Row className='ml-5'>
          <Column className='is-5'>
            <Label>Descripción del Product</Label>
            <TextAreaInput
              style={{ height: '4em' }}
              value={form.description}
              onChange={handleChange}
              name='description'
            />
          </Column>
          <Column className='is-3'>
            <Label>Tela</Label>
            <TextInput
              value={form.fabric}
              onChange={handleChange}
              name='fabric'
            />
          </Column>
          <Column className='is-3'>
            <Label>Marca</Label>
            <TextInput
              value={form.brand}
              onChange={handleChange}
              name='brand'
            />
          </Column>
        </Row>
        <Row className='mx-5'>
          <Column className='is-4 '>
            <Label>Precio Base</Label>
            <TextInput
              value={form.price}
              onChange={handleChange}
              name='price'
              type='number'
              min='0'
              step='0.5'
            />
          </Column>
          <Column className='is-4'>
            <Label>Precio Público</Label>
            <TextInput
              value={form.publicPrice}
              onChange={handleChange}
              name='publicPrice'
              type='number'
              min='0'
              step='0.5'
            />
          </Column>
          <Column className='is-4'>
            <Label>Precio Hipoteca</Label>
            <TextInput
              value={form.mortgagePrice}
              onChange={handleChange}
              name='mortgagePrice'
              type='number'
              min='0'
              step='0.5'
            />
          </Column>
        </Row>
        <Row className='mx-5'>
          <Column className='is-4'>
            <Label>Cantidad en almacén con la que inicia</Label>
            <TextInput
              value={form.privateSiteQuantity}
              onChange={handleChange}
              name='privateSiteQuantity'
              type='number'
              min='0'
            />
          </Column>
          <Column className='is-4'>
            <Label>Cantidad en exhibición con la que inicia</Label>
            <TextInput
              value={form.showSiteQuantity}
              onChange={handleChange}
              name='showSiteQuantity'
              type='number'
              min='0'
            />
          </Column>
          <Column className='is-4'>
            <Label>Proveedor</Label>
            <TextInput
              value={form.suppliers}
              onChange={handleChange}
              name='suppliers'
            />
          </Column>
        </Row>
        <Row className='mx-5'>
          <Column className='is-6'>
            <Label>
              <input
                className='checkbox has-text-primary'
                style={{ marginRight: '8px' }}
                type='checkbox'
                name='shouldAlertLowStock'
                checked={form.shouldAlertLowStock}
                onChange={toggleAlert}
              />
              Alerta de Stock Baja
            </Label>
          </Column>
          <Column className='is-2 is-offset-3'>
            <Button
              style={{
                width: '20em',
                paddingBottom: '1.5em',
                paddingTop: '1.5em',
              }}
              buttonColor='success'
              type='submit'>
              Guardar
            </Button>
          </Column>
        </Row>
        <Modal
          isVisible={isVisible}
          onClose={hide}
          portalId='alert-quantity-modal'>
          <SelectStockQuantity
            quantity={form.alertLowStockQuantity}
            handleChangeQuantity={handleChange}
            name='alertLowStockQuantity'
          />
        </Modal>
      </form>
    </>
  )
}
