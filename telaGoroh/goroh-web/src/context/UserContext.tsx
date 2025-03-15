"use client"

import { User } from "@/model/user";
import { createContext, FormEvent, ReactNode, useState } from "react";

interface GetUserContext{
    user: User[],
    token: string,
    onSubmitLogin: (ev: FormEvent<HTMLFormElement>) => Promise<void>,
    onSubmitSingUp: (ev: FormEvent<HTMLFormElement>) => Promise<void>;
}

export const GetContext = createContext({} as GetUserContext);

export interface GetNode{
    children: ReactNode
}
export const UserContextProvider:React.FC<GetNode> = ({ children }) => {
    const [user, setUser] = useState<User[]>([])
    const [token, setToken] = useState<string>("")

    const onSubmitLogin =  async (ev:FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const formElement = ev.currentTarget
        const formData = new FormData(formElement)

        const email = formData.get('email')
        const password = formData.get('password')

        const res = await fetch('/goroh/auth/login', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email, password})

        })

        if (res.ok) {
            const data = await res.json(); // ✅ Pegando a resposta JSON
            if (data.token) {
                setToken(data.token); // ✅ Armazenando o token no estado
                alert(`Token Recebido, ${data.token}`);
            } else {
                console.error("Nenhum token retornado na resposta");
            }
        } else {
            console.error("Falha no login");
        }
    }
    
    const onSubmitSingUp = async (ev:FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const formElement = ev.currentTarget;
        const formData = new FormData(formElement)

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password')

        const res = await fetch('/goroh/auth/register', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({username, email, password})
        })

        if(res.ok){
            const data = await res.json()
            if(data){
                setUser(data)
                alert(`Usuario ${data.email} cadastrado com sucesso!`)
            }else{
                alert('Não foi possível adicionar o usuário!')
            }
        }else{
            console.log("Ocorreu algum erro, tente norvamente!")
        }

    }
    
    return(
        <GetContext.Provider value={{user, token, onSubmitLogin, onSubmitSingUp}}>
            {children}
        </GetContext.Provider>
    )
}