import { Address } from "../models/Adress";

export interface UserDto {
  id: number;
  name: string;
  email: string;
  currency: string;
  balance: number;
  addresses: Address[];
};
