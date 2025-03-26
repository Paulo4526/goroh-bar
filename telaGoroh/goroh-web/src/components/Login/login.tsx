"use client"

import { Button, Flex, Heading, Skeleton, Text} from "@radix-ui/themes";
import { Form } from "../form";
import Link from "next/link";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { GetUseContext } from "@/hooks/useContext";
import Style from "./login.module.css"
import { useLoginHandle } from "@/hooks/userManager/LoginAndSign/useLoginHandle";
import { setTimeout } from "timers";
import { redirect } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setToken, setLoginUser, login} = GetUseContext()
    const { onSubmitLogin } = useLoginHandle()
    const [load, setLoad] = useState<boolean>(false)
    const [getError, setError] = useState<string>("")
    
    useEffect(() => {
        if(!load){
            setTimeout(() => {
                setLoad(true)
            }, 2000)
        } 
        if(getError !== null && getError !== ""){
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }, [getError])

    

    return(
        <>
            {load ? (
                <Form gap="8" onSubmit={(ev: FormEvent<HTMLFormElement>) => onSubmitLogin(ev, setToken, setLoginUser, setError)}>
                        <Heading as="h1">LOGIN</Heading>
                        {getError !== null && getError !== "" ? (
                            <Text className={Style.error}>{getError}</Text>
                        ) : ""}
                        <Input 
                            name="email" 
                            type="email" 
                            label="Email" 
                            place="Ex: aaaa@aaa.com" 
                            value={email} 
                            onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
                        />
                        <Input 
                            name="password" 
                            type="password" 
                            label="Password" 
                            place="**********" 
                            value={password} 
                            onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}
                        />
                        <Flex gap={"4"} justify={"center"}>
                            <Button variant="outline">Enter</Button>
                            <Link href={"#"}><Button variant="soft" color="orange">Back</Button></Link>
                        </Flex>
                </Form>

            ) : (
                <Flex direction={"column"} gap={"9"} justify={"center"} align={"center"} style={{marginTop:"90px"}}>
                    <Skeleton width={"200px"} height={"30px"}>Loading</Skeleton>
                    <Flex direction={"column"} gap={"2"}>
                        <Skeleton width={"40px"} height={"20px"}>Loading</Skeleton>
                        <Skeleton width={"400px"} height={"30px"}>Loading</Skeleton>

                    </Flex>
                    <Flex direction={"column"} gap={"2"}>
                        <Skeleton width={"40px"} height={"20px"}>Loading</Skeleton>
                        <Skeleton width={"400px"} height={"30px"}>Loading</Skeleton>

                    </Flex>
                    <Flex justify={"between"} gap={"4"}>
                        <Skeleton width={"50px"} height={"30px"}>Loading</Skeleton>
                        <Skeleton width={"50px"} height={"30px"}>Loading</Skeleton>
                    </Flex>
                </Flex>
            )}
        </>
    )
}

export default Login;
