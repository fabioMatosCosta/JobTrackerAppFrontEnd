import{ 
    Box,
    Typography,
    
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "scenes/navbar/navbar";



const UserContactList = () => {

    const [contacts, setContacts] = useState(null);

    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const getContacts = async (values, onSubmitProps) => {
        const contactList = await fetch(
            `http://localhost:3001/contacts/user/${user._id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            }
        )
        await contactList.json();
        setContacts(contactList);
    };

    return (
        <Box>
            <Navbar page="userContactList"/>

            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box
                    width="100%"
                    padding="2rem 6%"
                    display="flex"
                    gap="0.5rem"
                    justifyContent="space-between"
                >
                    
            <Box display="Flex" alignItems={"left"} gap="1.5rem" pl="3rem">
                    <Typography variant="h5" fontWeight={"bold"} pr="4rem" >
                        Name
                    </Typography>
                    <Typography variant="h5" fontWeight={"bold"} pl="4rem" >
                        Email
                    </Typography>
            </Box>
                    
                {contacts.map(
                    ({
                        _id
                    }) => (
                        <Contact 
                            key={_id}
                            contactId={_id}
                        />
                    )
                )}

                </Box>
                <Box width={"55%"}>
                    
                </Box>
                
            </Box>
        </Box>
    )
};

export default UserContactList