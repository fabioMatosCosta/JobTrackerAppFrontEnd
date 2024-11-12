import{ 
    Box,
    Typography,
    
} from "@mui/material";
import { useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import Navbar from "scenes/navbar/navbar";
import Contact from "scenes/widgets/Contact";
import { setUserContacts } from "state";



const UserContactList = () => {

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
        console.log(data)
    };

    useEffect( () => {
        getContacts();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!contacts) return null;


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
                    <div>
                        {_id}
                    </div>
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