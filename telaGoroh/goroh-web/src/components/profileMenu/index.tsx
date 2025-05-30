
import { GetUseContext } from "@/hooks/useContext";
import { Button, DropdownMenu, Flex} from "@radix-ui/themes";
import { redirect } from "next/navigation";
import NewItem from "../menuITem";
import { userSimple } from "@/hooks/userManager/userSimple/userSimple";

interface GetProfileItens{
    inicial:string | null,
    name: string | null
}

const ProfileMenu:React.FC<GetProfileItens> = ({inicial, name}) => {
    const { user, login, setLogin, setLoginUser, setUser, setToken, token} = GetUseContext()
    const { loginState } = userSimple()
    return(
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant="solid" color="red">
                    {inicial}
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <Flex direction={"column"} gap={"4"}>

                    <NewItem justify="between" align="center" width="100%" px="2" name={name} id={`${user?.userId}`}/>
                    <NewItem justify="center" width="100%" px="2" email={`${user?.email}`} size="2"/>
                    <NewItem active="active" onclick={() => redirect(`/profile`)}  justify="between" align="center" width={"100%"} gap={"5"} icon={"person"} content={"Profile"}/>
                    <NewItem active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"gear"} content={"Configuration"}/>
                    <NewItem active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"bag"} content={"Meus Pedidos"}/>
                    <NewItem active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"star"} content={"Lista de Desejos"}/>

                    {user?.role === "ADMIN" || user?.role === "MASTER" ? (
                        <>
                            <NewItem onclick={() => redirect('/show-users')} active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"person"} content={"Usuarios"}/>
                            <NewItem active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"plus"} content={"Drinks"}/>
                            <NewItem active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"person"} content={"Geren. Users"}/>
                        </>
                    ) : ("")}


                    <NewItem onclick={() => loginState(login, setLogin, setToken, setLoginUser, setUser)} active="active" justify="between" align="center" width={"100%"} gap={"5"} icon={"exit"} content={"Sair"} color="red"/>
                </Flex>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default ProfileMenu;