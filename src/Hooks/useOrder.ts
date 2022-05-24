import { useState } from "react"
import { DataRowOrder } from "../Components/OrderTable/OrderTableColumns"
import { OrderRowDTO } from '../../../../Share/OrderRowDTO'
import { ProductDTO } from "../../../../Share/ProductDTO"

export type RowProductDTO = 
  Pick<ProductDTO, 
      'price' 
    | 'mortgagePrice' 
    | 'name' 
    | 'publicPrice'>

export const useOrder = () => {
  const [displayOrderRows, setDisplayOrderRows] = useState<DataRowOrder[]>([])
  const [orderProducts, setOrderProducts] = useState<OrderRowDTO[]>([])

  const addRow = (orderRow: OrderRowDTO, { price, mortgagePrice, name, publicPrice }: RowProductDTO) => {
    setOrderProducts([...orderProducts, orderRow])
    const { privateSiteQuantity: quantity, publicSiteQuantity: publicQuantity } = orderRow
    const totalQuantity = quantity + publicQuantity
    const newDisplayRow: DataRowOrder = {
      basePrice: price * totalQuantity, 
      mortgagePrice: mortgagePrice * totalQuantity, 
      product: name, 
      publicPrice: publicPrice * totalQuantity , 
      quantity: totalQuantity, 
      unitPrice: price
    }

    displayOrderRows.pop()
    const newRows = [...displayOrderRows, newDisplayRow]

    const totalDisplayRow: DataRowOrder = newRows.reduce((prev, curr) => {
      return {
        basePrice: Number(prev.basePrice) + Number(curr.basePrice), 
        mortgagePrice: Number(prev.mortgagePrice) + Number(curr.mortgagePrice), 
        product: 'Total', 
        publicPrice: Number(prev.publicPrice) + Number(curr.publicPrice), 
        quantity: Number(prev.quantity) + Number(curr.quantity), 
        unitPrice: ''
      }
    })

    setDisplayOrderRows([...displayOrderRows, newDisplayRow, totalDisplayRow])
  }

  return {
    orderProducts, 
    displayOrderRows, 
    addRow
  }
}