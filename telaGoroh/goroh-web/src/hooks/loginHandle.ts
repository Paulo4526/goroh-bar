import { UserInfo } from "@/model/userInfo";
import { redirect } from "next/navigation";
import { FormEvent } from "react";

export const useHandle = () => {

  const loginState = (
    login: boolean,
    setLogin: (state: boolean) => void,
    setToken: (token: string) => void,
    setUserName: (userName: string) => void,
    setUser: (user: UserInfo | null) => void
  ) => {
    if (login) {
      setLogin(false);
      setToken("");
      setUserName(""); // Pode não ser necessário, já que 'userName' não é um estado em GetUseContext
      setUser(null);
      redirect('/login')
    }
  };

  const inicialName = (user: UserInfo | null, setInicial: (inicial: string) => void) => {
    if (user && user.name) {
      const nomeCompleto = user.name;
      const partes = nomeCompleto.trim().split(" ");

      const obterIniciais = (nome: string) => {
        if (partes.length > 1) {
          return partes[0][0].toUpperCase() + partes[1][0].toUpperCase();
        } else {
          return partes[0][0].toUpperCase();
        }
      };

      setInicial(obterIniciais(nomeCompleto));
    }
  };


  const fetchUser = async (token: string, getLoginUser: string, setUser: (user: UserInfo | null) => void, setLogin: (login: boolean) => void) => {
    const response = await fetch(`/goroh/user?email=${getLoginUser}`, {
        headers: {"Content-Type" : "application/json", 'Authorization': `Bearer ${token}`}
    })
    const data = await response.json()
    console.log(data);
    setUser(data);
    setLogin(true);
}


  const onSubmitLogin = async (
    ev: FormEvent<HTMLFormElement>,
    setToken: (token: string) => void,
    setLoginUser: (username: string) => void
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

      if (res.ok) {
        const data = await res.json();
        setLoginUser(email);

        if (data.token) {
          setToken(data.token);
          // Navega para a página desejada após o login bem-sucedido
          redirect('/index')
        } else {
          console.error("Nenhum token retornado na resposta");
        }
      } else {
        console.error("Falha no login");
      }
    } else {
      console.error("Email ou senha inválidos");
    }
  };

  const onSubmitSingUp = async (
    ev: FormEvent<HTMLFormElement>,
    setUser: (data: any) => void
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

    if (res.ok) {
      const data = await res.json();
      setUser(data);
      redirect('/login')
    } else {
      console.error("Falha ao cadastrar usuário");
    }
  };

  return { onSubmitLogin, onSubmitSingUp, loginState, inicialName, fetchUser };
};
