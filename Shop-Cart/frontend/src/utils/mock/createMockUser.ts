import { UserDto } from "@/dto/UserDto";
import axios from "axios";
import { mapCurrencyNameToSymbol } from "../mapCurrencyNameToSymbol";


// const address: Address = {
//   street: "Rua Apollo",
//   number: "73",
//   city: "Recife",
//   state: "Brasil",
//   zipCode: "50030-220",
// }

// export const exampleUser: UserModel = {
//   id: 0,
//   name: "Usuário de Exemplo da Silva",
//   email: "exemplo@RocketLab.com",
//   currency: "R$",
//   balance: 1000.00,
//   address: address,
// }
const user: UserDto = await axios.get("http://localhost:3000/user/1").then(res => res.data);
user.currency = mapCurrencyNameToSymbol(user.currency);

export const loggedUser = user;
