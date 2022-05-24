import { useEffect, useState } from "react"
import { getAllClients } from "../Services/ClientService"
import { ChangeEvent, SetAction } from "../Types/TypesAliases"
import { AutoComplete, AutoCompleteProps } from "./AutoComplete"

export const AutoCompleteClients = ({ value, setValue }: AutoCompleteClientsProps) => {
  const [options, setOptions] = useState<string[]>([])
  useEffect(() => {
    getAllClients().then(serviceOptions => {
      const clientsDTO = serviceOptions ?? []
      const clientsSuggestions = clientsDTO.map(({name, clientId}) => `${name} - ${clientId}`)
      setOptions(clientsSuggestions)
    })
  }, []) 

  const handleChange = ({ target: { value }}: ChangeEvent) => setValue(value)

  const autoCompleteProps: AutoCompleteProps = {
    name: 'clients',
    value, 
    options, 
    onChange: handleChange
  }

  return <AutoComplete {...autoCompleteProps} />
}

export interface AutoCompleteClientsProps {
  value: string 
  setValue: SetAction<string>
}