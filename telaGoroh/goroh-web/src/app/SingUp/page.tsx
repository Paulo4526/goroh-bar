"use client"

import { Singup } from "@/components/SingUp"
import { GetUseContext } from "@/hooks/useContext";
import { Flex, Section } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const SingupPage:React.FC = () => {
    const {login} = GetUseContext()
    const [load, setLoad] = useState<boolean>(false)
    useEffect(() => {
        setLoad(false)
        const timer = setTimeout(() => {
            if(login){
                redirect('/index')
            }else{
                setLoad(true)
            }
        }, 4000)
        return () => {
            clearTimeout(timer)
            setLoad(true)
        }
    }, [login])
    return(
        <Section>
            {load ? (
                <Singup/>
            ) : (
                <Flex width={"100%"} justify={"center"} position={"absolute"} top={"50%"}>
                    <img src="/images/spinner.svg" alt="spinner" style={{width:"50px"}}/>
                </Flex>
            )}
        </Section>
    )
}

export default SingupPage;