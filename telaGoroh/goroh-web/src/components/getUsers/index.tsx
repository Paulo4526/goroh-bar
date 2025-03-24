"use client"

import { Button, Flex, Heading, Table } from "@radix-ui/themes";
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
                <Table.Root size={"3"} layout={"auto"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {allUser?.map((allUser) => (
                            <Table.Row key={allUser.userId} align={"center"}>
                                <Table.RowHeaderCell >{allUser.userId}</Table.RowHeaderCell>
                                <Table.Cell >{allUser.name}</Table.Cell>
                                <Table.Cell >{allUser.email}</Table.Cell>
                                <Table.Cell >{allUser.role}</Table.Cell>
                                <Table.Cell>
                                    <Flex align={"center"} gap={"3"}>
                                        <Link href={`show-users/${allUser.userId}`} rel="preload">
                                            <Button>Edit</Button>
                                        </Link>
                                        {user?.role === "MASTER" ? (
                                            <Button color="red" onClick={() => deleteUser(token, allUser.userId, setError, setConfirm)}>Delete</Button>
                                        ) : ""}
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        </>
    )
}

export default GetUser;