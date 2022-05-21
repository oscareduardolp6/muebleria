import { ProductDTO } from "../../../../Share/ProductDTO"

type myStateType = Partial<ProductDTO> | null | undefined

type ActionType = 
    'incrementPublicSiteQuantity' 
  | 'decrementPublicSiteQuantity'
  | 'incrementPrivateSiteQuantity'
  | 'decrementPriveteSiteQuantity'
  | 'setProduct'

export type ActionPayload = {
  action: ActionType, 
  state?: myStateType
}

export const siteMovementsReducer = (product: myStateType, payload: ActionPayload): typeof product => {
  if(!product) return 
  
  const { showSiteQuantity = 0, privateSiteQuantity = 0 } = product
  let newPublicSiteQuantity, newPrivateSiteQuantity : number

  switch(payload.action){
    case 'incrementPublicSiteQuantity' : {
      const newQuantity = showSiteQuantity + 1 
      const total = showSiteQuantity  + privateSiteQuantity 
      newPublicSiteQuantity = newQuantity > total 
                                ? total 
                                : newQuantity < 0 
                                ? 0 
                                : newQuantity
      const diff = total - newPublicSiteQuantity
      newPrivateSiteQuantity = diff < 0 ? 0 : diff
    }
    break 
    case 'decrementPublicSiteQuantity': {
      const newQuantity = showSiteQuantity - 1 
      const total = showSiteQuantity + privateSiteQuantity
      newPublicSiteQuantity = newQuantity > total 
                                ? total 
                                : newQuantity < 0 
                                ? 0 
                                : newQuantity
      const diff = total - newPublicSiteQuantity 
      newPrivateSiteQuantity = diff < 0 ? 0 : diff 
    }
    break
    case 'incrementPrivateSiteQuantity': {
      const newQuantity = privateSiteQuantity + 1 
      const total = showSiteQuantity + privateSiteQuantity
      newPrivateSiteQuantity = newQuantity > total 
                                  ? total 
                                  : newQuantity < 0 
                                  ? 0 
                                  : newQuantity
      const diff = total - newPrivateSiteQuantity
      newPublicSiteQuantity = diff < 0 ? 0 : diff
    }
    break
    case 'decrementPriveteSiteQuantity': {
      const newQuantity = privateSiteQuantity - 1 
      const total = showSiteQuantity + privateSiteQuantity 
      newPrivateSiteQuantity = newQuantity > total
                                  ? total
                                  : newQuantity < 0 
                                  ? 0 
                                  : newQuantity 
      const diff = total - newPrivateSiteQuantity
      newPublicSiteQuantity = diff < 0 ? 0 : diff
    }
    break
    case 'setProduct': {
      return { ...payload.state }
    }
  }
  return {
    ...product, 
    privateSiteQuantity: newPrivateSiteQuantity, 
    showSiteQuantity: newPublicSiteQuantity
  }

}