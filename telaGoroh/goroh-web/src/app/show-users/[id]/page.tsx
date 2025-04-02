"use client"
import UpdateUser from "@/components/updateUser"
import { GetUseContext } from "@/hooks/useContext"
import { Flex, Section, Spinner } from "@radix-ui/themes"
import { redirect, useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const ShowUser = () => {
    const {login} = GetUseContext()
    const[load, setLoad] = useState<boolean>(false)
    const params = useParams()
    const id = params.id
    useEffect(() => {
        const timer = setTimeout(() => {
            if(!login){
                redirect('/login')
            }else{
                setLoad(true)
            }
        }, 2000)
        return () => {
            clearTimeout(timer)
            setLoad(true)
        }
    })

    return(
        <>
            {load ? (
                <UpdateUser id ={Number(id)}>
                </UpdateUser>
            ) : (
                <Flex width={"100%"} justify={"center"} position={"absolute"} top={"50%"}>
                    <img src="/images/spinner.svg" alt="spinner" style={{width:"50px"}}/>
                </Flex>
            )}
        </>


    )
}

export default ShowUser