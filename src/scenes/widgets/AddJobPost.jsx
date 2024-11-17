import WidgetWrapper from "components/WidgetWrapper";
import * as React from 'react';
import {
    Box,
    TextField,
    Button,
    useTheme,
    Snackbar,
    Paper,
    IconButton,
    Typography
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector} from "react-redux";
import { setJobPosts } from "state";

const jobPostSchema = yup.object().shape({
    title: yup.string().required("required"),
    type: yup.string(),
    jobLink: yup.string().required("required"),
    company: yup.string().required("required"),
    companyWebsite: yup.string(),
    dateToApply: yup.date()
});

const initialValuesJobPost = {
    title: "",
    type: "",
    jobLink: "",
    company: "",
    companyWebsite: "",
    dateToApply: "",
};

const AddJobPost = () => {

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const { palette } = useTheme();

      /* Colors */
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;

    /* Snackbar setup */

    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const addJobPost = async (values, onSubmitProps) => {

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
        const newPostList = await savedJobPost.json();

        if(!newPostList.message){
            dispatch(setJobPosts({jobPosts: newPostList }));
            setOpen(true);
            onSubmitProps.resetForm();
        }else{
            console.log(newPostList.message)
        }
        
    };

    return(
    <WidgetWrapper >
    <Paper
        elevation={2}
        sx={{ "padding" : "1.5rem", 
        "backgroundColor": palette.background.default, 
        }}
    > 
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
        New Job Post
    </Typography>
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
                            value={values.title}
                            name="title"
                            error={Boolean(touched.title) && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            sx={{ gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Link to job posting"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.jobLink}
                            name="jobLink"
                            error={Boolean(touched.jobLink) && Boolean(errors.jobLink)}
                            helperText={touched.jobLink && errors.jobLink}
                            sx={{ gridColumn: "span 4"}}
                        />
                        
                        <TextField
                            label="Company"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.company}
                            name="company"
                            error={Boolean(touched.company) && Boolean(errors.company)}
                            helperText={touched.company && errors.company}
                            sx={{ gridColumn: "span 4"}}
                        />
                        
                        <TextField
                            label="Company Website"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.companyWebsite}
                            error={Boolean(touched.companyWebsite) && Boolean(errors.companyWebsite)}
                            helperText={touched.companyWebsite && errors.companyWebsite}
                            name="companyWebsite"
                            sx={{ gridColumn: "span 4"}}
                        />
                        <TextField
                            label="Date to Apply"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.dateToApply}
                            name="dateToApply"
                            error={Boolean(touched.dateToApply) && Boolean(errors.dateToApply)}
                            helperText={touched.dateToApply && errors.dateToApply}
                            sx={{ gridColumn: "span 2"}}
                        />

                        {/* Type of job , not a text field, see later*/}     
                        <TextField
                            label="Type"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.type}
                            name="type"
                            error={Boolean(touched.type) && Boolean(errors.type)}
                            helperText={touched.type && errors.type}
                            sx={{ gridColumn: "span 2"}}
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
                            Add to the list
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    </Paper>
        
        <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message="Job Post Added"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                action={action}
        />
    </WidgetWrapper>
        
    )
};

export default AddJobPost;