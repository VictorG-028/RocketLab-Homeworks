export interface ProductDto {
  id: productId;
  imageUrl: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  readyToShipToday: boolean;
  brand: string;
  model: string;
  color: string;
  connectivity: string;
  quantity: number;
  isRemoved: boolean;
};

export type productId = number;
export type quantity = number;
