import { Order } from "src/modules/order/model/Order.model";
import { Address } from "./Adress.model";
import { Currency } from "src/Common/Currency";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  currency: Currency;
  balance: number;
  addresses: Address[];
  orders: Order[];
};
