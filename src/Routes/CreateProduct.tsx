import { Product } from "../../../../Share/Product"
import { Currency } from "../../../../Share/Currency"
import { Column } from "../Components/Column"
import { Label } from "../Components/Field/Label"
import { Row } from "../Components/Row"
import { TextInput } from "../Components/TextInput"
import { useForm } from "../Hooks/useForm"
import { getProductByProductID } from "../Services/Products/Domain/ProductService"
import { useBinaryState } from "../Hooks/useBinaryState"
import { TextAreaInput } from "../Components/TextAreaInput"

const nationalCurrency: Currency = {
  name: 'pesos', 
  shortName: 'MXN', 
  sufix: '$'
}

type ProductForm = Omit<Product, "recordID"> 

const initialState: ProductForm = {
  productID: '', 
  basePrice: {
    value: 0, 
    nationalCurrency
  }, 
  mortagePriceRelation: 1.25, 
  mortgagePrice: {
    value: 0, 
    nationalCurrency
  }, 
  name: '', 
  privateStockQuantity: {
    quantity: 0, 
    unit: 'unidades'
  }, 
  publicPrice: {
    value: 0, 
    nationalCurrency
  }, 
  publicPriceRelation: 1.5, 
  publicStockQuantity: 0, 
  totalStockQuantity: {
    quantity: 0, 
    unit: 'unidades'
  }, 
  brand: { name: '' }, 
  color: { name: '' }, 
  description: '', 
  fabric: { name: '' }, 
  lowStockAlert: true, 
  lowStockAlertQuantity: 0, 
  size: { name: '' }, 
  suppliers: [{ name: '' }]
}
export const CreateProduct = () => { 
  const [enabled, deny, allow, toggle] = useBinaryState()
  const [form, handleChange, resetForm, setForm] = useForm(initialState)
  const handleProductIDInputChange = (e: any) => {
    e.target.value ? allow() : deny()
    handleChange(e)
  }
  const handleClickSearchButton = async (e: any) => {
    e.preventDefault()
    const { productID: id } = form
    const productInfo = await getProductByProductID(id) as ProductForm
    if(!productInfo){
      alert(`No se encontró el información del producto: ${id}`)
      resetForm()
    }
    else 
      setForm(productInfo)
  }
  const handlePriceInput = (e: any) => {
    const { value } = e.target
    const isVoidString = value === ''
    
    if(!isVoidString && isNaN(value.replaceAll(',','')))
      return 
    //TODO: Agregar que se formateé como dinero o número 
    handleChange(e)
  }
  
  //TODO: Implementar mejor forma de hacer lo de proveedores
  const handleSupplierInput = (e: any) => {
    const { value } = e.target
    const oldSuppliers = form.suppliers ?? []
    const suppliers = [...oldSuppliers, { name: value }]
    setForm({
      ...form, 
      suppliers
    })
  }
  return (
    <form className='m-6'>
      <Row>
        <Column className="is-flex">
          <div>
            <Label>ID Producto</Label>
            <TextInput
              name='productID' 
              placeholder='A20' 
              required 
              style={{ maxWidth: '120%' }}
              onChange={handleProductIDInputChange}
              value={form.productID}
              />
          </div>
          <button 
            className="button is-primary ml-5"
            style={{ marginTop: '2.4em' }}
            type="button"
            disabled={!enabled}
            onClick={handleClickSearchButton}
            >
            Buscar
          </button>
        </Column>
        <Column>
          <Label>Nombre Producto</Label>
          <TextInput
            name='name'
            placeholder='A20'
            required
            onChange={handleChange}
            value={form.name}
            />
        </Column>
        <Column>
          <Label>Color</Label>
          <TextInput
            value={form.color.name}
            name='color.name'
            onChange={handleChange}
            placeholder='Rojo' />
        </Column>
        <Column>
          <Label>Marca</Label>
          <TextInput
            value={form.brand.name} 
            name='brand.name'
            onChange={handleChange}
            placeholder='Generica'/>
        </Column>
      </Row>
      <Row>
        <Column className="is-half">
          <Label>Descripción Producto</Label>
          <TextAreaInput
            value={form.description}
            name='description'
            onChange={handleChange}
            placeholder='Artículo de X dimensiones'/>
        </Column>
        <Column>
          <Label>Tela</Label>
          <TextInput 
            value={form.fabric.name}
            name='fabric.name'
            onChange={handleChange}
            placeholder='Algodón' />
        </Column>
        <Column>
          <Label>Tamaño</Label>
          <TextInput 
            value={form.size.name} 
            name='size.name'
            onChange={handleChange}
            placeholder='Mediana'/>
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>Precio Base</Label>
          <TextInput 
            value={form.basePrice.value || ''}
            name='basePrice.value'
            onChange={handlePriceInput}
            placeholder='$120 (pesos)' />
        </Column>
        <Column>
          <Label>Precio Hipoteca</Label>
          <TextInput
            value={form.mortgagePrice.value || ''} 
            name='mortgagePrice.value'
            onChange={handlePriceInput}
            placeholder='$150 (pesos)'/>
        </Column>
        <Column>
          <Label>Precio Público</Label>
          <TextInput
            value={form.publicPrice.value || ''}
            name='publicPrice.value'
            onChange={handlePriceInput}
            placeholder='$200 (pesos)' />
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>Cantidad en Almacén con la que inicia</Label>
          <TextInput
            value={form.privateStockQuantity.quantity || ''}
            name='privateStockQuantity.quantity'
            onChange={handlePriceInput}
            placeholder='0' />
        </Column>
        <Column>
          <Label>Cantidad al público con la que inicia</Label>
          <TextInput 
            value={form.publicStockQuantity.quantity || ''}
            name='publicStockQuantity.quantity' 
            onChange={handlePriceInput}
            placeholder='0'/>
        </Column>
        <Column>
          <Label>Proveedores</Label>
          <TextInput 
            value={''}
            name='suppliers'
            placeholder='Amazon'
            />
        </Column>
      </Row>
      <Row>
        <Column className="is-11">
          <Label>
            <input 
              className="checkbox has-text-primary"
              style={{ marginRight: '8px' }}
              type='checkbox' 
              name='lowStockAlert' 
              checked={form.lowStockAlert ?? false}
              onChange={handleChange} />
            Alerta de Stock Baja
          </Label>
        </Column>
        <Column>
          <button
            className="button is-primary"
            type='button'>
            Guardar
          </button>
        </Column>
      </Row>
    </form>
  )
}