import { createContext, FC } from "react"
import { BulmaToastNotifier } from "../../Classes/BulmaToastNotifier"
import { Notifier } from "../../Types/Notifier"

export type NotifierContextState = {
  alerter: Notifier
}

const contextDefaultValues: NotifierContextState = {
  alerter: new BulmaToastNotifier()
}

export const NotifierContext = createContext(contextDefaultValues)

const NotifierProvider:FC = ({children}) => {
  return (
    <NotifierContext.Provider value={contextDefaultValues}>{children}</NotifierContext.Provider>
  )
}

export default NotifierProvider