import Navbar from "@/components/Navbar";
import Spinner from "@/components/Spinner";
import { ErrorResponseDto } from "@/dto/ErrorResponseDto";
import { OrderDto } from "@/dto/OrderDto";
import { useUser } from "@/hooks/UseUser";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

function makeDateBeautiful(rawDateTime: string): string {
  const [date, time] = rawDateTime.split("T");
  const [year, month, day] = date.split("-");
  const [hour, minute, secondAndMilisecond] = time.split(":");
  return `${day}/${month}/${year} - ${hour}:${minute}`;
}

export default function Order() {
  const { user } = useUser();
  const [ orders, setOrders ] = useState<OrderDto[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/order/user/${user.id}`).then((res) => {
      const orders = res.data as OrderDto[];
      orders.map(o => {o.date = makeDateBeautiful(o.date)});
      setOrders(orders);
      setIsLoading(false);
    }).catch((e) => {
      const axiosError = e as AxiosError<ErrorResponseDto>;
      const data = axiosError.response?.data;
      if (data) {
        setError(data.message);
      } else {
        setError("Ocorreu algum erro no servidor");
      }
      setIsLoading(false);
    });
  }, []);

  const currency = user.currency;

  return (
    <main className="bg-gray-50 min-w-[450px] min-h-screen">
      <section>
        <Navbar routeName="orders"></Navbar>
      </section>

      {error && (
        <section className="my-4 flex flex-row items-center justify-center">
          <div className="bg-red-500 text-white p-4 rounded">
            {error}
          </div>
        </section>
      )}

      {!error && ( 
        isLoading ? 
          <Spinner></Spinner> 
        :
          <section className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-4">Suas Compras</h1>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 overflow-x-auto">
              {orders.map((order, index) => { 
                const firstAddress = user.addresses.length > 0 ? user.addresses[0] : undefined;
                return (
                  <div key={index} className="p-4 bg-white rounded-lg shadow-md mb-4 hover:bg-secondary">
                    <h2 className="text-lg font-bold mb-2">{order.date}</h2>
                    <p className="text-primary mb-2 font-bold flex">
                      Endereço: 
                      <span className="ml-2 font-normal">
                        {firstAddress?.street}, {firstAddress?.number}, {firstAddress?.city}
                      </span>
                    </p>
                    <p className="text-primary mb-2 font-bold flex">
                      Custo: 
                      <span className="ml-2 font-normal">
                        {currency} {order.cost.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-primary mb-2 font-bold">
                      Itens:
                    </p>
                    <ul className="pl-4">
                      {order.products.map((product, i) => (
                        <li key={i} className="text-primary">
                          <span className="font-semibold mr-1">{product.quantity}x</span>
                          <span className="mx-1 italic">{product.product.name}</span>
                          ( Unidade:  
                          <span className="font-semibold mx-1">{currency}{product.product.price}</span>
                          )
                        </li>
                      ))}
                    </ul>
                  </div>
                )})}
            </div>
          </section>
      )}
      </main>
    );
}
