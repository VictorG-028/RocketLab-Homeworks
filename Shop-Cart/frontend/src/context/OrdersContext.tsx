import { ErrorResponseDto } from "@/dto/ErrorResponseDto";
import { useUser } from "@/hooks/UseUser";
import { InvoiceModel } from "@/models/Invoice";
import axios, { AxiosError } from "axios";
import { createContext, useCallback, useState } from "react";
import toast from "react-hot-toast";

interface OrderContextModel {
  orders: InvoiceModel[];
  addOrder: (invoice: InvoiceModel) => void;
  getUserOrders: (userId: number) => void;
}

export const OrderContext = createContext({} as OrderContextModel);

interface Props {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<Props> = ({ children }) => {
  const [orders, setOrders] = useState<InvoiceModel[]>([]);

  const AddOrder = useCallback((invoice: InvoiceModel) => {
    orders.push(invoice);
    setOrders(orders);
  }, []);
  
  const GetUserOrders = useCallback(async (userId: number) => {
    axios.get(`http://localhost:3000/order/user/${userId}`).then((res) => {
      setOrders(res.data);
    }).catch((e) => {
      const axiosError = e as AxiosError<ErrorResponseDto>;
      const data = axiosError.response?.data;
      if (data) {
        toast.error(data.message);
      } else {
        toast.error("Ocorreu algum erro no servidor"); 
      }
    });
  }, [orders]);

  return (
    <OrderContext.Provider value={{
      orders: orders,
      addOrder: AddOrder,
      getUserOrders: GetUserOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
}
