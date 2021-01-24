export class User {
  constructor(
      public username: string,
      public password: string,
      public email: string,
      public role? ,
      public token?,
      public id?: number,) {}
}
