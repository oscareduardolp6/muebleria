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
      let newPublicSiteQuantity = showSiteQuantity + 1
      const total = showSiteQuantity  + privateSiteQuantity 
      newPublicSiteQuantity = newPublicSiteQuantity > total ? total : newPublicSiteQuantity
      newPublicSiteQuantity = newPublicSiteQuantity < 0 ? 0 : newPublicSiteQuantity
      const diff = total - newPublicSiteQuantity
      let newPrivateSiteQuantity = diff < 0 ? 0 : diff
      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'decrementPublicSiteQuantity': {
      let newPublicSiteQuantity = showSiteQuantity - 1
      const total = showSiteQuantity  + privateSiteQuantity
      newPublicSiteQuantity = newPublicSiteQuantity > total ? total : newPublicSiteQuantity
      newPublicSiteQuantity = newPublicSiteQuantity < 0 ? 0 : newPublicSiteQuantity
      const diff = total - newPublicSiteQuantity
      const newPrivateSiteQuantity = diff < 0 ? 0 : diff
      // const newPrivateSiteQuantity = total - newPublicSiteQuantity
      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'incrementPrivateSiteQuantity': {
      let newPrivateSiteQuantity = privateSiteQuantity + 1
      const total = showSiteQuantity  + privateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity > total ? total : newPrivateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity < 0 ? 0 : newPrivateSiteQuantity
      const diff = total - newPrivateSiteQuantity
      const newPublicSiteQuantity = diff < 0 ? 0 : diff
      // const newPublicSiteQuantity = total - newPrivateSiteQuantity
      return {
        ...product, 
        privateSiteQuantity: newPrivateSiteQuantity, 
        showSiteQuantity: newPublicSiteQuantity
      }
    }
    case 'decrementPriveteSiteQuantity': {
      let newPrivateSiteQuantity = privateSiteQuantity  - 1
      const total = showSiteQuantity  + privateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity > total ? total : newPrivateSiteQuantity
      newPrivateSiteQuantity = newPrivateSiteQuantity < 0 ? 0 : newPrivateSiteQuantity
      const diff = total - newPrivateSiteQuantity
      const newPublicSiteQuantity = diff < 0 ? 0 : diff 
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