"use client"

import UserProfile from "@/components/userProfile";
import { GetUseContext } from "@/hooks/useContext";
import { Flex, Heading, Section, Text } from "@radix-ui/themes";

const Profile:React.FC = () => {
    const { user } = GetUseContext()
    return(
        <Section>
            <UserProfile user={user} />
        </Section>
    )
}

export default Profile;