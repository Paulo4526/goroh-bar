import { UserInfo } from "@/model/userInfo";
import { redirect } from "next/navigation";


export const useGetInfo = () => {

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
            setLogin(false);
            console.log(`Ação não permitida, verifique se suas credenciais estão corretas para acessar o serviço!`)
        }else if (res.status === 404){
            setLogin(false);
            console.log(`Serviço indisponível no momento, por favor tente mais tarde!`)
        }else if (res.status === 500){
            setLogin(false);
            console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
        }
    }

    const getUserById = async (

        token: string, 
        id: number | null, 
        setName: (name: string) => void,
        setEmail: (email: string) => void,
        setRole: (role: string) => void

    ) => {
            const res = await fetch(`/goroh/user/byId?id=${id}`, {
            headers: {"Content-Type" : "application/json", 'Authorization': `Bearer ${token}`}
        })
            if(res.status === 200){
                const data = await res.json()
                console.log(data);
                setName(data.name);
                setEmail(data.email);
                setRole(data.role);
            }else if(res.status === 403){
                console.log(`Ação não permitida, verifique se suas credenciais estão corretas para acessar o serviço!`)
            }else if (res.status === 404){
                console.log(`Serviço indisponível no momento, por favor tente mais tarde!`)
            }else if (res.status === 500){
                console.log(`Ops! Surgiu um problema! Estamos trabalhando na solução, tente novamente mais tarde!`)
            }
    }

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

    return({fetchUser, getUserById, getUsers})
}