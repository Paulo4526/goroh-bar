"use client"

import { Login } from "@/components/Login/login"
import { useEffect, useState } from "react";

const LoginPage:React.FC = () => {
    const [getError, setError] = useState<string>("")
    
    useEffect(() => {
        if(getError !== null && getError !== ""){
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }, [getError])

    
    return(
        <>
            <Login error={getError} setError={setError}/>
        </>
    )
}

export default LoginPage;