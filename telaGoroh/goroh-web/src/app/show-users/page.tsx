"use client"

import ErrorAlert from "@/components/errorAlert";
import { useHandle } from "@/hooks/loginHandle";
import { GetUseContext } from "@/hooks/useContext";
import { Button, Flex, Heading, Section, Table, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const ShowUsers:React.FC = () => {
    const { allUser, user, token, setAllUser } = GetUseContext()
    const { getUsers, deleteUser } = useHandle()
    const [getError, setError] = useState("")
    const [confirm, setConfirm] = useState<boolean>(false)

    useEffect(() => {
            // Verifica a role do usuário após o estado ser atualizado
            if (user?.role === "ADMIN" || user?.role === "MASTER") {
                getUsers(token, setAllUser);
                setConfirm(false)
            }
        }, [user, confirm]);

        const observerError = (getError: string) => {
            if(getError !== null || getError !== ""){
                return <ErrorAlert error={getError} setError={setError}/>
            }
        }

    return(
        <Section>
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
                                        <Button>Edit</Button>
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
        </Section>
    )
}

export default ShowUsers;