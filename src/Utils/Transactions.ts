export const convertTransactionDateToDate = (date: string) => {
  const parts = date.split('/')
  const [day, month, year] = parts
  const newDate = new Date(`${month}/${day}/${year}`)
  return newDate
}