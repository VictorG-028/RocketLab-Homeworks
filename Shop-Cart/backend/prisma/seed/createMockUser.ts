import { User, Address } from '@prisma/client';

export const exampleUser: User = {
  id: 1,
  name: "Usuário de Exemplo da Silva",
  password: "111222333",
  email: "exemplo@RocketLab.com",
  currency: "BRL",
  balance: 1000.00,
}

export const exampleAddress: Address = {
  id: 1,
  street: "Rua Apollo",
  number: "73",
  city: "Recife",
  state: "Brasil",
  zipCode: "50030-220",
  userId: exampleUser.id
}
