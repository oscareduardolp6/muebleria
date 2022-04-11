import { Field, FieldAttributes } from "formik";
import { CSSProperties, FC } from "react";
import { Datalist } from "./DataList";
import { Label } from "./Field/Label";
import { MyErrorMessage } from "./MyErrorMessage";

export const MyFormField:FC<MyFormFieldProps> = ({children, name, list, listName, inputStyle = {},  ...props}) => {
  return(
    <>
      <Label>{children}</Label>
      <Field {...props} name={name} list={listName} style={inputStyle} />
      <MyErrorMessage name={name} /> 
      { (list && listName) && <Datalist id={listName} list={list} />}
    </>
  )
}

interface MyFormFieldProps extends FieldAttributes<any>{
  name: string
  list?: string[]
  listName?: string
  inputStyle?: CSSProperties
}
