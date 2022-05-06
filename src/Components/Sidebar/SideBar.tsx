import { Children } from "react"
import { slide as Menu } from 'react-burger-menu'
import { MenuItem } from "./MenuItem"

import options from "./MenuOptions.json"

import './SideBar.css'

export const SideBar = () => {
  return (
    <Menu>
      { 
        Children.toArray(
          options.map(option => <MenuItem>{ option.optionName }</MenuItem>)
        ) 
      }
    </Menu>
  )
}