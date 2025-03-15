"use client"

import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import Nav from "@/components/nav";
import { UserContextProvider } from "@/context/UserContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark">
          <UserContextProvider>
            <Nav />
            {children}
          </UserContextProvider>
        </Theme>
      </body>
    </html>
  );
}




