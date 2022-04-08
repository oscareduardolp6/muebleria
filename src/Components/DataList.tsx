import { Children } from "react"

export const Datalist = ({list, id}: DataListProps) => 
  <datalist id={id}>
    { Children.toArray( 
      list.map(item => 
        <option value={item} />
      )
    )}
  </datalist>

interface DataListProps{
  list: any[]
  id: string 
}