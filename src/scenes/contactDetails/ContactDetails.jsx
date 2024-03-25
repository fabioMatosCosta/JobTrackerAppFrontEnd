import Navbar from "scenes/navbar/navbar";
import { 
    Typography, 
    Box,
    TextField,
    Paper,
    useTheme,
    Button
} from "@mui/material";
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


    return (
        <Box>
            <Navbar page="contactDetails"/>
            <Box>
                <Typography>
                    Contact Details
                </Typography>
                <Typography>
                    {contactInfo.firstName} 
                    {contactInfo.lastName} 
                    {contactInfo.email} 
                    {contactInfo.phoneNumber} 
                    {contactInfo.profileLinks}
                </Typography>
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
                                >
                                    <TextField
                                        label="Profile Link"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.profileLinks}
                                        name="profileLinks"
                                        error={Boolean(touched.profileLinks) && Boolean(errors.profileLinks)}
                                        helperText={touched.profileLinks && errors.profileLinks}
                                        sx={{ gridColumn: "span 2"}}
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

                <WidgetWrapper>
                {profileLinks.map(
                    ({
                        _id,
                        link
                    }) => (
                        <Typography key={_id}>
                            {_id}
                            {link}
                            Profile Link
                        </Typography>
                    )
                )}
                </WidgetWrapper>

                <WidgetWrapper>
                {notes.map(
                    ({
                        _id,
                        note
                    }) => (
                        <Typography key={_id}>
                            {note}
                        </Typography>
                    )
                )}
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
                                >   
                                    <TextField
                                        label="Notes"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.notes}
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
        
    )
}

export default ContactDetails;