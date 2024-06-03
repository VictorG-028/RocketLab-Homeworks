// import { CartModel } from '@/models/Cart';
// import { ProductModel } from '@/models/Product';
// import { UserModel } from '@/models/User';
// import { formatDate } from 'date-fns';
// import { v4 as uuidv4 } from 'uuid';
// import { products } from './createMockProduts';
// import { InvoiceModel } from '@/models/Invoice';

// export function generateInvoice(user: UserModel, cart: CartModel): InvoiceModel {
//   const currentDate = new Date();

//   const productsInCart: Product[] = [];
//   cart.forEach((value, key, map) => { productsInCart.push(products[key]) });

//   const invoice: InvoiceModel = {
//     id: uuidv4(),
//     currentDate: formatDate(currentDate, 'dd/MM/yyyy'),
//     billTo: user,
//     names: productsInCart.map((p) => p.name),
//     quantity: Array.from(cart.values()),
//     prices: productsInCart.map((p) => p.price),
//   }

//   return invoice;
// }
