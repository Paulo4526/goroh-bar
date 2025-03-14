"use client"

import { Button, Flex, Heading} from "@radix-ui/themes"
import { Form } from "../form"
import { Input } from "../Input"
import Link from "next/link"
import { useState } from "react"
import { GetUseContext } from "@/hooks/useContext"

export const Singup:React.FC = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { onSubmitSingUp } = GetUseContext()
    return(
        <Form gap="7" onSubmit={onSubmitSingUp}>
            <Heading as="h1">Sing Up</Heading>
            <Input 
                name="username" 
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
    )
}