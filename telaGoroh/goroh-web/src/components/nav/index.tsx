import { Button, Flex, Text } from "@radix-ui/themes"
import Link from "next/link"

const Nav:React.FC = () => {
    return(
        <Flex justify={"between"} px={"4"} mt={"3"} 
        style={{
            position:"sticky", top: "15px"
        }}>
            <Link href={"/"}>
                <Text>Imagem aqui</Text>
            </Link>
            <Flex gap={"5"}>
                <Link href={"/login"}>
                    <Button variant="outline">Login</Button>
                </Link>
                <Link href={"/SingUp"}>
                    <Button variant="outline" color="ruby">Sing Up</Button>
                </Link>
            </Flex>
        </Flex>
    )
}

export default Nav;