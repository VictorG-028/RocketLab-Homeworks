import { useCart } from '@/hooks/UseCart';
import { Navigate, Outlet } from 'react-router-dom';

export function AllowOnlyWithCartNotEmpty() {
  const { cart } = useCart();
  return cart.size > 0 ? <Outlet /> : <Navigate to='/' />;
}
