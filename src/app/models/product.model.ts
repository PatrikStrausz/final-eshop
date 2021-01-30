export interface ProductModelServer {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
    images: string;
    short_desc:string
  }
  
  
  export interface serverResponse  {
    count: number;
    products: ProductModelServer[]
  };
  

  export class Product {

    constructor(
     public id: number,
     public title: string,
     public category: string,
     public description: string,
     public image: string,
     public price: number,
     public quantity: number,
     public images: string,
     public short_desc:string
    ){}
  
  }
  