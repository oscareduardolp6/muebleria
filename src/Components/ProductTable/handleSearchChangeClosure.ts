import { DataRowProduct } from "../../Types/DataRow"
import { ChangeEvent } from "../../Types/TypesAliases"

export const createHandleSearchChange = (handleChange: any, reset: any, setData: any, data: DataRowProduct[]) => {
  return (e: ChangeEvent) => {
    handleChange(e)
    const { value } = e.target
    if(value === '')
      return reset()
    const newData = data.filter(row => row.productID.includes(value))
    setData(newData)
  }
}