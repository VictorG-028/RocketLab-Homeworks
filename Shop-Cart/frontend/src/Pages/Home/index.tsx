import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Product from "@/components/Product"
import ScrollUpButton from "@/components/ScrollUpButton";
import Navbar from "@/components/Navbar";
import Filter from "@/components/Filter";
import Spinner from "@/components/Spinner";
import { FilterModel } from "@/models/Filter";
import { useCart } from "@/hooks/UseCart";
import { useUser } from "@/hooks/UseUser";
import axios, { AxiosError } from "axios";
import { mapCurrencyNameToSymbol } from "@/utils/mapCurrencyNameToSymbol";
import { ErrorResponseDto } from "@/dto/ErrorResponseDto";
import { ProductDto } from "@/dto/ProductDto";

const defaultFilter: FilterModel = {
  minPrice: 0, 
  maxPrice: 1000.0,
  readyToShipToday: false,
}

function createNewFilter(products: ProductDto[]): FilterModel {
  const maxPrice = Math.ceil(products.reduce((maxPriceSoFar, product) => {
    const currentPrice = product.price;
    if (currentPrice > maxPriceSoFar) {
      maxPriceSoFar = currentPrice;
    }
    return maxPriceSoFar;
  }, 0));
  
  return ({
      minPrice: 0, 
      maxPrice: maxPrice,
      readyToShipToday: false,
  });
}

export default function Home() {
  const navigate = useNavigate();
  const { cart, updateCart } = useCart();
  const { user } = useUser();
  const [ products, setProducts ] = useState<ProductDto[]>([]); 
  const [ search, setSearch ] = useState("");
  const [ filter, setFilter ] = useState<FilterModel>(defaultFilter);
  const [ error, setError ] = useState("");
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/product").then((res) => {
      const products = res.data as ProductDto[];
      const newFilter = createNewFilter(products);
      products.map(p => {
        p.currency = mapCurrencyNameToSymbol(p.currency);
      });
      setProducts(products);
      setFilter(newFilter);
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

  function toggleAddToCart(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    product: ProductDto, 
    setIsInsideCart: React.Dispatch<React.SetStateAction<boolean>>, 
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) {
    e.stopPropagation();
    let isInside = undefined;
    if (cart.has(product.id)) {
      toast.success("Removido do carrinho");
      cart.delete(product.id);
      isInside = false;
    } else {
      toast.success("Adicionado no carrinho");
      cart.set(
        product.id, 
        {
          quantity: 1, 
          name: product.name, 
          price: product.price
        }
      );
      isInside = true;
    }
    updateCart(cart);
    setIsInsideCart(isInside);
    setQuantity(1);
  }

  function updateQuantity(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    product: ProductDto, shouldIncrement: boolean, 
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) {
    e.stopPropagation();
    const productInfo = cart.get(product.id);
    if (productInfo) {
      const prevQuantity =  productInfo.quantity;
      const newQuantity = Math.max(prevQuantity + (shouldIncrement ? +1 : -1), 1);
  
      cart.set(product.id, {...productInfo, quantity: newQuantity});
      updateCart(cart)
      setQuantity(newQuantity);
    } else {
      cart.set(
        product.id, 
        {
          name: product.name, 
          price: product.price, 
          quantity: 1
        }
      );
    }
  }

  const filteredProducts = products.filter((product) => {

    let searchAllowDisplay = false;
    let filtersAllowDisplay = false;

    // Filter by search
    const words = search.toLowerCase().split(" ");
    const productDescription = product.description.toLowerCase();
    const first_10_words = words.slice(0, Math.min(words.length, 10)); // Consider long text edge case
    first_10_words.forEach(word => {
      if (productDescription.includes(word)) {
        searchAllowDisplay = true;
      }
    });

    // Filter by filter options
    filtersAllowDisplay = product.price >= filter.minPrice && product.price <= filter.maxPrice;
    if (filter.readyToShipToday) filtersAllowDisplay = product.readyToShipToday;

    return (searchAllowDisplay && filtersAllowDisplay);
  });


  function handleBuyButton() {
    if (cart.size == 0) {
      toast("O carrinho está vazio");
      return;
    }
    navigate("/checkout");
  }

  return (
    <main className="min-w-[450px] bg-gray-50 min-h-screen">
      <ScrollUpButton></ScrollUpButton>

      <section>
        <Navbar routeName="home"></Navbar>
      </section>

      <section className="sm:hidden my-4">
      <Filter horizontal={true}
        currency={user.currency}
        filter={filter} setFilter={setFilter} 
        maxPrice={filter.maxPrice} 
        search={search} setSearch={setSearch}
      >
      </Filter>
      </section>

      {error && (
        <section className="my-4 flex flex-row items-center justify-center">
          <div className="bg-red-500 text-white p-4 rounded">
            {error}
          </div>
        </section>
      )}

      <section className="my-4 flex flex-row items-center justify-center">
        <Button onClick={() => {handleBuyButton()}}
          className="bg-primary rounded-full max-w-20"
        >
          Comprar
        </Button>
      </section>

      {isLoading ? 
        <Spinner></Spinner>
      : 
      <section className="space-y-2 sm:flex sm:flex-row xl:justify-between"> 
        <aside className={`
            hidden sm:flex sm:flex-col 
            xl:w-[17%] md:w-[30%] sm:w-[32%]
        `}>
          <Filter horizontal={false} // vertical={true}
            currency={user.currency}
            filter={filter} setFilter={setFilter} 
            maxPrice={filter.maxPrice} 
            search={search} setSearch={setSearch}
          >
          </Filter>
        </aside>
        <div className={`lg:grid
          xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 
          xl:w-[83%] md:w-[70%] sm:w-[68%] 
          xl:gap-x-0 
          xl:gap-y-8 xl:space-y-0 lg:space-y-8 md:space-y-6 space-y-4 
          sm:justify-start sm:justify-items-start sm:items-start
          md:justify-start md:justify-items-start md:items-start
          lg:justify-center lg:justify-items-center lg:items-center
        `}>
          {filteredProducts.map((product, i) => {
            return (
              <div key={i}>
                <Product product={product} 
                  initInsideCart={cart.has(product.id)} 
                  initProductQuantity={cart.get(product.id)?.quantity} 
                  cartButtonAction={toggleAddToCart}
                  handleUpdateQuantiy={updateQuantity}
                >
                </Product>
              </div>
            );
          })}
        </div>
      </section>
      }
    </main>
  );
};
