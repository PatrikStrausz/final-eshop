export interface ProductModelServer {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    images: string;
  }
  
  
  export interface serverResponse  {
    count: number;
    products: ProductModelServer[]
  };
  