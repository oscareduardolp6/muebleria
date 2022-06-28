
export const getTodayInInputFormat = () => {
  const offset = new Date().getTimezoneOffset()
  const yourDate = new Date(new Date().getTime() - (offset*60*1000))
  return yourDate.toISOString().split('T')[0]
}