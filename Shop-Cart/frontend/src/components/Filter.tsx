import { FilterIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { FilterModel } from "@/models/Filter";


interface Props {
  horizontal: boolean;
  currency: string;
  filter: FilterModel;
  setFilter: React.Dispatch<React.SetStateAction<FilterModel>>;
  maxPrice: number;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filter({horizontal, currency, filter, setFilter, maxPrice, search, setSearch}: Props) {

  const style = horizontal 
  ? "flex flex-row items-center justify-evenly"
  : "flex flex-col items-certer justify-start";

  const style_2 = horizontal 
  ? "p-2"
  : "space-y-2 px-2 sm:w-52 md:w-60 lg:w-64";

  return(
    <div className={`${style} ${style_2}`}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#009e2a] px-[1.375rem] py-[0.5rem] text-[0.9375rem]">
            <FilterIcon></FilterIcon>
            Filtros
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
          {/* Price Range */}
          <>
            <p>Preço mínimo {currency}{filter.minPrice}</p>
            <Slider
              defaultValue={[filter.minPrice]}
              min={0}
              max={maxPrice}
              step={1}
              onValueChange={(values) => {setFilter({...filter, minPrice: values[0]})}}
              />
            <p>Preço máximo {currency}{filter.maxPrice}</p>
            <Slider
              defaultValue={[filter.maxPrice]}
              min={0}
              max={maxPrice}
              step={1}
              onValueChange={(values) => {setFilter({...filter, maxPrice: values[0]})}}
              />
          </>

          {/* Ready to Ship Today */}
          <div className="flex flex-row items-center space-x-2">
            <input
              id="readyToShipToday"
              type="checkbox"
              className="shadow-sm rounded md:mr-2 focus:ring-indigo-500 h-5 w-5"
              checked={filter.readyToShipToday}
              onChange={(e) => setFilter({ ...filter, readyToShipToday: e.target.checked })}
            />
            <label htmlFor="readyToShipToday" className="text-sm font-medium">
              Mostrar apenas prontos para envio hoje
            </label>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-row items-center border-2 rounded-[12px]">
        <Input  className="border-0 focus:border-0"
                type="search" 
                name="search" 
                placeholder="Busque um produto" 
                value={search}
                onChange={(event) => { setSearch(event.target.value) }}>
        </Input>
        <Button title="search" variant="default" 
          onClick={() => { }}
          className="bg-transparent focus:bg-transparent hover:bg-transparent"
          >
          <SearchIcon className="stroke-black w-4 h-4"></SearchIcon>
        </Button>

      </div>
    </div>
  );  
}
