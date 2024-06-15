import { productId } from "../dto/ProductDto";

export interface ProductInfo {
  quantity: number;
  name: string;
  price: number;
}

export type CartModel = Map<productId, ProductInfo>;

export function newCartModel(): CartModel {
  return new Map<productId, ProductInfo>();
}
