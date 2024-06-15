import { OrderContext } from "@/context/OrdersContext";
import { useContext } from "react";

export const useOrder = () => useContext(OrderContext);
