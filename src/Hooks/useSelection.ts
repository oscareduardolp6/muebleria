import { useState } from "react"
import { HandleSelectionFunction } from "../Components/ProductTable/ProductTable"

export const useSelection = () => {
  const [selection, setSelection] = useState<any>()
  const mySetSelection: HandleSelectionFunction = ({ selectedRows }) => {
    setSelection(selectedRows)
  }
  return [selection, mySetSelection] as [any, () => void]

}