import React, { useState, Children } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { SalesFormInputs } from "./SalesTypes"
import { Label } from "../../Components/Field/Label"
import CurrencyInput from "react-currency-input-field"

const validate = (values: any) => {
  console.log(values);
  const errors: any = {}
  if(!values.productID)
    errors.productID = 'Código de producto no puede estar vacío'
  if(!values.productName)
    errors.productName = 'Nombre del producto no puede estar vacío'
  return errors 
}

export const ProductCreator = () => {
  const initialColors: string[] = ['rojo', 'azul', 'amarillo', 'verde']
  const initialSizes: string[] = ['extra chico', 'chico', 'mediano', 'grande', 'extra-grande']
  const [colors, setColors] = useState(initialColors)
  const [sizes] = useState(initialSizes)

  const [price, setPrice] = useState('')

  const handleSubmit = (e: any) => {
    console.log(e)
  }

  const initialValues: SalesFormInputs = {
    productID: '', 
    productName: '', 
    productBrand: '', 
    productColor: '', 
  }

  const formikProps = {
    initialValues, 
    validate, 
    onSubmit: handleSubmit
  }

  return (
    <Formik {...formikProps} >
      <Form className='m-6'>
        <div className='columns'>
          <div className="column">
            <Label>ID Producto</Label>
            <Field name='productID' type='text' className='input has-text-centered is-size-6' placeholder='A20' required/>
            <ErrorMessage name='productID' >
              { message  => <div style={{color: 'red'}}>{message}</div> }
            </ErrorMessage>
          </div>
          <div className="column">
            <Label>Nombre Producto</Label>
            <Field name='productName' type='text' className='input has-text-centered' placeholder='Silla' required/>
            <ErrorMessage name='productName' >
              { message  => <div style={{color: 'red'}}>{message}</div> }
            </ErrorMessage>
          </div>
          <div className="column">
            <Label>Color</Label>
            <Field name='productColor' type='text' className='input has-text-centered' list='colors' placeholder='Rojo' />
            <datalist id='colors'>
              { Children.toArray( 
                colors.map(color => <option value={color} /> )
              )}
            </datalist>
          </div>
          <div className="column">
            <Label>Marca</Label>
            <Field name='productBrand' type='text' className='input has-text-centered' placeholder='Generica' />
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <Label>Descripción Artículo</Label>
            <Field name='productDescription' as='textarea' className='input is-size-6' placeholder='Artículo de tales dimensiones'/> {/* TODO: Cambiar las clases por las clases de textarea de bulma */}
          </div>
          <div className="column">
            <Label>Tela</Label>
            <Field name='productFabric' className='input' placeholder='Algodón'/>
          </div>
          <div className="column">
            <Label>Tamaño</Label>
            <Field name='productSize' className='input' placeholder='Median@' list='sizes' />
            <datalist id='sizes'>
              { Children.toArray(
                sizes.map(size => <option value={size} />)
              )}
            </datalist>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Label>Precio Base</Label>
            <Field type='number' name='productBasePrice' className='input' placeholder='$125' /> {/*TODO: Cambiar esto por un componente que muestre mejor los precios*/ }
          </div>
          <div className="column">
            <Label>Precio Hipoteca</Label>
            <Field type='number' name='productMortgagePrice' className='input' value='125' disabled />
          </div>
          <div className="column">
            <Label>Precio Publico</Label>
            <Field type='number' name='productPublicPrice' className='input' value='130' disabled />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Label>Cantidad en almacén con la que inicia</Label>
            <Field type='number' name='productPrivateSiteQuantity' className='input' placeholder='0' />
          </div>
          <div className="column">
            <Label>Cantidad al público con la que inicia</Label>
            <Field type='number' name='productPublicSiteQuantity' className='input' placeholder='0' />
          </div>
          <div className="column">
            <Label>Proveedores</Label>
            <Field name='productSupliers' className='input' placeholder='Amazon' /> {/* TODO: Agrega Datalist para autocompletar los proveedores */}
          </div>
        </div>
        <div className="columns">
          <div className="column is-11">
            <label htmlFor="" className="checkbox has-text-primary is-size-5" >
              <input type="checkbox" name="productLowStockAlert" id="" style={{marginRight: '8px'}}/>
              Alerta de Stock Baja
            </label>
          </div>
          {/* TODO: Este div solo se tiene que ver cuando esté seleccionado el de alerta cuando hay bajo stock */}
          <div className="column">
            <button className='button is-primary'>Guardar</button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}
