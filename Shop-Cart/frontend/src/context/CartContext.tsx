import { CartModel, newCartModel } from "@/models/Cart";
import { createContext, useCallback, useState } from "react";

interface CartContextModel {
  cart: CartModel;
  updateCart: (cart: CartModel) => void;
}

export const CartContext = createContext({} as CartContextModel);

interface Props {
  children: React.ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState(newCartModel());

  const UpdateCart = useCallback((cart: CartModel) => {
    setCart(cart);
  }, []);

  return (
    <CartContext.Provider value={{
      cart: cart,
      updateCart: UpdateCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}
