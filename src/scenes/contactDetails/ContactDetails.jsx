import Navbar from "scenes/navbar/navbar";
import { 
    Typography, 
    Box,
    TextField,
    Paper,
    useTheme,
    Button,
    List,
    ListItem,
    ListItemText,
    FormControlLabel
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { setJobPostContact } from "state";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import ToggleSwitch from "components/ToggleSwitch";

const updateContactNotesSchema = yup.object().shape({
    notes: yup.string().required("required"),
});

const updateContactProfileLinksSchema = yup.object().shape({
    profileLinks: yup.string().required("required")
});

const initialValuesContact = {
    notes: "",
    profileLinks: "",
};

const ContactDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const secondary = palette.secondary.main;
    const contactId = params.contactId;
    const contacts = useSelector((state) => state.jobPostContacts);
    const contactInfo = contacts.find((contact) => contact._id === contactId);
    const notes =  contactInfo.notes;
    const profileLinks = contactInfo.profileLinks;
    const token = useSelector((state) => state.token);


    const addNote = async (values, onSubmitProps) => {
        const savedContact = await fetch(
            `http://localhost:3001/contacts/${contactId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
                
            }
        )
        const newContact = await savedContact.json();
        dispatch(setJobPostContact({ jobPostContact: newContact }));
        onSubmitProps.resetForm();
    };

    const addProfileLink = async (values, onSubmitProps) => {
        const savedContact = await fetch(
            `http://localhost:3001/contacts/links/${contactId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
                
            }
        )
        const newContact = await savedContact.json();
        dispatch(setJobPostContact({ jobPostContact: newContact }));
        onSubmitProps.resetForm();
    };

    const deleteNote =  async (noteIndex) => {
        const delNote = await fetch(
            `http://localhost:3001/contacts/${contactId}/${noteIndex}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const newContact = await delNote.json();
        dispatch(setJobPostContact({ jobPostContact: newContact }));
    }

    const deleteProfileLink =  async (linkIndex) => {
        const delLink = await fetch(
            `http://localhost:3001/contacts/links/${contactId}/${linkIndex}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const newContact = await delLink.json();
        dispatch(setJobPostContact({ jobPostContact: newContact }));
    }

    const handleChangeToggle = async () => {
        const response = await fetch(`http://localhost:3001/contacts/isContacted/${contactId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setJobPostContact({ jobPostContact: data }));
    } 


    return (
        <Box>
            <Navbar page="contactDetails"/>
            <Box
                
            >
            <Box ml="1rem" display={"flex"} >
                <WidgetWrapper>
                    <Typography fontWeight="bold" variant="h3" padding="0.75rem 6%">
                        {contactInfo.firstName} {contactInfo.lastName} 
                    </Typography>
                    <Typography padding="0.75rem 6%" variant="h5">
                        Email :
                    </Typography>
                    <Typography pl="0.75rem">
                        {contactInfo.email}
                    </Typography>
                    <Typography padding="0.75rem 6%" variant="h5">
                        Phone Number:
                    </Typography>
                    <Typography pl="0.75rem">
                        {contactInfo.phoneNumber}
                    </Typography>
                </WidgetWrapper>
                {/* Toggle */}
                <FlexBetween ml="3rem" pl="3rem">
                    <FormControlLabel
                            control={
                                <ToggleSwitch checked={contactInfo.isContacted} onChange={handleChangeToggle}  name="isContacted" />
                            }
                            label= "Contacted :"
                            labelPlacement="top"
                    >
                    </FormControlLabel>
                </FlexBetween>
            </Box>
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <WidgetWrapper>
                    <Typography 
                        fontWeight="bold" 
                        variant="h4"
                        color={secondary}
                        sx={{
                            "&:hover": {
                                color: primaryLight,
                            },
                            padding: "2rem",
                        }}
                    >
                        Profile Links : 
                    </Typography>
                    <List  aria-label="profileLinks">
                        {profileLinks.map((link, index)=>(
                            <ListItem key={index} sx={{borderBottom : "1px solid #ccc"}}>
                                <ListItemText primary={link} />
                                <Button >
                                    <DeleteOutlineOutlinedIcon   onClick={() => deleteProfileLink(index)} />
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </WidgetWrapper>
                <WidgetWrapper >
                <Paper
                    elevation={2}
                    sx={{ "padding" : "1.5rem", 
                    "backgroundColor": palette.background.default, 
                    }}
                > 
                    <Formik
                        onSubmit={ addProfileLink }
                        initialValues={ initialValuesContact }
                        validationSchema={ updateContactProfileLinksSchema }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    minWidth={"450px"}
                                >
                                    <TextField
                                        label="New Profile Link"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.profileLinks}
                                        name="profileLinks"
                                        error={Boolean(touched.profileLinks) && Boolean(errors.profileLinks)}
                                        helperText={touched.profileLinks && errors.profileLinks}
                                        sx={{ gridColumn: "span 4"}}
                                    />    
                                </Box>

                                {/* Button */}
                                <Box>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            m: "2rem 0",
                                            p: "1rem",
                                            backgroundColor: palette.primary.main,
                                            color: palette.primary.dark,
                                            "&:hover": { color: palette.primary.main },
                                        }}
                                    >
                                        Add Profile Link
                                    </Button>
                                </Box>
                            </form>
                            )}
                        </Formik>
                    </Paper>
                </WidgetWrapper>
            </Box>
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <WidgetWrapper>
                    <Typography 
                            fontWeight="bold" 
                            variant="h4"
                            color={secondary}
                            sx={{
                                "&:hover": {
                                    color: primaryLight,
                                },
                                padding: "2rem",
                            }}
                    >
                        Notes : 
                    </Typography>
                    <List  aria-label="notes">
                        {notes.map((note, index)=>(
                            <ListItem key={index} sx={{borderBottom : "1px solid #ccc"}}>
                                <ListItemText primary={note}/>
                                <Button>
                                    <DeleteOutlineOutlinedIcon onClick={() => deleteNote(index)} />
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </WidgetWrapper>

                <WidgetWrapper >
                <Paper
                    elevation={2}
                    sx={{ "padding" : "1.5rem", 
                    "backgroundColor": palette.background.default, 
                    }}
                > 
                    <Formik
                        onSubmit={ addNote }
                        initialValues={ initialValuesContact }
                        validationSchema={ updateContactNotesSchema }
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    minWidth={"450px"}
                                >   
                                    <TextField
                                        label="New Note"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.notes}
                                        multiline
                                        rows={4}
                                        name="notes"
                                        error={Boolean(touched.notes) && Boolean(errors.notes)}
                                        helperText={touched.notes && errors.notes}
                                        sx={{ gridColumn: "span 4"}}
                                    />
                                </Box>

                                {/* Button */}
                                <Box>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            m: "2rem 0",
                                            p: "1rem",
                                            backgroundColor: palette.primary.main,
                                            color: palette.primary.dark,
                                            
                                            "&:hover": { color: palette.primary.main },
                                        }}
                                    >
                                        Add Note
                                    </Button>
                                </Box>
                            </form>
                            )}
                        </Formik>
                    </Paper>
                </WidgetWrapper>
            </Box>
        </Box>
    </Box>
    )
};

export default ContactDetails;