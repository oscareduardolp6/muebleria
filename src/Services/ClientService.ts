import { ClientDTO } from "../../../../Share/ClientDTO";
import { getAllGenerator, getByIdGenerator, saveGenerator, updateGenerator } from "./GeneralService";

const route = '/clients'

export const getClientById = getByIdGenerator<ClientDTO>(route, 'client')
export const saveClient = saveGenerator<ClientDTO>(route)
export const updateClient = updateGenerator<ClientDTO>(route)
export const getAllClients = getAllGenerator<ClientDTO>(route, 'clients')