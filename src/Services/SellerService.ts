import { SellerDTO } from '../../../../Share/SellerDTO'
import { saveGenerator, getAllGenerator } from './../../out/muebleria-win32-x64/resources/app/src/Services/GeneralService'
const route = '/sellers'

export const createSeller  = saveGenerator<SellerDTO>(route)
export const getAllSellers = getAllGenerator<SellerDTO>(route, 'sellers')