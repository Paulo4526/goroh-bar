import { UserInfo } from "@/model/userInfo";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import Cookies from "js-cookie";
export const useHandle = () => {

  // -------------------------------- loginState ---------------------------------------------
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
      setUserName("");
      setUser(null);
      Cookies.remove("email");
      Cookies.remove("token");
      redirect('/login')
    }
  };

  // -------------------------------- firstAndLastName ---------------------------------------------
  const firstAndLastName  = (user: UserInfo | null, setFirstAndLastName: (name: string) => void) => {
    if(user && user.name){
      const nomeCompleto = user.name;

      const getNameAndLAst = (nome: string) => {


        const partes = nome.trim().split(" ");
        if (partes.length >= 0) {

            return "";

        }else{

          return partes[0].toUpperCase() + " " + partes[partes.length -1].toUpperCase()

        }

      }
      setFirstAndLastName(getNameAndLAst(nomeCompleto))
    }
  }


  // -------------------------------- IinicialName ---------------------------------------------
  const inicialName = (user: UserInfo | null, setInicial: (inicial: string) => void) => {
    if (user && user.name) {

      const nomeCompleto = user.name;
      
      const obterIniciais = (nome: string) => {

        const partes = nome.trim().split(" ");

        if (partes.length > 1) {

          return partes[0][0].toUpperCase() + partes[partes.length - 1][0].toUpperCase();

        } else {

          return partes[0][0].toUpperCase();

        }
      };

      setInicial(obterIniciais(nomeCompleto));
    }
  };

// -------------------------------- GetUser ---------------------------------------------
  const fetchUser = async (

      token: string, 
      getLoginUser: string, 
      setUser: (user: UserInfo | null) => void, 
      setLogin: (login: boolean) => void

    ) => {
    const res = await fetch(`/goroh/user/byEmail?email=${getLoginUser}`, {
        headers: {"Content-Type" : "application/json", 'Authorization': `Bearer ${token}`}
    })
    if(res.status === 200){
      const data = await res.json()
      console.log(data);
      setUser(data);
      setLogin(true);
    }else if(res.status === 403){
      console.log(`Ação não permitida, verifique se suas credenciais estão corretas para acessar o serviço!`)
    }else if (res.status === 404){
      console.log(`Serviço indisponível no momento, por favor tente mais tarde!`)
    }else if (res.status === 500){
      console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
    }

}

// -------------------------------- GetAllUsers ---------------------------------------------
const getUsers = async (

    token: string, 
    setAllUser: (user: UserInfo[] | null) => void
  
  ) => {
  const res = await fetch(`/goroh/user/userList`, {
      headers: {"Content-Type" : "application/json", 'Authorization': `Bearer ${token}`}
  })
  if(res.status === 200){
    const data = await res.json()
    setAllUser(data.content);
  }else if(res.status === 403){
    console.log(`Ação não permitida, verifique se suas credenciais estão corretas para acessar o serviço!`)
  }else if (res.status === 404){
    console.log(`Serviço indisponível no momento, por favor tente mais tarde!`)
  }else if (res.status === 500){
    console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
  }
}


  // -------------------------------- Login ---------------------------------------------
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


  // -------------------------------- SingUp ---------------------------------------------
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

  // -------------------------------- Delete ---------------------------------------------
  const deleteUser = async (
    
      token: string, 
      id:number, 
      setError: (error: string) => void, 
      setConfirm: (confirm: boolean) => void
    
    ) => {
    const res = await fetch(`/goroh/user/delete?id=${id}`, {
    method: "DELETE",
    headers: {"Content-Type" : "application/json", 'Authorization': `Bearer ${token}`},
  })
  if(res.status === 204){
    setConfirm(true)
    redirect(`/show-users`)
  }else if(res.status === 403){
    setError("Ação não autorizada, solicite apoio a um usuário MASTER!")
  }else if(res.status === 404){
    setError("Usuário não encontrado! Verifique o Banco de Dados.")
  }else if (res.status === 500){
    console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
  }else{
    setError("Erro na requição tente novamente mais tarde")
    console.log(`Erro: ${res.status}`)
  }
}




  return { onSubmitLogin, onSubmitSingUp, loginState, inicialName, fetchUser, firstAndLastName, getUsers, deleteUser };
};
