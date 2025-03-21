"use client"

import { Button, Flex, Heading, Section, Skeleton} from "@radix-ui/themes"
import { Form } from "../form"
import { Input } from "../Input"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import { GetUseContext } from "@/hooks/useContext"
import { useHandle } from "@/hooks/loginHandle"
import Cookies from "js-cookie";
import { redirect } from "next/navigation"

export const Singup:React.FC = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = GetUseContext()
    const { onSubmitSingUp } = useHandle()
    const [load, setLoad] = useState<boolean>(false)
    const cookEmail = Cookies.get("email");
    const cookToken = Cookies.get("token");
    
        useEffect(() => {
            setLoad(false)
            setTimeout(() => {
                setLoad(true)
            }, 2000)
        }, [])
    return(
        <Section>
            <></>
            {cookEmail && cookToken ? (redirect(`/index`)) : (
                <>
                    {load ? (
                <Form gap="7" onSubmit={(ev:FormEvent<HTMLFormElement>) => onSubmitSingUp(ev)}>
                    <Heading as="h1">Sing Up</Heading>
                    <Input 
                        name="name" 
                        type="text" 
                        label="Name" 
                        place="Ex: Paulo Bueno" 
                        value={name}
                        onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
                        focus
                    />
                    <Input 
                        name="email" 
                        type="email" 
                        label="Email" 
                        place="Ex: aaaa@aaa.com"
                        value={email}
                        onChange={(ev:React.ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value) }
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
                        <Button variant="outline">Sing Up</Button>
                        <Link href={"/"}><Button variant="soft" color="orange">Back</Button></Link>
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
                </>
        )}
            
        </Section>
    )
}