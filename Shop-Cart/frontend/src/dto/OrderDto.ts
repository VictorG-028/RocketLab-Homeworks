export interface OrderDto {
  id: number
  cost: number
  date: string
  userId: number
  products: Product[]
}

interface Product {
  orderId: number
  productId: number
  quantity: number
  product: ProductDetails
}

interface ProductDetails {
  id: number
  imageUrl: string
  name: string
  price: number
  currency: string
  description: string
  readyToShipToday: boolean
  brand: string
  model: string
  color: string
  connectivity: string
  quantity: number
  isRemoved: boolean
}
