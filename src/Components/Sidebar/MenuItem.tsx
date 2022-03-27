import React, { FC } from 'react'
import { MenuItemsProps } from './MenuItemsTypes'

export const MenuItem: FC<MenuItemsProps> = ({className, children, ...props}) => 
  <a className={`card has-background-dark has-text-primary py-2 mt-5 ${className}`} {...props}>{ children }</a>