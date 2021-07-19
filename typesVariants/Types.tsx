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
  zipcode: string;
  email: string;
  phone: string;
};

export type UserInfoInput={
  email:string,
  password:string,
  firstName?:string,
  lastName?:string,
  address?:{
    street?:string
    city?:string,
    zipcode?:string
  }
}
