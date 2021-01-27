export class Order{
   
   constructor( 
       public order_created:string,
       public username:string,
       public total:number,
       public state:boolean,
       public id?:number
    ){}
   
}