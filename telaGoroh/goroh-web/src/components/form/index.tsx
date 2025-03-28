import { Flex, Section } from "@radix-ui/themes"
import { ReactNode } from "react"

interface getProps {
    children:ReactNode,
    [key: string]: any;
}

export const Form:React.FC<getProps> = ({ children, ...props }) => {
    return(
        <>
            <form onSubmit={props.onSubmit} style={{margin:"auto", padding:"30px", width:"450px", backgroundColor:"#020202d3", borderRadius:"10px"}}>
                <Flex direction={"column"} align={"center"} justify={"center"} gap={props.gap}>
                    {children}
                </Flex>
            </form>
        </>
    )
}

