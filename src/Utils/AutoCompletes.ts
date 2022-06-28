export const getProductId = (selection: string) => 
  selection.includes('-')
    ? selection.split('-')[1].trim()
    : selection