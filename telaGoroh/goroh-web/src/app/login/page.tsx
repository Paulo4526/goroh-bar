"use client"

import Login from "@/components/Login/login";
import { GetUseContext } from "@/hooks/useContext";
import { Flex} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage:React.FC = () => {
    const [load, setLoad] = useState<boolean>(false)
    const {login} = GetUseContext()
    useEffect(() => {
        setLoad(false)
        const timer = setTimeout(() => {
            if(login){
                redirect('/index')
            }else{
                setLoad(true)
            }
        }, 2000)
        return () => {
            clearTimeout(timer)
            setLoad(true)
        }

    }, [login])
    
    return(
        <>
            {load ? (
                    <Login />        
            ) : (
            <Flex width={"100%"} justify={"center"} position={"absolute"} top={"50%"} style={{backgroundColor:"transparent"}}>
                <img src="/images/spinner.svg" alt="spinner" style={{width:"50px"}}/>
            </Flex>
        )}
        </>
    )
}

export default LoginPage;