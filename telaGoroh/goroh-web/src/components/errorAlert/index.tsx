"use client"

import { Dialog, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface GetError{
    error: string | undefined;
    setError: (error:string) => void
}

const ErrorAlert: React.FC<GetError> = ({ error, setError }) => {
    const [open, setOpen] = useState(false);
  
    useEffect(() => {
      if (error) {
        setOpen(true);
      }
    }, [error]);
  
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content>
            <Flex direction={"column"} gap={"4"}>
                <Dialog.Title>Error</Dialog.Title>
                <Text>{error}</Text>
            </Flex>
            <Dialog.Close style={{marginTop: "20px"}}>
                <button onClick={() => setError("")} style={{padding:"5px 10px"}} color="red">Fechar</button>
            </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    );
  };
  
  export default ErrorAlert;