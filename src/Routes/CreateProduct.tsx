import { Product } from "../../../../Share/Product"
import { Currency } from "../../../../Share/Currency"
import { Column } from "../Components/Column"
import { Label } from "../Components/Field/Label"
import { Row } from "../Components/Row"
import { TextInput } from "../Components/TextInput"
import { useForm } from "../Hooks/useForm"
import { getProductByProductID } from "../Services/Products/Domain/ProductService"
import { useBinaryState } from "../Hooks/useBinaryState"

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
      </Row>
    </form>
  )
}