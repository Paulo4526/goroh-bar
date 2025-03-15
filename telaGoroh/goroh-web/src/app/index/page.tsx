"use client"

import { GetUseContext } from "@/hooks/useContext"
import { Flex, Heading } from "@radix-ui/themes"

const Index:React.FC = () => {
    const { user } = GetUseContext()
    return(
        <>
            {user !== null || "" ? (
                <Flex direction={"column"} gap={"3"}>
                <Heading as="h1">{user?.name}</Heading>
            </Flex>
            ) : ("")}
        </>
        
    )
}

export default Index;