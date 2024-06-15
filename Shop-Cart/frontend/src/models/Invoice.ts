import { UserDto } from "../dto/UserDto";

export interface InvoiceModel {
  id: string;
  currentDate: string;
  billTo: UserDto;

  names: string[];
  quantity: number[];
  prices: number[];
}
