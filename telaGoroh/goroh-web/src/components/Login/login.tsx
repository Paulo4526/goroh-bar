"use client"

import { Button, Flex, Heading} from "@radix-ui/themes";
import { Form } from "../form";
import Link from "next/link";
import { Input } from "../Input";
import { useState } from "react";
import { GetUseContext } from "@/hooks/useContext";

export const Login:React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { onSubmitLogin } = GetUseContext()
    return(
        <Form gap="8" onSubmit={onSubmitLogin}>
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
    )
}
