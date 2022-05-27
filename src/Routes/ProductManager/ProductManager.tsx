import { useState } from "react"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import { AutoCompleteProducts } from "../../Components/AutoCompleteProducts"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { Row } from "../../Components/Row"
import { TextAreaInput } from "../../Components/TextAreaInput"
import { TextInput } from "../../Components/TextInput"
import { useForm } from "../../Hooks/useForm"
import { getProductsById } from "../../Services/ProductsService"

const getProductId = (selection: string) => 
  selection.includes('-')
    ? selection.split('-')[1].trim()
    : selection

const handleProductSearchClosure = (selection:string, callbackWithProduct: (product: ProductDTO) => any) => {
  const handleSearch = async () => {
    const id = getProductId(selection)
    const product = await getProductsById(id)
    if(!product)
      return alert('Producto no encontrado')
    alert('Producto Encontrado')
    callbackWithProduct(product)
  }
  return handleSearch
}

export const ProductManager = () => {
  const [selection, setSelection] = useState('')
  const [form ] = useForm({

  })
  const handleSearch = handleProductSearchClosure(selection, product => {

  })


  return (
    <>
      <h1 className='title is-1 mt-5 ml-6 has-text-primary'>Mantenimiento Productos</h1>
      <hr />
      <Row className='ml-5 mt-5'>
        <Column className='is-3'>
          <Label>ID del Producto</Label>
          <div className='is-flex is-justify-content-space-between'>
            <AutoCompleteProducts value={selection} setValue={setSelection} />
            <Button className='ml-5'>Buscar</Button>
            <Button buttonColor='info' className='ml-5'>Limpiar</Button>
          </div>
        </Column>
        <Column className='is-4'>
          <Label>Nombre Producto</Label>
          <TextInput />
        </Column>
        <Column className='is-2'>
          <Label>Color Producto</Label>
          <TextInput />
        </Column>
        <Column className='is-2'>
          <Label>Tamaño Producto</Label>
          <TextInput />
        </Column>
      </Row>
      <Row className='ml-5'>
        <Column className='is-5' >
          <Label>Descripción del Product</Label>
          <TextAreaInput style={{height: '4em'}} />
        </Column>
        <Column className='is-3'>
          <Label>Tela</Label>
          <TextInput />
        </Column>
        <Column className='is-3'>
          <Label>Marca</Label>
          <TextInput />
        </Column>
      </Row>
      <Row className='mx-5'>
        <Column className='is-4 '>
          <Label>Precio Base</Label>
          <TextInput />
        </Column>
        <Column className='is-4'>
          <Label>Precio Público</Label>
          <TextInput></TextInput>
        </Column>
        <Column className='is-4'>
          <Label>Precio Hipoteca</Label>
          <TextInput></TextInput>
        </Column>
      </Row>
      <Row className='mx-5'>
        <Column className="is-4">
          <Label>Cantidad en almacén con la que inicia</Label>
            <TextInput />
        </Column>
        <Column className="is-4">
          <Label>Cantidad en almacén con la que inicia</Label>
          <TextInput />
        </Column>
        <Column className="is-4">
          <Label>Proveedor</Label>
          <TextInput />
        </Column>
      </Row>
      <Row className='mx-5'>
        <Column className='is-6'>
          <Label>
            { /* TODO: Arreglar el Handle del checkbox para que funcione correctamente */ }
            <input 
              className="checkbox has-text-primary"
              style={{ marginRight: '8px' }}
              type='checkbox' 
              name='lowStockAlert' 
              // checked={form.lowStockAlert ?? false}
              // onChange={handleChange} 
              />
            Alerta de Stock Baja
          </Label>
        </Column>
        <Column className='is-2 is-offset-3'>
          <Button style={{width: '20em', paddingBottom: '1.5em', paddingTop: '1.5em'}} buttonColor='success'>Guardar</Button>
        </Column>
      </Row>
    </>
  )
}