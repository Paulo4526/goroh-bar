"use client"

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import ErrorAlert from "../errorAlert";
import { GetUseContext } from "@/hooks/useContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGetInfo } from "@/hooks/userManager/GetInfoMethod/useGetInfo";
import { useUpdateAndDelete } from "@/hooks/userManager/useUpdateAndDelete.ts/useUpdateAndDelete";


const GetUser:React.FC = () => {

    const { allUser, user, token, setAllUser, login } = GetUseContext()
    const { getUsers } = useGetInfo()
    const { deleteUser } = useUpdateAndDelete()
    const [getError, setError] = useState("")
    const [confirm, setConfirm] = useState<boolean>(false)

    const observerError = (getError: string) => {
        if(getError !== null && getError !== ""){
            return <ErrorAlert error={getError} setError={setError}/>
        }
    }

    useEffect(() => {
        // Verifica a role do usuário após o estado ser atualizado
        if (user?.role === "ADMIN" || user?.role === "MASTER") {
            getUsers(token, setAllUser);
            setConfirm(false)
        }
    }, [confirm, login]);


    return(

        <>
            <Flex direction={"column"} gap={"5"} align={"center"}>
                {observerError(getError)}
                <Heading as="h1">User Manager</Heading>

                    <Flex direction={"column"} gap={"2"} width={"900px"}>
                        <Flex gap={"5"} justify={"between"} align={"center"} style={{backgroundColor:"#020202d3", padding:"10px"}}>
                            <Heading as="h6" size={"3"} align={"center"} style={{width:"70px"}}>ID</Heading>
                            <Heading as="h6" size={"3"} align={"center"} style={{width:"280px"}}>NOME</Heading>
                            <Heading as="h6" size={"3"} align={"center"} style={{width:"300px"}}>EMAIL</Heading>
                            <Heading as="h6" size={"3"} align={"center"} style={{width:"100px"}}>ROLE</Heading>
                            <Heading as="h6" size={"3"} align={"center"} style={{width:"150px"}}>AÇÂO</Heading>
                        </Flex>
                        {allUser?.map((users) => (
                            <Flex  key={users.userId} gap={"5"} justify={"between"} align={"center"} style={{backgroundColor:"#020202d3", padding:"10px", borderRadius:"5px"}}>
                                <Text align={"center"} style={{width:"70px"}}><span>{users.userId}</span></Text>
                                <Text align={"center"} style={{width:"280px"}}>{users.name}</Text>
                                <Text align={"center"} style={{width:"300px"}}>{users.email}</Text>
                                <Text align={"center"} style={{width:"100px"}}>{users.role}</Text>
                                <Flex gap={"3"} justify={"center"} style={{width:"150px"}}>
                                    <Link href={`/show-users/${users.userId}`} rel="preload">
                                        <Button>Edit</Button>
                                    </Link>
                                    {user?.role === "MASTER" ? (
                                        <Button color="red" onClick={() => deleteUser(token, users.userId, setError, setConfirm)}>Delete</Button>
                                    ): ("")}
                                </Flex>
                            </Flex>
                        ))}
                    </Flex>
            </Flex>
        </>
    )
}

export default GetUser;