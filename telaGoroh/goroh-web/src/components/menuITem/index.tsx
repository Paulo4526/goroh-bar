import { BackpackIcon, ExitIcon, GearIcon, PersonIcon, PlayIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { Responsive, Union } from "@radix-ui/themes/props";

interface GetItems {
    name?: string | null;
    content?: string | null;
    color?: "ruby" | "blue" | "brown" | "crimson" | "cyan" | "gold" | "gray" | "green" | "indigo" | "lime" | "orange" | "pink" | "plum" | "purple" | "red" | "teal" | "tomato" | "violet" | "yellow" | undefined
    icon?: string | null;
    active?: string | null;
    size?: Responsive<"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"> | undefined;
    id?: string | null;
    email?: string | null;
    justify?: "center" | "start" | "end" | "between" | undefined;
    align?: "center" | "start" | "end" | "baseline" | "stretch" | undefined;
    width?: Responsive<string> | undefined;
    gap?: Responsive<string> | undefined;
    px?: Responsive<Union<string, "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">> | undefined;
    onclick?: () => void;
}

const NewItem: React.FC<GetItems> = ({ name, icon, active, id, email, justify, align, width, gap, px, size, content, onclick, color }) => {
    const renderIcon = () => {
        switch (icon) {
            case "person":
                return <PersonIcon />;
            case "gear":
                return <GearIcon />;
            case "plus":
                return <PlayIcon />;
            case "exit":
                return <ExitIcon />;
            case "bag":
                return <BackpackIcon/>
            case "star":
                return <StarFilledIcon/>
            default:
                return null;
        }
    };

    return (
        <>
            {active === "active" ? (
                <DropdownMenu.Item
                    onClick={onclick}
                    color={color}
                >
                    <Flex justify={justify} align={align} width={width} gap={gap}>
                        <Text style={{color:`${icon === "exit" ? "white" : color}`}}>{content}</Text>
                        {renderIcon()}
                    </Flex>
                </DropdownMenu.Item>
            ) : (
                <Flex justify={justify} align={align} width={width} px={px}>
                    {email && email !== "" ? (
                        <Text size={size}>{email}</Text>
                    ) : (
                        <>
                            <Text>{name}</Text>
                            <Text>#{id}</Text>
                        </>
                    )}
                </Flex>
            )}
        </>
    );
};

export default NewItem;
