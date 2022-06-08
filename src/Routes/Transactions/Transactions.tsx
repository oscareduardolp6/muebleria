import { useState } from "react"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { Label } from "../../Components/Label"
import { RouteTitle } from "../../Components/RouteTitle"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { TransactionsTable } from "../../Components/TransactionsTable/TransactionsTable"
import { DataRowTransaction } from "../../Components/TransactionsTable/TransactionTableColumns"
import { useReseteableState } from "../../Hooks/useResetableState"
import { getAllTransactionAsDataRows } from "../../Services/TransactionsService"
import { ChangeEvent } from "../../Types/TypesAliases"
import { FlaticonAttribution } from "./FlaticonAttribution"

const getTodayInInputFormat = () => {
  const offset = new Date().getTimezoneOffset()
  const yourDate = new Date(new Date().getTime() - (offset*60*1000))
  return yourDate.toISOString().split('T')[0]
}

const convertTransactionDateToDate = (date: string) => {
  const parts = date.split('/')
  const [day, month, year] = parts
  const newDate = new Date(`${month}/${day}/${year}`)
  return newDate
}

const convertStateStringToDate = (date: string) => {
  const [year, month, day] = date.split('/')
  return new Date(`${month}/${day}/${year}`)
}

const filterTransactionByDateClosure = (selectedDate: Date) => {
  const dateFilterCriteria = (transaction: DataRowTransaction) => {
    const {date} = transaction
    const transactionDate = convertTransactionDateToDate(date)
    return transactionDate.getTime() === selectedDate.getTime()
  }
  return dateFilterCriteria
}

export const Transactions = () => {
  const [
    transactions, 
    setTransactions, 
    _reset, 
    getOriginalTransactions
  ] = useReseteableState({
    fetchFunction: getAllTransactionAsDataRows, 
    initialState: []
  })
  const [stateDate, setStateDate] = useState('')
  const date = getTodayInInputFormat()
  const updateDate = ({target: {value}}: ChangeEvent) =>  setStateDate(value)

  const filterTransactions = () => {
    const hasDateFilter = stateDate !== ''
    let filteredTransactions = getOriginalTransactions()
    if(hasDateFilter){
      const selectedDate = convertStateStringToDate(stateDate)
      const filterCriteria = filterTransactionByDateClosure(selectedDate)
      filteredTransactions = filteredTransactions.filter(filterCriteria)
    }
    setTransactions(filteredTransactions)
  }

  return (
    <>
      <RouteTitle>Transacciones</RouteTitle>
      <Row className='ml-5'>
        <Column className='is-2'>
          <Label>Fecha</Label>
          <TextInput type='date' max={date} onChange={updateDate} value={stateDate}/>
        </Column>
        <Column>
          <Button style={{ marginTop: '2.5em'}} onClick={filterTransactions}>Buscar</Button>
        </Column>
      </Row>
      <TransactionsTable transactions={transactions}/>
      <FlaticonAttribution />
    </>
  )
}
