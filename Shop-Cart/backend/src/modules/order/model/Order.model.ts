import { OrderProduct } from "./OrderProduct.model";

export interface Order {
  id: number;
  cost: number;
  date: Date;
  userId: number;
  products: OrderProduct[];
}
