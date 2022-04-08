import { MyPrice, relationFunction } from "../../../../Backend/Owl_Sales_Point_Back/src/Products/Domain/MyPrice";
import { useState } from 'react'

export const usePrice = ({basePrice, mortageRelation, publicRelation}: usePriceParams) => {
  const initialPrice: MyPrice = new MyPrice(basePrice, mortageRelation, publicRelation)
  const [price, setPrice] = useState(initialPrice)
  const changePrice = (mybasePrice: number) => { 
    console.log('Llamando a setPrice');
    const newPrice = new MyPrice(mybasePrice, mortageRelation, publicRelation)
    console.log(`Precio Base ${newPrice.getOriginalPrice()?.getPrice()}`);
    console.log(`Precio Hipoteca ${newPrice.getMortgagePrice()?.getPrice()}`);
    console.log(`Precio Público ${newPrice.getPublicPrice()?.getPrice()}`);
    setPrice(newPrice)
  }
  return [price, changePrice] as [MyPrice, (num:number) => void ]
}

interface usePriceParams {
  basePrice: number
  mortageRelation: relationFunction
  publicRelation: relationFunction
}

