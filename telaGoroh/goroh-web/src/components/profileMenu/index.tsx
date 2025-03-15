import { useHandle } from "@/hooks/loginHandle";
import { GetUseContext } from "@/hooks/useContext";
import { ExitIcon, GearIcon, PersonIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import Link from "next/link";

interface GetProfileItens{
    inicial:string | null
}

const ProfileMenu:React.FC<GetProfileItens> = ({inicial}) => {
    const { user, login, setLogin, setLoginUser, setUser, setToken} = GetUseContext()
    const { loginState } = useHandle()
    return(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="soft" color="red">
                    {inicial}
                    
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <Flex direction={"column"} gap={"4"}>
                        <DropdownMenu.Item>
                            <Flex justify={"between"} align={"center"} width={'100%'} gap={"5"}>
                                <Link href={`/profile`}>Profile</Link>
                                <PersonIcon />
                            </Flex>
                        </DropdownMenu.Item>
                    <DropdownMenu.Item >
                    <Flex justify={"between"} align={"center"} width={'100%'} gap={"5"}>
                        <Button variant="ghost" style={{color: "white"}}>Configuration</Button>
                        <GearIcon/>
                    </Flex>
                    </DropdownMenu.Item>
                    
                    {user?.role === "ADMIN" || user?.role === "MASTER" ? (
                        <>
                            <Flex justify={"between"} align={"center"}>
                                <DropdownMenu.Item><Link href={`/profile`}>Drinks</Link></DropdownMenu.Item><PlusIcon />
                            </Flex>
                            <Flex justify={"between"} align={"center"}>
                                <DropdownMenu.Item >Geren. Users  </DropdownMenu.Item><PersonIcon/>
                            </Flex>
                        </>
                    ) : ("")}
                    <DropdownMenu.Item onClick={() => loginState(login, setLogin, setToken, setLoginUser, setUser)} color="red">
                        <Flex justify={"between"} align={"center"} width={'100%'} gap={"5"}>
                            Sair
                            <ExitIcon />
                        </Flex>
                    </DropdownMenu.Item>
                </Flex>
            </DropdownMenu.Content>
        </DropdownMenu.Root>

    )
}

export default ProfileMenu;