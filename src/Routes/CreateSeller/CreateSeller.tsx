import { initializedSeller } from "../../../../../Share/SellerDTO"
import { Button } from "../../Components/Button"
import { ColumnSize6 as Column6 } from "../../Components/ColumnSize6"
import { Label } from "../../Components/Label"
import { RouteTitle } from "../../Components/RouteTitle"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { alerter } from "../../Constants/Notifiers"
import { useForm } from "../../Hooks/useForm"
import { createSeller } from "../../Services/SellerService"
import { SubmitHandler } from "../../Types/TypesAliases"

export const CreateSeller = () => {
  const [form, handleChange, reset, setForm] = useForm(initializedSeller)
  const saveSeller: SubmitHandler = async e => {
    e.preventDefault()
    if(!form.names || !form.firstLastName) 
      return alerter.alertError('El nombre o el apellido paterno no es válido')
    const created = await createSeller(form)
    created 
      ? alerter.alert('Vendedor agregado correctamente')
      : alerter.alertError('Hubo un error al crear el vendedor')
    created && reset()
  }
  
  return(
    <>
      <RouteTitle>Creación de Vendedores</RouteTitle>
      <form className='mt-6' style={{ marginLeft: '30%'}} onSubmit={saveSeller}>
        <Row>
          <Column6>
            <Label>Nombre</Label>
            <TextInput required value={form.names} onChange={handleChange} name='names' />
          </Column6>
        </Row>
        <Row>
          <Column6>
            <Label>Apellido Paterno</Label>
            <TextInput required value={form.firstLastName} onChange={handleChange} name='firstLastName' />
          </Column6>
        </Row>
        <Row>
          <Column6>
            <Label>Apellido Materno</Label>
            <TextInput value={form.secondLastName} onChange={handleChange} name='secondLastName' />
          </Column6>
        </Row>
        <Row>
          <Column6 className='is-offset-4'>
            <Button>Guardar Vendedor</Button>
          </Column6>
        </Row>
      </form>
    </>
  )

}