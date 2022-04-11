import { Product } from "../../../../../../Backend/Owl_Sales_Point_Back/src/Products/Domain/Product";
import { ProductService } from "../Domain/ProductService";
import { Product_ID } from "../../../../../../Backend/Owl_Sales_Point_Back/src/Products/Domain/ValueObjects";

class MockApiProductService implements ProductService {
  public getProduct(id: Product_ID): Product {
    const data = fetch()
  }

}