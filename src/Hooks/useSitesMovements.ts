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

  switch(payload.action){
    case 'incrementPublicSiteQuantity' : {
      const newPublicSiteQuantity = showSiteQuantity + 1
      const total = showSiteQuantity  + privateSiteQuantity 
      const diff = total - newPublicSiteQuantity
      const newPrivateSiteQuantity = diff < 0 ? 0 : diff

      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'decrementPublicSiteQuantity': {
      const newPublicSiteQuantity = (showSiteQuantity ?? 0) - 1
      const total = showSiteQuantity  + privateSiteQuantity
      const newPrivateSiteQuantity = total - newPublicSiteQuantity
      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'incrementPrivateSiteQuantity': {
      const newPrivateSiteQuantity = (privateSiteQuantity ?? 0) + 1
      const total = showSiteQuantity  + privateSiteQuantity
      const newPublicSiteQuantity = total - newPrivateSiteQuantity
      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'decrementPriveteSiteQuantity': {
      const newPrivateSiteQuantity = (privateSiteQuantity ?? 0)  - 1
      const total = showSiteQuantity  + privateSiteQuantity
      const newPublicSiteQuantity = total - newPrivateSiteQuantity
      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'setProduct': {
      return {
        ...payload.state 
      }
    }
  }

}