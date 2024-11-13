import{ 
    Box,
    Typography,
    useTheme
} from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import Navbar from "scenes/navbar/navbar";
import ContactComponent from "components/ContactComponent";
import { setUserContacts } from "state";



const UserContactList = () => {

     /* Colors */
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;


    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userId = user._id;

    const contacts = useSelector((state) => state.userContacts);

    const getContacts = async () => {
        const contactList = await fetch(`http://localhost:3001/contacts/user/${userId}`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}`},
            });
            const data =await contactList.json();
        dispatch(setUserContacts({ userContacts: data }));
    };

    useEffect( () => {
        getContacts();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!contacts) return null;

    return (
        <Box>
            <Navbar page="userContactList"/>

            <Typography 
                    fontWeight="bold" 
                    variant="h3"
                    color={secondary}
                    sx={{
                        "&:hover": {
                            color: primaryLight,
                        },
                        padding: "2rem",
                    }}
                >
                Contacts
            </Typography>

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
                        <Typography variant="h5" fontWeight={"bold"} pl="4rem" >
                            Company
                        </Typography>
                    </Box>

                    <Box width={"55%"}>
                    {contacts.map(
                        ({
                            _id
                        }) => (
                            <ContactComponent
                                key={_id}
                                contactId={_id}
                            />
                        )
                        )} 
                    </Box>
                </Box>
                
                
            </Box>
        </Box>
    )
};

export default UserContactList