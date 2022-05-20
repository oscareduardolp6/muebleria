import { FC } from 'react'
import { Link } from 'react-router-dom'
import { MenuItemsProps } from './MenuItemsTypes'

export const MenuItem: FC<MenuItemsProps> = ({className, children, redirect, ref, ...props}) => 
  <Link to={redirect} className={`card has-background-dark has-text-primary py-2 mt-5 myOption ${className}`} {...props}>
    { children }
  </Link>