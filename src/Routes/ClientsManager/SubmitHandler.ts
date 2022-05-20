import { ClientDTO } from "../../../../../Share/ClientDTO";
import { saveClient, updateClient } from "../../Services/ClientService";

export const getSubmitHandler = ({ form , toggleSubmitButton, reset, isUpdate}: getSubmitHandlerParams) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toggleSubmitButton && toggleSubmitButton()
    let createdOrUpdated ; 
    if(isUpdate)
      createdOrUpdated = await updateClient(form)
    else 
      createdOrUpdated = await saveClient(form)

    const message = isUpdate && createdOrUpdated 
                      ? `El Cliente con el ID ${form.clientId} fue actualizado con éxito` 
                      : createdOrUpdated 
                      ? `El Cliente con el ID: ${form.clientId} fue creado con éxito` 
                      : `Hubo un problema al crear el cliente ${form.clientId}, por favor, vuelva a intentar`
    alert(message)
    toggleSubmitButton && toggleSubmitButton()
    createdOrUpdated && reset && reset()
  }
  return handleSubmit
}


type getSubmitHandlerParams = {
  form: ClientDTO
  toggleSubmitButton?: () => void 
  reset?: () => void
  isUpdate?: boolean //Variable que nos dice si estamos actualizando o creando un recurso 
}