import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import {
    Box,
    Typography,
    TextField,
    Button,
    useTheme,
    IconButton,
    InputLabel,
    OutlinedInput,
    FormControl,
    FormHelperText 
} from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch, useSelector} from "react-redux";
import { setJobPost } from "state";

const jobPostSchema = yup.object().shape({
    title: yup.string().required("required"),
    type: yup.string().required("required"),
    jobLink: yup.string().required("required"),
    company: yup.string().required("required"),
    companyWebsite: yup.string().url().required("required"),
    dateToApply: yup.date()
});

const initialValuesJobPost = {
    title: "",
    type: "",
    jobLink: "",
    company: "",
    companyWebsite: "",
    dateToApply: new Date(),
};

const AddJobPost = () => {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    
    const addJobPost = async (values, onSubmitProps) => {

        console.log(`http://localhost:3001/posts/${user._id}`)

        const savedJobPost = await fetch(
            `http://localhost:3001/posts/${user._id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            }
        )
        const savedPost = await savedJobPost.json();

        if(!savedPost.message){
            dispatch(setJobPost({post: savedPost }));
            onSubmitProps.resetForm();
        }else{
            console.log(savedPost.message)
        }
        
    };

    return(
        <WidgetWrapper>
        <Formik
            onSubmit={ addJobPost }
            initialValues={ initialValuesJobPost }
            validationSchema={ jobPostSchema }
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
                                    label="Title"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="title"
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
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4"}}
                        />
                    </Box>

                    {/* Message of error box */}
                    <Box>
                        <Typography variant="p" color="error">
                            error
                        </Typography>
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
                        add
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
        </WidgetWrapper>
    )
};

export default AddJobPost;