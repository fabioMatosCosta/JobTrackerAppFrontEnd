import WidgetWrapper from "components/WidgetWrapper";
import * as React from 'react';
import {
    Box,
    TextField,
    Button,
    useTheme,
    Paper,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector} from "react-redux";
import { setJobPostContacts } from "state";

const contactSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    phoneNumber: yup.number().min(8),
    profileLinks: yup.string(),
    notes: yup.string()
});

const initialValuesContact = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    profileLinks: "",
    notes: "",
};

const AddContact = (jobPostId) => {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();

    const addContact = async (values, onSubmitProps) => {
        const savedContact = await fetch(
            `http://localhost:3001/contacts/${user._id}/${jobPostId.jobPostId}`,
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
        console.log(newContact)
        dispatch(setJobPostContacts({jobPostContacts: newContact }));
        onSubmitProps.resetForm();

       /*  if(!newContact.message){
            dispatch(setJobPostContacts({jobPostContacts: newContact }));
            onSubmitProps.resetForm();
        }else{
            console.log(newContact.message)
        }
         */
    };

    return(
    <WidgetWrapper >
    <Paper
        elevation={2}
        sx={{ "padding" : "1.5rem", 
        "backgroundColor": palette.background.default, 
        }}
    > 
    <Formik
            onSubmit={ addContact }
            initialValues={ initialValuesContact }
            validationSchema={ contactSchema }
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
                            label="First Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.firstName}
                            name="firstName"
                            error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField
                            label="Last Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.lastName}
                            name="lastName"
                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                            sx={{ gridColumn: "span 2"}}
                        />
                        
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4"}}
                        />
                        
                        <TextField
                            label="Phone Number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.phoneNumber}
                            error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                            helperText={touched.phoneNumber && errors.phoneNumber}
                            name="phoneNumber"
                            sx={{ gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Profile Link"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.profileLinks}
                            name="profileLinks"
                            error={Boolean(touched.profileLinks) && Boolean(errors.profileLinks)}
                            helperText={touched.profileLinks && errors.profileLinks}
                            sx={{ gridColumn: "span 4"}}
                        />
                        {/* Type of job , not a text field, see later*/}     
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

                    {/* Buttons */}
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
                            Add Contact
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    </Paper>
    </WidgetWrapper>
        
    )
};

export default AddContact;