import { useState } from "react"
import { ProductDTO } from "../../../../Share/ProductDTO"
import { SetAction } from "../Types/TypesAliases"

export const useSitesMovements = () => {
  const [product, setProduct] = useState<ProductDTO | null | undefined>()
  const total = product 
                  ? product.privateSiteQuantity + product.showSiteQuantity 
                  : 0

  const incrementPublicSiteQuantity = () => {
    console.log('Increment');
    if(!product) return 
    const { showSiteQuantity } = product
    const newPublicSiteQuantity = showSiteQuantity + 1
    const newPrivateSiteQuantity = total - newPublicSiteQuantity
    setProduct({
      ...product, 
      privateSiteQuantity: newPrivateSiteQuantity, 
      showSiteQuantity: newPublicSiteQuantity
    })
  }

  const decrementPublicSiteQuantity = () => {
    console.log('Decrement');
    if(!product) return
    const { showSiteQuantity } = product
    const newPublicSiteQuantity = showSiteQuantity - 1 
    const newPrivateSiteQuantity = total - newPublicSiteQuantity
    setProduct({
      ...product, 
      privateSiteQuantity: newPrivateSiteQuantity, 
      showSiteQuantity: newPublicSiteQuantity
    })
  }

  const incrementPrivateSiteQuantity = () => {
    console.log('Increment');
    if(!product) return 
    const { privateSiteQuantity } = product
    const newPrivateSiteQuantity = privateSiteQuantity + 1 
    const newPublicSiteQuantity = total - newPrivateSiteQuantity
    setProduct({
      ...product, 
      privateSiteQuantity: newPrivateSiteQuantity, 
      showSiteQuantity: newPublicSiteQuantity
    })
  }

  const decrementPrivateSiteQuantity = () => {
    console.log('Decrement');
    if(!product) return
    const { privateSiteQuantity } = product
    const newPrivateSiteQuantity = privateSiteQuantity - 1 
    const newPublicSiteQuantity = total - newPrivateSiteQuantity
    setProduct({
      ...product, 
      privateSiteQuantity: newPrivateSiteQuantity, 
      showSiteQuantity: newPublicSiteQuantity
    })
  }

  return [ 
    [product?.showSiteQuantity, product?.privateSiteQuantity], 
    setProduct,
    incrementPublicSiteQuantity, 
    decrementPublicSiteQuantity, 
    incrementPrivateSiteQuantity, 
    decrementPrivateSiteQuantity
  ] as [(number | null)[], SetAction<ProductDTO | null | undefined>, any, any, any, any]

}