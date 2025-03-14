import { GetContext } from "@/context/UserContext"
import { useContext } from "react"

export const GetUseContext = () => {
    return useContext(GetContext)
}