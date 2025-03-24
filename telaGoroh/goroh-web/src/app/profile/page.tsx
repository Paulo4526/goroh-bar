"use client"

import UserProfile from "@/components/userProfile";
import { GetUseContext } from "@/hooks/useContext";
import { Flex, Section, Spinner} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Profile:React.FC = () => {
    const { user } = GetUseContext()
    const[load, setLoad] = useState<boolean>(false)
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if(!user){
                redirect('/login')
            }else{
                setLoad(true)
            }
        }, 2000)
        return () => {
            clearTimeout(timer)
            setLoad(true)
        }
    },[user])

    return(
        <Section>

            {load ? (
                <>
                    <UserProfile user={user} />
                </>
            ) : (
                <Flex width={"100%"} justify={"center"} position={"absolute"} top={"50%"}>
                    <Spinner/>
                </Flex>
            )}

        </Section>
    )
}

export default Profile;