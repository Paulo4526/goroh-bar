"use client"

import { GetUseContext } from "@/hooks/useContext";
import { Flex, Heading, Section, Text } from "@radix-ui/themes";

const Profile:React.FC = () => {
    const { user } = GetUseContext()
    return(
        <Section>
            <Flex direction={"column"} gap={"3"} justify={"center"} align={"center"}>
                <Heading as="h2" size={"5"}>{user?.name}</Heading>
                <Text>Email: {user?.email}</Text>
                <Text>Tipo de usuario: {user?.role}</Text>

            </Flex>
        </Section>
    )
}

export default Profile;