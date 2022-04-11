import React from "react";
import { FieldProps } from "./FieldTypes";

export const Field = ({ name, labelText = name }: FieldProps) => {
  return (
    <div className='field'>
      <label className='label'>{ labelText }</label>
      

    </div>

  )
}