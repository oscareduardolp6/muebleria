import { Column } from "../Components/Column"
import { Label } from "../Components/Label"
import { Row } from "../Components/Row"
import { TextInput } from "../Components/TextInput"
import { useForm } from "../Hooks/useForm"
import { getProductByProductID, saveProduct } from "../Services/ProductService"
import { useBinaryState } from "../Hooks/useBinaryState"
import { TextAreaInput } from "../Components/TextAreaInput"
import { initialState, ProductForm } from "../Config/ProductForm"
import { SearchField } from "../Components/SearchField"
import { ProductFormField } from "../Components/ProductFormField"


export const CreateProduct = () => { 
  const [enabled, deny, allow] = useBinaryState()
  const [loadingSearchButton,,, toggleButtonLoading] = useBinaryState()
  const [loadingSaveButton,,, toggleSaveButton] = useBinaryState()
  //TODO: Mover esto a un Contexto
  const [form, handleChange, resetForm, setForm] = useForm(initialState)

  const handleProductIDInputChange = (e: any) => {
    e.target.value ? allow() : deny()
    handleChange(e)
  }

  const handleClickSearchButton = async (e: any) => {
    toggleButtonLoading()
    e.preventDefault()
    const { productID: id } = form
    const productInfo = await getProductByProductID(id) as ProductForm
    toggleButtonLoading()
    if(!productInfo){
      alert(`No se encontró el información del producto: ${id}`)
      resetForm()
    }
    else 
      setForm(productInfo)
  }

  const handleNumberInput = (e: any) => {
    const { value } = e.target
    const isVoidString = value === ''
    
    if(!isVoidString && isNaN(value.replaceAll(',',''))) return 
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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    toggleSaveButton()
    const created = await saveProduct(form)
    const { productID: id } = form
    const message = 
      created 
      ? `El Producto con ID: ${id} fue creado` 
      : `Hubo un problema al crear el artículo ${id}`
    alert(message)
    toggleSaveButton()
    created && resetForm()
  }
  return (
    <form className='m-6' onSubmit={handleSubmit}>
      <Row>
        <Column className="is-flex">
          <SearchField
            inputName='productID'
            label="ID Producto"
            placeholder="A20"
            required
            disabled={!enabled}
            handleChange={handleProductIDInputChange}
            handleClickSearchButton={handleClickSearchButton}
            loadingSearchButton={loadingSearchButton}
            value={form.productID} />
        </Column>
        <Column>
          <ProductFormField
            name='name'
            placeholder='A20'
            required
            onChange={handleChange}
            value={form.name}>
              Nombre Producto
          </ProductFormField>
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
            onChange={handleNumberInput}
            placeholder='$120 (pesos)' />
        </Column>
        <Column>
          <Label>Precio Hipoteca</Label>
          <TextInput
            value={form.mortgagePrice.value || ''} 
            name='mortgagePrice.value'
            onChange={handleNumberInput}
            placeholder='$150 (pesos)'/>
        </Column>
        <Column>
          <Label>Precio Público</Label>
          <TextInput
            value={form.publicPrice.value || ''}
            name='publicPrice.value'
            onChange={handleNumberInput}
            placeholder='$200 (pesos)' />
        </Column>
      </Row>
      <Row>
        <Column>
          <Label>Cantidad en Almacén con la que inicia</Label>
          <TextInput
            value={form.privateStockQuantity.quantity || ''}
            name='privateStockQuantity.quantity'
            onChange={handleNumberInput}
            placeholder='0' />
        </Column>
        <Column>
          <Label>Cantidad al público con la que inicia</Label>
          <TextInput 
            value={form.publicStockQuantity.quantity || ''}
            name='publicStockQuantity.quantity' 
            onChange={handleNumberInput}
            placeholder='0'/>
        </Column>
        <Column>
          <Label>Proveedores</Label>
          <TextInput 
            name='suppliers'
            placeholder='Amazon'
            />
        </Column>
      </Row>
      <Row>
        <Column className="is-11">
          <Label>
            { /* TODO: Arreglar el Handle del checkbox para que funcione correctamente */ }
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
            className={`button is-primary ${loadingSaveButton ? 'is-loading' : ''}`}
            type='submit'>
            Guardar { /*TODO: Agregar que cuando se guarde el producto, te regrese a la pantalla principal */ }
          </button>
        </Column>
      </Row>
    </form>
  )
}