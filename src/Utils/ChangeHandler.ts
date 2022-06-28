import { ChangeEvent } from './../Types/TypesAliases'
export const changeHandlerClosure = (setFunction: (value: string) => void) => 
  ({ target: { value } }: ChangeEvent) => setFunction(value)
