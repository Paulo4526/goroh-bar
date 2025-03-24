"use client"
import { GetUseContext } from "@/hooks/useContext";
import { Form } from "../form";
import { FormEvent, useEffect, useState } from "react";
import { Button, Flex, Heading, Select} from "@radix-ui/themes";
import { Input } from "../Input";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useGetInfo } from "@/hooks/userManager/GetInfoMethod/useGetInfo";
import { useUpdateAndDelete } from "@/hooks/userManager/useUpdateAndDelete.ts/useUpdateAndDelete";

interface EditUser{
    id: number | null
}


const UpdateUser:React.FC<EditUser> = ({id}) => {
    const { token } = GetUseContext()
    const { getUserById } = useGetInfo()
    const { updateUser } =useUpdateAndDelete()
    const [name, setName] = useState<string | undefined>(undefined)
    const [email, setEmail] = useState<string | undefined>(undefined)
    const [role, setRole] = useState<string | undefined>(undefined)
    const [password, setPassword] = useState("")
    const [load, setLoad] = useState<boolean>(false);
    
    useEffect(() => {
        setLoad(false)
        getUserById(token, id, setName, setEmail, setRole)
        const timer = setTimeout(() => {
            if(!name && !email && !role){
                redirect('/show-users')
            }else{
                setLoad(true)
            }
        }, 2000)
        return () => {
            clearTimeout(timer)
            setLoad(true)
        }
    },[name])


    return(
            <>
                {load ? (
                    <Form onSubmit={(ev: FormEvent<HTMLFormElement>) => updateUser(id, token, ev)} gap={"5"}>
                        <Heading>#{id}</Heading>
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

                        <Select.Root>
                            <Select.Trigger placeholder={role} radius="medium" />
                            <Select.Content position="popper">
                                <Select.Group>
                                    <Select.Label>USERS</Select.Label>
                                    <Select.Item value="master">MASTER</Select.Item>
                                    <Select.Item value="admin">ADMIN</Select.Item>
                                    <Select.Item value="user">USER</Select.Item>
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                        <Flex gap={"4"} justify={"center"}>
                            <Button variant="outline">Sing Up</Button>
                            <Link href={"/show-users"}><Button variant="soft" color="orange">Back</Button></Link>
                        </Flex>
                </Form>
            ): (
                null
            )}
        </>
    )
}

export default UpdateUser;