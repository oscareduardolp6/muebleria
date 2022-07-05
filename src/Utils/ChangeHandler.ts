import { ChangeEvent, ChangeEventSelect } from './../Types/TypesAliases'

export const changeHandlerClosure = (setFunction: (value: string) => void) => 
  ({ target: { value }}: ChangeEvent) => setFunction(value)

export const changeHandlerNumberClosure = (setFunction: (value: number) => void) => 
  ({target: { valueAsNumber }}: ChangeEvent) => setFunction(valueAsNumber)

export const changeSelectHandlerClosure = (setFunction: (value: string) => void) => 
  ({ target: { value }}: ChangeEventSelect) => setFunction(value)

export const changeRadioHandlerClosure = (setFunction: (value: string) => void) => 
  ({target: { checked, value }}: ChangeEvent) => setFunction(value)


