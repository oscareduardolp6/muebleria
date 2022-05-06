import { Column } from "../Components/Column";
import { Label } from "../Components/Label";
import { HandleSelectionFunction, ProductTable } from "../Components/ProductTable/ProductTable"
import { Row } from "../Components/Row";
import { TextInput } from "../Components/TextInput";
import { SaleDTO } from "../../../../Share/Sale"
import { SiteTypesEnum } from "../../../../Share/SiteTypes"
import { useForm } from "../Hooks/useForm";
import { saveSale } from "../Services/SalesService";

export const Sales = () => {

  const initialState: SaleDTO = {
    clientID: '', 
    fromSite: SiteTypesEnum.PrivateSite, 
    price: 0, 
    productID: '', 
    quantity: 1, 
    supplierID: '', 
    transactionID: 0
  }
  const sales: SaleDTO[] = []
  const [form, handleChange, _, setForm] = useForm(initialState)
  const handleSelection: HandleSelectionFunction = ({ selectedRows }) => {
    setForm({
      ...form, 
      price: selectedRows[0].basePrice, 
      productID: selectedRows[0].productID
    })
  }

  const handleSave = async (e: any) => {
    e.preventDefault()
    const result = await saveSale(form)
    const message = result ? 'Transacción completada' : 'Error en la transacción'
    alert(message)
  }

  const handleAddProduct = (e: any) => {
    e.preventDefault()
    sales.push(form)
    alert('Producto Agregado')
  }
  
  return (
    <>
      <div className='mx-5 my-5'>
        <Row>
          <Column className="is-3">
            <Label>Client ID</Label>
            <TextInput value={form.clientID} onChange={handleChange} name='clientID' />
          </Column>
          <Column>
            <button 
              className="button is-success" 
              onClick={handleSave}
              style={{ marginTop: '2.5em' }}>
                Registrar Venta
            </button>
          </Column>
        </Row>
        <Row>
          <Column className="is-3">
            <Label>Cantidad</Label>
            <input 
              type='number'
              value={form.quantity}
              onChange={handleChange}
              className="input has-text-centered"
              name='quantity'
              min='1' />
          </Column>
          <Column>
            <button
              className="button is-info"
              style={{ marginTop: '2.5em' }}
              onClick={handleAddProduct}>
                Agregar Producto
            </button>
          </Column>
        </Row>
      </div>
      <ProductTable selectable handleSelection={handleSelection}/>
    </>
  )
}