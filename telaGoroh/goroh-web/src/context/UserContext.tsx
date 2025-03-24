"use client"

import { UserInfo } from "@/model/userInfo";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useGetInfo } from "@/hooks/userManager/GetInfoMethod/useGetInfo";

interface GetUserContext {
    user: UserInfo | null; // Alterado para um objeto, não um array
    allUser: UserInfo[] | null;
    token: string;
    login: boolean;
    confirm: boolean;
    getLoginUser: string;
    setToken: (token: string) => void;
    setUser: (data: UserInfo | null) => void; // Alterado para receber um objeto UserInfo
    setLoginUser: (user: string) => void;
    setAllUser: (user: UserInfo[] | null) => void;
    setLogin: (login: boolean) => void;
    setConfirm: (confirm: boolean) => void;
    
}

export const GetContext = createContext({} as GetUserContext);

export interface GetNode {
    children: ReactNode;
}

export const UserContextProvider: React.FC<GetNode> = ({ children }) => {
    const [login, setLogin] = useState<boolean>(false); //Caso as informações de token e email sejam validadas o fetchUser passará o login para verdadeiro, caso contrario falso fazendo com que o usuário seja encaminhado para tela inicial
    const [confirm, setConfirm] = useState<boolean>(false);
    const [user, setUser] = useState<UserInfo | null>(null); // Alterado para UserInfo | null
    const [allUser, setAllUser] = useState<UserInfo[] | null>(null);
    const [token, setToken] = useState<string>("");
    const [getLoginUser, setLoginUser] = useState<string>("");
    const { fetchUser } = useGetInfo()
    

    useEffect(() => {
        const cookEmail = Cookies.get("email");
        const cookToken = Cookies.get("token");
        if(cookEmail && cookToken){
            fetchUser(cookToken, cookEmail, setUser, setLogin);
            setToken(cookToken)
            setLoginUser(cookEmail)
            setConfirm(true)
            console.log(`Token: ${token} `)
            console.log(`User: ${getLoginUser}`)
        }else if(getLoginUser.length > 0){
            fetchUser(token, getLoginUser, setUser, setLogin);
            setConfirm(true)
            console.log(`Token: ${token} `)
            console.log(`User: ${getLoginUser}`)
        }
    }, [token, getLoginUser])

    return (
        <GetContext.Provider value={{ user, getLoginUser, token, login, allUser, setLoginUser, setToken, setUser, setLogin, setAllUser, setConfirm, confirm}}>
            {children}
        </GetContext.Provider>
    );
};
