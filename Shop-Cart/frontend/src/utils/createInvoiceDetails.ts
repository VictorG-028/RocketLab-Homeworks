import { CartModel, ProductInfo } from '@/models/Cart';
import { formatDate } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '@/dto/UserDto';
import { InvoiceModel } from '@/models/Invoice';

export function generateInvoice(user: UserDto, cart: CartModel): InvoiceModel {
  const currentDate = new Date();

  const productsInfo: ProductInfo[] = Array.from(cart.values())

  const invoice: InvoiceModel = {
    id: uuidv4(),
    currentDate: formatDate(currentDate, 'dd/MM/yyyy'),
    billTo: user,
    names: productsInfo.map((p) => p.name),
    quantity: productsInfo.map((p) => p.quantity),
    prices: productsInfo.map((p) => p.price),
  }

  return invoice;
}
