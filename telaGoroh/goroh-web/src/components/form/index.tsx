import { Flex, Section } from "@radix-ui/themes"
import { ReactNode } from "react"

interface getProps {
    children:ReactNode,
    [key: string]: any;
}

export const Form:React.FC<getProps> = ({ children, ...props }) => {
    return(
        <Section>
            <form onSubmit={props.onSubmit} style={{margin:"auto", height:"80vh"}}>
                <Flex direction={"column"} align={"center"} justify={"center"} gap={props.gap}>
                    {children}
                </Flex>
            </form>
        </Section>
    )
}

