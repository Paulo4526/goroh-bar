"use client"

import { Flex, Spinner } from "@radix-ui/themes"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const Redirect = () => {
    useEffect(() => {
        setTimeout(() => {
            redirect("/index")
        }, 2000)
    },[])
    return(
        <>
            <Flex width={"100%"} justify={"center"} position={"absolute"} top={"50%"}>
            <img src="/images/spinner.svg" alt="spinner" style={{width:"50px"}}/>
            </Flex>
        </>
    )
}

export default Redirect