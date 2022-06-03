import { useEffect, useState } from "react"
import { ProductDTO } from "../../../../../Share/ProductDTO"
import ProductTable from "../../Components/ProductTable_v2";
import { getAllProducts } from "../../Services/ProductsService";

export const ProductsReport = () => {
  const [products, setProducts] = useState<ProductDTO[]>(); 

  useEffect(() => {
    const asyncEffect = async () => {
      const serviceProducts = await getAllProducts(); 
      if(!serviceProducts) return alert('Hubo un problema recuperando los productos, por favor reintente')
      setProducts(serviceProducts)
      console.log(serviceProducts);
      
    }
    asyncEffect()
  }, [])


  return (
    <>
      <ProductTable></ProductTable>
    </>
  )
}