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
    const { quantity } = orderRow
    const newDisplayRow: DataRowOrder = {
      basePrice: price * quantity, 
      mortgagePrice: mortgagePrice * quantity, 
      product: name, 
      publicPrice: publicPrice * quantity , 
      quantity: quantity, 
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