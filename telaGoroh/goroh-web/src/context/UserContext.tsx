"use client"

import { useHandle } from "@/hooks/loginHandle";
import { UserInfo } from "@/model/userInfo";
import { createContext, ReactNode, useEffect, useState } from "react";

interface GetUserContext {
    user: UserInfo | null; // Alterado para um objeto, não um array
    token: string;
    getLoginUser: string;
    setToken: (token: string) => void;
    setUser: (data: UserInfo | null) => void; // Alterado para receber um objeto UserInfo
    setLoginUser: (user: string) => void;
    setLogin: (login: boolean) => void;
    login: boolean
}

export const GetContext = createContext({} as GetUserContext);

export interface GetNode {
    children: ReactNode;
}

export const UserContextProvider: React.FC<GetNode> = ({ children }) => {
    const [login, setLogin] = useState<boolean>(false)
    const [user, setUser] = useState<UserInfo | null>(null); // Alterado para UserInfo | null
    const [token, setToken] = useState<string>("");
    const [getLoginUser, setLoginUser] = useState<string>("");
    const { fetchUser } = useHandle()
    

    useEffect(() => {
        if(getLoginUser.length > 0){
            fetchUser(token, getLoginUser, setUser, setLogin);
        }
    }, [token, getLoginUser])



    return (
        <GetContext.Provider value={{ user, getLoginUser, token, login, setLoginUser, setToken, setUser, setLogin}}>
            {children}
        </GetContext.Provider>
    );
};
