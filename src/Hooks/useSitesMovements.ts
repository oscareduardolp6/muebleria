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

const validateQuantitys = (showQuantity: number, privateQuantity: number) => {


}

export const siteMovementsReducer = (product: myStateType, payload: ActionPayload): typeof product => {
  if(!product) return 
  
  const { showSiteQuantity = 0, privateSiteQuantity = 0 } = product
  let newPublicSiteQuantity, newPrivateSiteQuantity : number

  switch(payload.action){
    case 'incrementPublicSiteQuantity' : {
      newPublicSiteQuantity = showSiteQuantity + 1
      const total = showSiteQuantity  + privateSiteQuantity 
      newPublicSiteQuantity = newPublicSiteQuantity > total ? total : newPublicSiteQuantity
      newPublicSiteQuantity = newPublicSiteQuantity < 0 ? 0 : newPublicSiteQuantity
      const diff = total - newPublicSiteQuantity
      newPrivateSiteQuantity = diff < 0 ? 0 : diff
    }
    break 
    case 'decrementPublicSiteQuantity': {
      newPublicSiteQuantity = showSiteQuantity - 1
      const total = showSiteQuantity  + privateSiteQuantity
      newPublicSiteQuantity = newPublicSiteQuantity > total ? total : newPublicSiteQuantity
      newPublicSiteQuantity = newPublicSiteQuantity < 0 ? 0 : newPublicSiteQuantity
      const diff = total - newPublicSiteQuantity
      newPrivateSiteQuantity = diff < 0 ? 0 : diff
    }
    break
    case 'incrementPrivateSiteQuantity': {
      newPrivateSiteQuantity = privateSiteQuantity + 1
      const total = showSiteQuantity  + privateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity > total ? total : newPrivateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity < 0 ? 0 : newPrivateSiteQuantity
      const diff = total - newPrivateSiteQuantity
      newPublicSiteQuantity = diff < 0 ? 0 : diff
    }
    break
    case 'decrementPriveteSiteQuantity': {
      newPrivateSiteQuantity = privateSiteQuantity  - 1
      const total = showSiteQuantity  + privateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity > total ? total : newPrivateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity < 0 ? 0 : newPrivateSiteQuantity
      const diff = total - newPrivateSiteQuantity
      newPublicSiteQuantity = diff < 0 ? 0 : diff 
    }
    break
    case 'setProduct': {
      return {
        ...payload.state 
      }
    }
  }
  return {
    ...product, 
    privateSiteQuantity: newPrivateSiteQuantity, 
    showSiteQuantity: newPublicSiteQuantity
  }

}