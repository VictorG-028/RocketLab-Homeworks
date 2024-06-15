import toast from "react-hot-toast";
import { ErrorResponseDto } from "@/dto/ErrorResponseDto";
import { UserDto } from "@/dto/UserDto";
import { loggedUser } from "@/utils/mock/createMockUser";
import axios, { AxiosError } from "axios";
import { createContext, useCallback, useState } from "react";

interface UserContextModel {
  user: UserDto;
  subtractFunds: (ammount: number) => void;
  addFunds: (ammount: number) => void;
  updateBalance: (newBalance: number | null) => void;
}

export const UserContext = createContext({} as UserContextModel);

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserDto>(loggedUser);

  const SubtractFunds = useCallback(async (ammount: number) => {
    const body = {
      balance: user.balance - ammount
    };
    await axios.patch(`http://localhost:3000/user/${user.id}`, body).then((res) => {
      const newBalance = res.data.balance as number;
      setUser({...user, balance: newBalance});
      toast("Fundos adicionados");
    }).catch((e) => {
      const axiosError = e as AxiosError<ErrorResponseDto>;
      const data = axiosError.response?.data;
      if (data) {
        toast.error(data.message);
      } else {
        toast.error("Ocorreu algum erro no servidor"); 
      }
    });
  }, [user]);

  const AddFunds = useCallback(async (ammount: number) => {
    const body = {
      balance: user.balance + ammount
    };
    await axios.patch(`http://localhost:3000/user/${user.id}`, body).then((res) => {
      const newBalance = res.data.balance as number;
      setUser({...user, balance: newBalance});
      toast("Fundos adicionados");
    }).catch((e) => {
      const axiosError = e as AxiosError<ErrorResponseDto>;
      const data = axiosError.response?.data;
      if (data) {
        toast.error(data.message);
      } else {
        toast.error("Ocorreu algum erro no servidor"); 
      }
    });
  }, [user]);

  const UpdateBalance = useCallback(async (newBalance: number | null) => {
    if (newBalance) {
      user.balance = newBalance;
      setUser(user);
    } else {
      await axios.get(`http://localhost:3000/user/${user.id}`).then(res => {
        user.balance = res.data.balance;
        setUser(user);
      }).catch((e) => {
        const axiosError = e as AxiosError<ErrorResponseDto>;
        const data = axiosError.response?.data;
        if (data) {
          toast.error(data.message);
        } else {
          toast.error("Ocorreu algum erro no servidor"); 
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user: user,
      subtractFunds: SubtractFunds,
      addFunds: AddFunds,
      updateBalance: UpdateBalance,
    }}>
      {children}
    </UserContext.Provider>
  );
}
