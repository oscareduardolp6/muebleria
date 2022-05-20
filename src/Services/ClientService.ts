import { ClientDTO } from "../../../../Share/ClientDTO";
import { getByIdGenerator, saveGenerator, updateGenerator } from "./GeneralService";
const route = '/clients'
export const getClientById = getByIdGenerator<ClientDTO>(route, 'client')
export const saveClient = saveGenerator<ClientDTO>(route)
export const updateClient = updateGenerator<ClientDTO>(route)