import { Flex, Section } from "@radix-ui/themes"
import { ReactNode } from "react"

interface getProps {
    children:ReactNode,
    [key: string]: any;
}

export const Form:React.FC<getProps> = ({ children, ...props }) => {
    return(
        <Flex justify={"center"} align={"center"} height={"85vh"}>
            <form onSubmit={props.onSubmit} style={{ padding:"30px", width:"450px", backgroundColor:"#020202d3", borderRadius:"10px"}}>
                <Flex direction={"column"} align={"center"} justify={"center"} gap={props.gap}>
                    {children}
                </Flex>
            </form>
        </Flex>
    )
}

