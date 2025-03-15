"use client"

import { Button, Flex, Heading, Section, Skeleton} from "@radix-ui/themes";
import { Form } from "../form";
import Link from "next/link";
import { Input } from "../Input";
import { FormEvent, useEffect, useState } from "react";
import { GetUseContext } from "@/hooks/useContext";
import { useHandle } from "@/hooks/loginHandle";

export const Login:React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setToken, setLoginUser} = GetUseContext()
    const { onSubmitLogin } = useHandle()
    const [load, setLoad] = useState<boolean>(false)

    useEffect(() => {
        setLoad(false)
        setTimeout(() => {
            setLoad(true)
        }, 4000)
    }, [])
    

    return(

        <Section>
            {load ? (
                <Form gap="8" onSubmit={(ev: FormEvent<HTMLFormElement>) => onSubmitLogin(ev, setToken, setLoginUser)}>
                        <Heading as="h1">LOGIN</Heading>
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
                    <Skeleton width={"200px"} height={"20px"}>Loading</Skeleton>
                    <Flex direction={"column"} gap={"2"}>
                        <Skeleton width={"40px"} height={"20px"}>Loading</Skeleton>
                        <Skeleton width={"400px"} height={"20px"}>Loading</Skeleton>

                    </Flex>
                    <Flex direction={"column"} gap={"2"}>
                        <Skeleton width={"40px"} height={"20px"}>Loading</Skeleton>
                        <Skeleton width={"400px"} height={"20px"}>Loading</Skeleton>

                    </Flex>
                    <Flex justify={"between"} gap={"4"}>
                        <Skeleton width={"50px"} height={"20px"}>Loading</Skeleton>
                        <Skeleton width={"50px"} height={"20px"}>Loading</Skeleton>
                    </Flex>
                </Flex>
            )}
                
        </Section>
    )
}
