import { ProductModelServer } from "./product.model";

export interface CartModelServer {
    total: number,
    data: [{
      product: ProductModelServer,
      quantity: number
    }];
  }
  
  export interface CartModelPublic {
    total: number,
    prodData: [{
      product_id: number,
      quantity: number
    }]
  }
  