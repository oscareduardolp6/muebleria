import { ErrorMessage, ErrorMessageProps } from "formik";
import { CSSProperties } from "react";

export const MyErrorMessage:React.ComponentType<ErrorMessageProps> = (props) => {
  const errorStyle: CSSProperties = { color: 'red'}
  return(
    <ErrorMessage {...props}>
    { message  => <div style={errorStyle}>{message}</div> }
    </ErrorMessage>
  )
}