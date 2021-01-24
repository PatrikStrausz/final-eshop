export class Address{


    constructor(
        public line1:string,
        public city:string,
        public state:string,
        public country: string,
        public phone:string,
        public pincode:number,
        public id?:number ){}
}