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
    Divider,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { setJobPostContact } from "state";
import WidgetWrapper from "components/WidgetWrapper";

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


    return (
        <Box>
            <Navbar page="contactDetails"/>
            <Box
                
            >
                <Box>
                    <Typography>
                        Contact Details
                    </Typography>
                    <Typography>
                        {contactInfo.firstName} 
                        {contactInfo.lastName} 
                        {contactInfo.email} 
                        {contactInfo.phoneNumber} 
                    </Typography>
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
                        variant="h3"
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
                                <>
                                    <ListItem key={index}>
                                        <ListItemText primary={link}/>
                                        <Button>
                                            <DeleteIcon onClick={() => deleteProfileLink(index)} />
                                        </Button>
                                    </ListItem>
                                    <Divider variant="middle" component="li" />
                                </>
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
                    <Typography variant="h4">
                        Notes : 
                    </Typography>
                    <List  aria-label="notes">
                        {notes.map((note, index)=>(
                        <>
                        <ListItem key={index}>
                            <ListItemText primary={note}/>
                            <Button>
                                <DeleteIcon onClick={() => deleteNote(index)} />
                            </Button>
                        </ListItem>
                        <Divider variant="middle" component="li" />
                        </>
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
}

export default ContactDetails;