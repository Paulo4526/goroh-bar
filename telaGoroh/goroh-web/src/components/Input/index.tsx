import { Flex, Text, TextField } from "@radix-ui/themes"
import style from "./input.module.css"

export const Input:React.FC<any> = ({...props}) => {
    return(
        <Flex direction={"column"}>
            <Text as="label" htmlFor={props.name}>{props.label}</Text>
            <TextField.Root 
                variant="soft"
                color="gray"
                radius="small"
                size={"3"}
                className={style.input}
                placeholder={props.place} 
                name={props.name} 
                id={props.name} 
                type={props.name} 
                {...(props.focus ? { autoFocus: true } : {})}
                value={props.value}
                onChange={props.onChange}
                required
                />
        </Flex>
    )
}