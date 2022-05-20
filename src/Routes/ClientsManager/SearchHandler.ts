import { ClientDTO } from "../../../../../Share/ClientDTO";
import { getClientById } from "../../Services/ClientService";

export const getSearchHandler = ({ form, setForm, reset, toggleSearchButton, setIsUpdateToTrue }: getSearchHandlerParams) => {
  const handleSearch = async (e: any) => {
    toggleSearchButton && toggleSearchButton()
    e.preventDefault();
    const { clientId } = form 
    const client = await getClientById(clientId)
    toggleSearchButton && toggleSearchButton()
    if(!client) {
      alert(`No se encontró al cliente con el ID: ${clientId}`)
      reset()
      return 
    }
    setForm(client)
    setIsUpdateToTrue && setIsUpdateToTrue()
  }
  return handleSearch
}

type getSearchHandlerParams = {
  form: ClientDTO
  setForm: (state: ClientDTO) => void 
  reset: () => void
  toggleSearchButton?: () => void
  setIsUpdateToTrue?: () => void 
}