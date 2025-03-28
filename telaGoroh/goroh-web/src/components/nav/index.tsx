"use client"

import { Button, Flex, Skeleton, Text } from "@radix-ui/themes"
import Link from "next/link"
import ProfileMenu from "../profileMenu";
import { useEffect, useState } from "react";
import { UserInfo } from "@/model/userInfo";
import { userSimple } from "@/hooks/userManager/userSimple/userSimple";

interface GetInfo{
    user: UserInfo | null;
    getLogin: boolean;
}

const Nav:React.FC<GetInfo> = ({getLogin, user}) => {
    const { inicialName, firstAndLastName } = userSimple()
    const [inicial, setInicial] = useState<string | null>(null)
    const [getFirstAndLast, setFirstAndLast]= useState<string | null>(null)
    const [load, setLoad] = useState<boolean>(false)

    useEffect(() => {
        setLoad(false)
        setTimeout(() => {
            if(getLogin) {
                inicialName(user, setInicial)
                firstAndLastName(user, setFirstAndLast)
                setLoad(true)
            }else{
                setLoad(false)
            }
        }, 1000)
    },[getLogin])

    return(
        <>
            <Flex gap={"5"}>
                { getLogin ? (
                    <>
                        {load ? (
                            <ProfileMenu inicial={inicial} name={getFirstAndLast}/>
                        ) : (<Skeleton style={{height:"20px", width:"20px"}}>Loading</Skeleton>)}
                    </>
                ) : (
                    <Flex gap={"5"} align={"center"}>
                        <Link href={"/login"}><Button variant="soft">Login</Button></Link>
                        <Link href={"/SingUp"}><Button variant="soft" color="purple">SingUp</Button></Link>
                    </Flex>
                )}
                
            </Flex>
        </>
    )
}

export default Nav;