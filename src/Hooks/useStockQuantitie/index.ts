import { useState } from "react";
import { StockQuantities, useStockQuantitiesReturn } from "./Types";

const defaultQuantities: StockQuantities = {
  maxPrivateStockQuantity: 0,
  maxPublicStockQuantity: 0,
  sellPrivateStockQuantity: 0,
  sellPublicStockQuantity: 0
}

const useStockQuantities = () => {
  const [quantities, setQuantities] = useState(defaultQuantities)
  const {
    maxPrivateStockQuantity,
    maxPublicStockQuantity,
    sellPrivateStockQuantity,
    sellPublicStockQuantity
  } = quantities

  const resetSellQuantities = () => setQuantities(state => {
    return {
      ...state,
      sellPrivateStockQuantity: 0,
      sellPublicStockQuantity: 0
    }
  })

  const setMaxStock = ({privateStock, publicStock}: {privateStock: number, publicStock: number}) => setQuantities({
    ...quantities, 
    maxPrivateStockQuantity: privateStock, 
    maxPublicStockQuantity: publicStock
  })

  const incrementPrivateStock = () => {
    const newQuantity = sellPrivateStockQuantity + 1
    const sellQuantity = getSellQuantity(maxPrivateStockQuantity, newQuantity)
    setQuantities({
      ...quantities,
      sellPrivateStockQuantity: sellQuantity
    })
  }

  const incrementPublicStock = () => {
    const newQuantity = sellPublicStockQuantity + 1
    const sellQuantity = getSellQuantity(maxPublicStockQuantity, newQuantity)
    setQuantities({
      ...quantities,
      sellPublicStockQuantity: sellQuantity
    })
  }

  const decrementPrivateStock = () => {
    const newQuantity = sellPrivateStockQuantity - 1
    const sellQuantity = getSellQuantity(maxPrivateStockQuantity, newQuantity)
    setQuantities({
      ...quantities,
      sellPrivateStockQuantity: sellQuantity
    })
  }

  const decrementPublicStock = () => {
    const newQuantity = sellPublicStockQuantity - 1
    const sellQuantity = getSellQuantity(maxPublicStockQuantity, newQuantity)
    setQuantities({
      ...quantities,
      sellPublicStockQuantity: sellQuantity
    })
  }

  const result: useStockQuantitiesReturn = {
    decrementPrivateStock,
    decrementPublicStock,
    incrementPrivateStock,
    incrementPublicStock,
    quantities,
    resetSellQuantities,
    setMaxStock
  }

  return result

}

const getSellQuantity = (maxStockQuantity: number, newQuantity: number) =>
  newQuantity > maxStockQuantity
    ? maxStockQuantity
    : newQuantity < 0
      ? 0
      : newQuantity

export default useStockQuantities