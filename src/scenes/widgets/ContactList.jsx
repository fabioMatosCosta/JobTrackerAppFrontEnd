import { 
    Typography,
    useTheme,
    Box
} from "@mui/material";
import Contact from "./Contact";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";


const ContactList = () => {
    const contacts = useSelector((state) => state.jobPostContacts);
    /* Colors */
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;

    return(
        <WidgetWrapper>
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
            </WidgetWrapper>
    )
};

export default ContactList;