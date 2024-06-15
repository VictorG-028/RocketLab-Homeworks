import { InvoiceModel } from "@/models/Invoice";
import { Separator } from "@radix-ui/react-separator";
import { Address } from "@/models/Adress";

interface Props {
  data: InvoiceModel;
  children: React.ReactNode;
  totalPrice: number;
  userFreezedBalance: number;
}

// Component template link: https://tailwindflex.com/@shakti/invoice-template
export default function Invoice({data, children, totalPrice, userFreezedBalance}: Props) {

  const currency = data.billTo.currency;
  const firstAddress: Address | undefined = data.billTo.addresses.length > 0 ? data.billTo.addresses[0] : undefined;
  const oldBalance = userFreezedBalance.toFixed(2);
  const newBalance = (userFreezedBalance - totalPrice).toFixed(2);
  const delta = `${currency}${oldBalance} / ${currency}${newBalance}`;
  const prices = data.prices.map((price, i) => price * data.quantity[i]);

  return (
    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">

      <h1 className="font-bold text-2xl my-4 text-center text-primary">Loljinha</h1>

      <Separator className="bg-foreground h-0.5 rounded-full"></Separator>

      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Fatura</h1>
        <div className="text-gray-700">
          <div>Data: {data.currentDate}</div>
          <div>Fatura #: {data.id.substring(0, 8)}</div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2">
        <div>     
          <h2 className="text-lg font-bold mb-4">Fatura para:</h2>
          <div className="text-gray-700 mb-2">{data.billTo.name}</div>
          <div className="text-gray-700 mb-2">{firstAddress?.number} {firstAddress?.street}</div>
          <div className="text-gray-700 mb-2">{firstAddress?.city}, {firstAddress?.state} {firstAddress?.zipCode}</div>
          <div className="text-gray-700">{data.billTo.email}</div>
        </div>
        <div>
          <></>
        </div>
      </div>
      
      <table className="w-full mb-8">
        <thead>
          <tr>
            <th className="text-left font-bold text-gray-700">No carrinho</th>
            <th className="text-right font-bold text-gray-700">Preço</th>
          </tr>
        </thead>
        <tbody>
        {data.names.map((name, index) => (
            <tr key={index}>
              <td className="text-left text-gray-700">{name} (x{data.quantity[index]})</td>
              <td className="text-right text-gray-700">{currency}{prices[index].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-left font-bold text-gray-700">Total</td>
            <td className="text-right font-bold text-gray-700">{currency}{totalPrice.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="text-left font-bold text-gray-700">Saldo antes / depois</td>
            <td className="text-right font-bold text-gray-700 text-nowrap">{delta}</td>
          </tr>
        </tfoot>
      </table>

      <>
        {children}
      </>
    </div>
  );
}
