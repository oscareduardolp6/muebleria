export type StockQuantities = {
  maxPrivateStockQuantity: number, 
  maxPublicStockQuantity: number, 
  sellPrivateStockQuantity: number, 
  sellPublicStockQuantity: number
}

export type useStockQuantitiesReturn = {
  quantities: StockQuantities
  incrementPrivateStock: () => void 
  incrementPublicStock: () => void 
  decrementPrivateStock: () => void 
  decrementPublicStock: () => void 
  resetSellQuantities: () => void
  setMaxStock: ({privateStock, publicStock}: {privateStock: number, publicStock: number}) => void
}