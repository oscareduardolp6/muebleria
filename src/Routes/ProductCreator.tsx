import React, { useState } from "react"
import { Formik, Form, Field } from 'formik'
import { SalesFormInputs } from "./Sales/SalesTypes"
import { Label } from "../Components/Field/Label"
import { usePrice } from "../Hooks/usePrice"
import { Row } from "../Components/Row"
import { Column } from "../Components/Column"
import { MyFormField } from "../Components/MyFormField"

const validate = (values: any) => {
  const errors: any = {}
  if(!values.productID)
    errors.productID = 'Código de producto no puede estar vacío'
  if(!values.productName)
    errors.productName = 'Nombre del producto no puede estar vacío'
  return errors 
}

const commonClass = 'input has-text-centered'

export const ProductCreator = () => {
  const initialColors: string[] = ['rojo', 'azul', 'amarillo', 'verde']
  const initialSizes: string[] = ['extra chico', 'chico', 'mediano', 'grande', 'extra-grande']
  const initialSupliers: string[] = ['Mercado Libre', 'Walmart']

  const [colors, setColors] = useState(initialColors)
  const [sizes] = useState(initialSizes)

  // const [price, setPrice] = usePrice({
  //   basePrice: 0, 
  //   // mortageRelation: price => 1.25*price, 
  //   // publicRelation: price => 1.5*price
  // })

  const [supliers, setSupliers] = useState(initialSupliers)

  // const changePrice = (e: any) => setPrice(Number(e.target.value))

  const initialValues: SalesFormInputs = {
    productID: '', 
    productName: '', 
    productBrand: '', 
    productColor: '', 
    productDescription: '', 
    productFabric: '',
    productLowStockAlert: '',
    productPrivateSiteStock: 0, 
    productSize: '', 
    productSuppliers: '', 
    productPublicSiteStock: 0
  }

  const handleSubmit = (e: any) => {
    console.log(e) 
  }
  
  const handleClick = (e: any) => {
    
  }

  const formikProps = {
    initialValues, 
    validate, 
    onSubmit: handleSubmit, 
  }

  return (
    <Formik {...formikProps}  >
      <Form className='m-6'>
        <Row>
          <Column className="is-flex">
            <div>
              <MyFormField name='productID' className={commonClass} placeholder='A20' required inputStyle={{maxWidth: '120%'}} >
                ID Producto
              </MyFormField>
            </div>
            <div>
              <button className="button is-primary ml-5" style={{marginTop: '2.4em'}} type='button'>Buscar</button>
            </div>
          </Column>
          <Column>
            <MyFormField name='productName' className={commonClass} placeholder='A20' required>
              Nombre Producto
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productColor' className={commonClass} listName='colors' placeholder='rojo' list={colors} >
              Color
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productBrand' className={commonClass} placeholder='Generica'>
              Marca
            </MyFormField>
          </Column>
        </Row>
        <Row>
          <Column className="is-half">
            <MyFormField name='productDescription' as='textarea' className='input' placeholder='Artículo de tales dimensiones'>
              Descripción Artículo
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productFabric' className='input' placeholder='Algodón'>
              Tela
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productSize' className='input' placeholder='Mediana' listName='sizes' list={sizes}>
              Tamaño
            </MyFormField>
          </Column>
        </Row>
        <Row>
          <Column>
            <MyFormField name='productBasePrice' className='input' placeholder='$125'  type='number' min='0'>
              Precio Base 
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productMortagePrice' type='number' className='input'  disabled>
              Precio Hipoteca
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productPublicPrice' type='number' className='input'  disabled>
              Precio Público 
            </MyFormField>
          </Column>
        </Row>
        <Row>
          <Column>
            <MyFormField type='number' name='productPrivateSiteStock' className='input' placeholder='0' min='0'>
              Cantidad en almacén con la que inicia
            </MyFormField>
          </Column>
          <Column>
            <MyFormField type='number' name='productPublicSiteStock' className='input' placeholder='0' min='0'>
              Cantidad al público con la que inicia
            </MyFormField>
          </Column>
          <Column>
            <MyFormField name='productSuppliers' className='input' placeholder='Amazon' listName='supliers' list={supliers}>
              Proveedores
            </MyFormField>
          </Column>
        </Row>
        <Row>
          <Column className='is-11'>
            <Label>
              <Field name='productLowStockAlert' className='checkbox has-text-primary' type='checkbox' style={{marginRight: '8px'}} />
              Alerta de Stock Baja
            </Label>
          </Column>
          <Column>
            <button className="button is-primary">Guardar</button>
          </Column>
        </Row>
      </Form>
    </Formik>
  )
}
