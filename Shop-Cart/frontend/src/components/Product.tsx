import { BadgeInfoIcon, MinusCircleIcon, 
  MinusIcon, 
  PlusCircleIcon, PlusIcon, ShoppingCartIcon 
} from "lucide-react";
import { Separator } from "./ui/separator";
import { ProductDto } from "src/dto/ProductDto";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductDto;
  initInsideCart: boolean;
  initProductQuantity?: number;
  cartButtonAction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: ProductDto, setIsInsideCart: React.Dispatch<React.SetStateAction<boolean>>, setQuantity: React.Dispatch<React.SetStateAction<number>>) => void;
  handleUpdateQuantiy: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, product: ProductDto, shouldIncrement: boolean, setQuantity: React.Dispatch<React.SetStateAction<number>>) => void;
}

function ProductImage(url: string) {
  return(
    <div className="w-[45%] h-auto overflow-hidden flex flex-col items-center">
        <img src={url} alt="Imagem do Produto" className="object-cover"></img> 
    </div>
  );
}

function PriceTag(currency: string, price: number) {
  return (
    <div className="rounded-l-full min-w-fit w-24 h-8 bg-red-300 self-center flex flex-row items-center justify-between">
      <span className="rounded-full w-2 h-2 bg-gray-50 inline-block justify-start mx-2"></span>
      <p className="text-nowrap text-center justify-center font-semibold font-serif">{currency}{price.toFixed(2)}</p>
      <span className="justify-end w-2"></span>
    </div>
  );
}

export default function Product({product, initInsideCart, initProductQuantity, cartButtonAction, handleUpdateQuantiy} : Props) {
  const [isInsideCart, setIsInsideCart] = useState(initInsideCart);
  const [quantity, setQuantity] = useState(initProductQuantity || 1);
  const navigate = useNavigate();

  return(
    <div className="container h-60 w-[425px] flex flex-row items-center bg-white rounded-r-2xl sm:rounded-2xl">
      {ProductImage(product.imageUrl)}

      {/* Info column */}
      <div className="flex flex-col px-2 py-2 gap-2 w-[212px] h-60">
        <p onClick={() => navigate(`/product/${product.id}`)}
          className="max-w-[100%] max-h-[100%] font-normal text-base text-ellipsis overflow-hidden cursor-pointer">
          {product.description}
        </p>

        <Separator className="bg-foreground"/>

        {PriceTag(product.currency, product.price)}

        <Separator className="bg-foreground"/>

        <div className="flex flex-row items-center first-line:justify-start gap-x-4">
          <Button className="relative max-w-20" onClick={(e) => {cartButtonAction(e, product, setIsInsideCart, setQuantity)}}>
            <ShoppingCartIcon></ShoppingCartIcon>
            {isInsideCart ? 
            <MinusIcon className="absolute top-0 right-1 stroke-white max-w-4"></MinusIcon>
            :
            <PlusIcon className="absolute top-0 right-1 stroke-white max-w-4"></PlusIcon>
            }
          </Button>
          {/* <Button className="max-w-20"><BadgeInfoIcon></BadgeInfoIcon></Button> TODO*/}
          
          {isInsideCart && <div className="flex flex-row items-center">
            <Button onClick={(e) => {handleUpdateQuantiy(e, product, false, setQuantity)}} 
            className="bg-transparent hover:bg-transparent px-2">
              <MinusCircleIcon className="stroke-black hover:stroke-zinc-800"></MinusCircleIcon>
            </Button>
            <p className="px-0 w-4 text-center">{quantity.toString().padStart(2, ' ')}</p>
            <Button onClick={(e) => {handleUpdateQuantiy(e, product, true, setQuantity)}} 
              className="bg-transparent hover:bg-transparent px-2">
              <PlusCircleIcon className="stroke-black hover:stroke-zinc-800"></PlusCircleIcon>
            </Button>
          </div>}
        </div>
      </div>
    </div>
  );
}
