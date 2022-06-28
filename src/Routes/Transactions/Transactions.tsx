import { CSSProperties } from "react"
import { transactionTypesDescription } from "../../../../../Share/TransactionDTO"
import { Button } from "../../Components/Button"
import { Column } from "../../Components/Column"
import { ColumnSize2 as Column2 } from "../../Components/ColumnSize2"
import { DropDown } from "../../Components/DropDown"
import { Label } from "../../Components/Label"
import { RouteTitle } from "../../Components/RouteTitle"
import { Row } from "../../Components/Row"
import { TextInput } from "../../Components/TextInput"
import { TransactionsTable } from "../../Components/TransactionsTable/TransactionsTable"
import { DataRowTransaction } from "../../Components/TransactionsTable/TransactionTableColumns"
import { EMPTY_SEARCH_VALUE } from "../../Constants/InputValues"
import { alerter } from "../../Constants/Notifiers"
import { convertInputDateStringToDate, InputDate } from "../../Hooks/useDate"
import { useForm } from "../../Hooks/useForm"
import { useReseteableState } from "../../Hooks/useResetableState"
import { getAllTransactionAsDataRows, getTotalRow } from "../../Services/TransactionsService"
import { ChangeEvent } from "../../Types/TypesAliases"
import { getTodayInInputFormat } from "../../Utils/Date"
import { convertTransactionDateToDate } from "../../Utils/Transactions"
import { FlaticonAttribution } from "./FlaticonAttribution"

export const Transactions = () => {
  const [
    transactions,
    setTransactions, ,
    getOriginalTransactions
  ] = useReseteableState({
    fetchFunction: getAllTransactionAsDataRows,
    initialState: []
  })
  const [form, handleChange, resetForm, setForm] = useForm(initialForm)

  const handleChangeDate = ({currentTarget: {value, name}}: ChangeEvent) => 
    setForm({
      ...form, 
      [name]: {
        text: value, 
        date: convertInputDateStringToDate(value)
      }
    })

  const handleFilter = () => 
    setTransactions(filterTransactions({
      getOriginalTransactions, 
      filters: form
    }))

  const resetFilters = () => {
    resetForm()
    const allTransactions = getOriginalTransactions()
    setTransactions(allTransactions)
  }

  const buttonStyle: CSSProperties = { marginTop: '2.5em'}

  return (
    <>
      <RouteTitle>Transacciones</RouteTitle>
      <Row className='ml-5'>
        <Column2>
          <Label>Fecha Inicial</Label>
          <TextInput type='date' max={getTodayInInputFormat()} onChange={handleChangeDate} value={form.initialDate.text} name='initialDate' />
        </Column2>
        <Column2>
          <Label>Fecha Final</Label>
          <TextInput type='date' max={getTodayInInputFormat()} onChange={handleChangeDate} value={form.finalDate.text} name='finalDate' />
        </Column2>
        <Column2>
          <Label>Cliente</Label>
          <TextInput type='text' onChange={handleChange} value={form.client} name='client' />
        </Column2>
        <Column2>
          <Label>Proveedor</Label>
          <TextInput type='text' onChange={handleChange} value={form.supplier} name='supplier' />
        </Column2>
        <Column>
          <TransactionTypesFilter form={form} handleChange={handleChange} />
        </Column>
        </Row>
        <Row>
        <Column className='is-1 ml-6'>
          <Button style={buttonStyle} onClick={handleFilter}>Buscar</Button>
        </Column>
        <Column className='is-1'>
          <Button style={buttonStyle} buttonColor='info' onClick={resetFilters}>Limpiar</Button>
        </Column>
      </Row>
      <TransactionsTable transactions={transactions}/>
      <FlaticonAttribution />
    </>
  )
}

const EMPTY_TRANSACTION_TYPE_TEXT = 'Seleccione un tipo de transacción'

const TransactionTypesFilter = ({form: {transactionType, }, handleChange}: {form: TransactionFilters, handleChange: any}) => {
  const descriptions = Object.values(transactionTypesDescription)
  return (
    <DropDown 
      defaultText={EMPTY_TRANSACTION_TYPE_TEXT}
      onChange={handleChange} 
      defaultValue=''
      name='transactionType'
      labelText='Tipo de Transacción' 
      options={descriptions} />
  )
}

const filterTransactions = ({
  filters: {
    initialDate, 
    finalDate, 
    client, 
    supplier, 
    transactionType
  },
  getOriginalTransactions
}: FilterTransactionClosureParams) => {
  const hasInitialDate = initialDate.text !== EMPTY_SEARCH_VALUE 
  const hasFinalDate = finalDate.text !== EMPTY_SEARCH_VALUE
  const hasDateFilter = hasInitialDate && hasFinalDate
  const hasHalfDateFilter = (hasInitialDate && !hasFinalDate) || (!hasInitialDate && hasFinalDate)
  console.log({transactionType});
  
  
  const hasSupplierFilter = supplier !== EMPTY_SEARCH_VALUE
  const hasTransactionTypeFilter = transactionType !== EMPTY_SEARCH_VALUE
  if(hasHalfDateFilter) {
    alerter.alertError('No se seleccionaron fechas validas')
    return getOriginalTransactions()
  }
  const hasClientFilter = client !== EMPTY_SEARCH_VALUE
  let filteredTransactions = getOriginalTransactions()
  if(hasDateFilter){
    const filterCriteria = filterTransactionByDateClosure(initialDate.date ?? new Date(), finalDate.date ?? new Date())
    filteredTransactions = filteredTransactions.filter(filterCriteria)
  }
  if(hasClientFilter)
    filteredTransactions = filteredTransactions.filter(
      ({clientId}) => clean(clientId) === clean(client)
    )
  if(hasSupplierFilter) 
      filteredTransactions = filteredTransactions.filter(
        ({supplierId}) => clean(supplierId) === clean(supplier)
      )
  if(hasTransactionTypeFilter) 
    filteredTransactions = filteredTransactions.filter(({type}) => clean(type.split(' ')[0]) === clean(transactionType))
  
  if(filteredTransactions.length > 0)
    filteredTransactions = [...filteredTransactions, getTotalRow(filteredTransactions)]
  return filteredTransactions
}


const clean = (text: string) => text.trim().toUpperCase()

interface FilterTransactionClosureParams {
  filters: TransactionFilters
  getOriginalTransactions: () => DataRowTransaction[]
}

const filterTransactionByDateClosure = (initialDate: Date, finalDate: Date) => {
  const dateFilterCriteria = (transaction: DataRowTransaction) => {
    const { date } = transaction
    const transactionDate = convertTransactionDateToDate(date)
    return (transactionDate.getTime() >= initialDate.getTime()) && (transactionDate.getTime() <= finalDate.getTime())
  }
  return dateFilterCriteria
}

interface TransactionFilters { 
  client: string 
  initialDate: InputDate
  finalDate: InputDate 
  supplier: string
  transactionType: string
}

const initialInputDate: InputDate = {
  date: null, 
  text: ''
}

const initialForm: TransactionFilters = {
  client: EMPTY_SEARCH_VALUE, 
  finalDate: {...initialInputDate}, 
  initialDate: {...initialInputDate},
  supplier: EMPTY_SEARCH_VALUE, 
  transactionType: EMPTY_SEARCH_VALUE
}
