import { PurchaseDTO } from "../../../../Share/PurchaseDTO";
import { saveGenerator } from "./GeneralService";

const ROUTE = '/purchases'

export const savePurchase = saveGenerator<PurchaseDTO>(ROUTE)