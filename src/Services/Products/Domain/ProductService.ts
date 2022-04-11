import { Product_ID } from '../../../../../../Backend/Owl_Sales_Point_Back/src/Products/Domain/ValueObjects'
import { Product } from "../../../../../../Backend/Owl_Sales_Point_Back/src/Products/Domain/Product";
export interface ProductService{
  getProduct: (id: Product_ID) => Product
}