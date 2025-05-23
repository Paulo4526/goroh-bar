"use client"

import "@radix-ui/themes/styles.css";
import { Flex, Theme } from "@radix-ui/themes";
import Nav from "@/components/nav";
import { UserContextProvider } from "@/context/UserContext";
import { GetUseContext } from "@/hooks/useContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image"
import Style from "./style.module.css"


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body>
        <Theme appearance="dark"
        style={{ 
          backgroundImage: "url('/images/goroh_back.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          }}
        >
          <UserContextProvider>
            <GetNav />
            {children}
          </UserContextProvider>
        </Theme>
      </body>
    </html>
  );
}

const GetNav = () => {
  const { login, user} = GetUseContext()
  const [load, setLoad] = useState(false)


  useEffect(() => {
    setLoad(false)
    setTimeout(() => {
      if(user){
        setLoad(true)
      }else{
        setLoad(true)
      }
    }, 2000)
  },[user])
  return(
    <>
      <Flex justify={"between"} align={"center"} px={"3"} py={"2"}
            style={{
                position:"sticky", top: "10px",
                borderRadius:"5px"
            }}>
              <Link href={"/index"} style={{display:"flex", alignItems:"center"}}><Image className={Style.logo} style={{borderRadius:"10px"}} src={"/images/novo_logo.png"} alt="" width={100} height={50} priority/></Link>
              <Flex gap={"5"}>  
                {load ? (
                    <>
                      <Nav getLogin={login} user={user}/> 
                    </>
                  ) : ("")}
              </Flex>
        </Flex>
        {load ? ("") : (
          null
        )}
    </>
  )
}




