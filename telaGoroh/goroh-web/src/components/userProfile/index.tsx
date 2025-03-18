import { UserInfo } from "@/model/userInfo";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

interface GetUser{
    user: UserInfo | null
}

const UserProfile:React.FC<GetUser> = ({user}) => {
    return(
        <Flex direction={"column"} align={"center"} gap={"4"}>
            <Heading>{user?.name}: #{user?.userId}</Heading>
            <Flex justify={"between"} gap={"3"}>
                <Link href={'#'}><Button>Meus Pedidos</Button></Link>
                <Link href={'#'}><Button>Lista de Desejos</Button></Link>
                <Link href={'#'}><Button>SAC <ChatBubbleIcon /></Button></Link>
            </Flex>
        </Flex>
    )
}

export default UserProfile;