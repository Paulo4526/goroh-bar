"use client"

import GetUser from "@/components/getUsers";
import { GetUseContext } from "@/hooks/useContext";
import { Flex, Section, Spinner} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ShowUsers:React.FC = () => {
    const { login } = GetUseContext()
    const [load, setLoad] = useState<boolean>(false)
    useEffect(() => {
        setLoad(false)
        const timer = setTimeout(() => {
            if(!login){
                redirect('/login')
            }else{
                setLoad(true);
            }
        }, 2000)

        return () => {
            clearTimeout(timer)
            setLoad(true)
        }
    },[login])

    


    return(
        <Section>
            {load? (
                <GetUser/>
            ) : 
            (
                <Flex width={"100%"} justify={"center"} position={"absolute"} top={"50%"}>
                    <Spinner/>
                </Flex>
            )}
        </Section>
    )
}

export default ShowUsers;