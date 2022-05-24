import { Button } from "../../Components/Button"
import { ColumnSize3 as Column } from "../../Components/ColumnSize3"
import { Label } from "../../Components/Label"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { useForm } from "../../Hooks/useForm"
import { ClientDTO } from "../../../../../Share/ClientDTO"
import { getSubmitHandler } from "./SubmitHandler"
import { getSearchHandler } from "./SearchHandler"
import { useBinaryState } from "../../Hooks/useBinaryState"

export const ClientsManager = () => {
  const initialForm: ClientDTO = {
    clientId: '', 
    dadLastName: '', 
    momLastName: '', 
    name: '', 
    rfc: ''
  }
  const [form, handleChange, reset, setForm] = useForm(initialForm)
  const [isNewClient, deny, allow] = useBinaryState(true)
  const handleSearch = getSearchHandler({ form, reset, setForm, setIsUpdateToTrue: deny })
  const handleSubmit = getSubmitHandler({ form, reset, isUpdate: !isNewClient })
  
  return (
    <>
      <h1 className='title is-1 mt-5 ml-6 has-text-primary'>Mantenimiento Clientes</h1>
      <hr />
      <form className='ml-5' onSubmit={handleSubmit}>
        <Row className='mt-5'>
          <Column className="is-4">
              <Label>ID Cliente</Label>
              <div className="is-flex is-justify-content-space-between">
                <TextInput 
                  name='clientId' 
                  value={form.clientId} 
                  onChange={handleChange} 
                  required/>
                <Button className='ml-3' type="button" onClick={handleSearch}>Buscar</Button>
                <Button buttonColor="danger" className="ml-3" onClick={() =>{ reset(); allow()}}>Limpiar</Button>
              </div>
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>Nombre(s)</Label>
            <TextInput name='name' value={form.name} onChange={handleChange} required/>
          </Column>
          <Column>
            <Label>Apellido Paterno</Label>
            <TextInput value={form.dadLastName} name='dadLastName' onChange={handleChange} />
          </Column>
          <Column>
            <Label>Apellido Materno</Label>
            <TextInput value={form.momLastName} name='momLastName' onChange={handleChange}/>
          </Column>
        </Row>
        <Row>
          <Column className="is-6">
            <Label>RFC</Label>
            <TextInput value={form.rfc} name='rfc' onChange={handleChange} maxLength={13} />
          </Column>
        </Row>
        <Row>
          <Column>
            <Button className="ml-3 mt-5 " type="submit">Guadar</Button> 
          </Column>
        </Row>
      </form>
    </>
  )
}