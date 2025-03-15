"use client"
import { useHandle } from "@/hooks/loginHandle";
import { GetUseContext } from "@/hooks/useContext";
import { Button, Flex, Skeleton, Text } from "@radix-ui/themes"
import Link from "next/link"
import { useEffect, useState } from "react";
import ProfileMenu from "../profileMenu";

const Nav:React.FC = () => {
    const { user, login} = GetUseContext()
    const {inicialName} = useHandle()
    const [inicial, setInicial] = useState<string | null>(null)
    const [load, setLoad] = useState<boolean>(false)
    
    useEffect(() => {
        setLoad(false)
        setTimeout(() => {
            if (user) {
                inicialName(user, setInicial); // Passando o usuário e a função setInicial
                setLoad(true)
            }
        }, 4000)
    }, [user]);
      

      
    return(
        <Flex justify={"between"} px={"4"} mt={"3"} 
        style={{
            position:"sticky", top: "20px"
        }}>
            <Link href={"/index"}>
                <Text>Imagem aqui</Text>
            </Link>
            <Flex gap={"5"}>
                {user !== null ? (
                    <>
                        {load ? (
                            <ProfileMenu inicial={inicial}/>
                        ) : (<Skeleton>Loading</Skeleton>)}
                    </>
                ) : null}
                <Link href={"/login"}>
                    {
                        login === false ? 
                        (<Button variant="outline">Login</Button>) : 
                        ("")
                    }
                </Link>
                {login === false? (
                    <Link href={"/SingUp"}>
                    <Button variant="outline" color="ruby">Sing Up</Button>
                </Link>
                ) : null}
                
            </Flex>
        </Flex>
    )
}

export default Nav;