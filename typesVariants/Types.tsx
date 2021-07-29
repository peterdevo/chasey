export type MenuType = {
  id: string;
  image: string;
  price: number;
  title: string;
  star: string;
  description: string;
};

export type OrderType = {
  id: string;
  image: string;
  amount: number;
  title: string;
  price: number;
};

export type Person = {
  name: string;
  city:string;
  street: string;
  zipCode: string;
  email: string;
  phone: string;
  userId:string
};

export type UserInfoInput={
  email:string,
  password:string,
  image?:string
  firstName?:string,
  lastName?:string,
  phone?:string,
  address?:{
    street?:string
    city?:string,
    zipCode?:string
  }
  accountType:string
}
