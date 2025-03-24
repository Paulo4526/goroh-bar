import { redirect } from "next/navigation";
import { FormEvent } from "react";
import Cookies from "js-cookie";

export const useLoginHandle = () => {

    const onSubmitSingUp = async (

        ev: FormEvent<HTMLFormElement>

        ) => {
        ev.preventDefault();

        const formElement = ev.currentTarget;
        const formData = new FormData(formElement);

        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");

        const res = await fetch("/goroh/user/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.status === 201) {
            redirect('/login')
        } else if(res.status === 403){
            console.error("Falha ao cadastrar usuário, certifique-se que todos os campos estão preenchidos corretamente!");
        } else if(res.status === 404){
            console.log(`Serviço indisponível no momento, por favor tente mais tarde!`)
        }else if(res.status === 500){
            console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
        }
        };


        const onSubmitLogin = async (
        
            ev: FormEvent<HTMLFormElement>,
            setToken: (token: string) => void,
            setLoginUser: (username: string) => void,
            setError: (error: string) => void
        
        ) => {
        ev.preventDefault();

        const formElement = ev.currentTarget;
        const formData = new FormData(formElement);
        const email = formData.get("email");
        const password = formData.get("password");

        if (typeof email === "string" && typeof password === "string") {
            // Realiza a requisição para login
            const res = await fetch("/goroh/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            });

            if (res.status === 200) {

            const data = await res.json();
            setLoginUser(email);
            setToken(data.token);

            Cookies.set("email", email, {
                expires: 7, // Expira em 7 dias
                path: "/",  // Acessível em todo o site
                secure: process.env.NODE_ENV === "production", // Só em HTTPS
                sameSite: "Strict",  // Evita o envio entre sites
            });
            
            Cookies.set("token", data.token, {
                expires: 7, // Expira em 7 dias
                path: "/",  // Acessível em todo o site
                secure: process.env.NODE_ENV === "production", // Só em HTTPS
                sameSite: "Strict",  // Evita o envio entre sites
            });

            redirect('/index')

            } else if(res.status === 500) {

            setError("Servidor indisponível no momento, tente mais tarde!")
            console.error(`Erro: ${res.status}`);

            }else if(res.status === 403){

            setError("Email ou senhas inválidos, tente novamente!")
            console.error(`Error: ${res.status}`)

            }else if(res.status === 404){

            setError("Erro ao realizar login, por favor tente mais tarde!")
            console.error(`Error: ${res.status}`)

            }else if(res.status === 500){
            console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
            }
        } else {
            setError("Erro: Por favor tenha certeza que o formato de e-mail esteja correto!")
            console.error("Erro de validaçao!");
        }
    };
    
    return({ onSubmitLogin, onSubmitSingUp })
}