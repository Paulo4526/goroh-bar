import { UserInfo } from "@/model/userInfo";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export const userSimple = () => {

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
            redirect('/index')
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
    };


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
    return({inicialName, firstAndLastName, loginState})
}