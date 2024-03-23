import Navbar from "scenes/navbar/navbar";
import FlexBetween from "components/FlexBetween";
import{ 
    Box,
    Typography,
    Paper,
    useTheme,
    Link,
    TextField,
    Button,
    FormControlLabel
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import ContactList from "scenes/widgets/ContactList";
import WidgetWrapper from "components/WidgetWrapper";
import ToggleSwitch from "components/ToggleSwitch";

const replySchema = yup.object().shape({
    newReply: yup.string().required("required"),
});

const initialValueReply = {
    newReply: "",
};


const JobPostDetails = () => {
    const token = useSelector((state) => state.token);
    const params = useParams();
    const jobPostId = params.jobPostId;
    const theme = useTheme();
    const dispatch = useDispatch();

    const [jobPost, setJobPost] = useState(null);

    /* Reply */
    const addReply = async (values, onSubmitProps) => {

        const savedReply = await fetch(
            `http://localhost:3001/posts/${jobPostId}/reply`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
                
            }
        )
        const reply = await savedReply.json();
        /* dispatch(setJobPosts({jobPosts: newPostList })); */
        console.log(reply)
       /*  onSubmitProps.resetForm(); */
    };

    /* Change toggle switch */

    const handleChangeToggle = async (event) => {
        const name = event.target.name;
        const response = await fetch(`http://localhost:3001/posts/${jobPostId}/${name}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setJobPost({ jobPost: data }));
    }
    const getPostDetails = async () => {
        const response = await fetch(`http://localhost:3001/posts/details/${jobPostId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setJobPost(data);
    };

    useEffect( () => {
        getPostDetails();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!jobPost) return null;

    return (
        <Box>
            <Navbar/>
            <Box
                width="100%"
                padding="2rem 6%"
                display="flex"
                gap="0.5rem"
                justifyContent="space-between"
            >
                <FlexBetween ml="1rem">
                    
                    <WidgetWrapper>
                        <Typography fontWeight="bold" variant="h3" padding="0.75rem 6%">
                            {jobPost.title}
                        </Typography>
                        <Typography padding="0.75rem 6%">
                            Company: {jobPost.company}
                        </Typography>
                        <Typography padding="0.75rem 6%">
                            Link :
                            <Link 
                                underline="hover" 
                                rel="noopener"
                            >
                                {jobPost.jobLink}
                            </Link>
                        </Typography>
                        <Typography padding="0.75rem 6%">
                            Company Website: 
                            <Link 
                                underline="hover" 
                                rel="noopener"
                            >
                                {jobPost.companyWebsite}
                            </Link>
                        </Typography>
                    </WidgetWrapper>

                    <WidgetWrapper>
                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={jobPost.isResearched} onChange={handleChangeToggle}  name="isResearched" />
                            }
                            label= "Researched"
                            labelPlacement="top"
                        >
                        </FormControlLabel>

                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={jobPost.isCoverLetter} onChange={handleChangeToggle}  name="isCoverLetter" />
                            }
                            label= "Cover Letter"
                            labelPlacement="top"
                        >
                        </FormControlLabel>
                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={jobPost.isApplied} onChange={handleChangeToggle}  name="isApplied" />
                            }
                            label= "Applied"
                            labelPlacement="top"
                        >
                        </FormControlLabel>
                    </WidgetWrapper>
                </FlexBetween>
                <WidgetWrapper width="90%" maxWidth={"500px"}>
                    <Paper
                        elevation={2}
                        sx={{ "padding" : "1.5rem", 
                        "backgroundColor": theme.palette.background.default, 
                        }}
                    > 
                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={jobPost.isReply} onChange={handleChangeToggle}  name="isReply" />
                            }
                            label= "Reply"
                            labelPlacement="start"
                        >
                        </FormControlLabel>
                    
    <Formik
            onSubmit={ addReply }
            initialValues={ initialValueReply }
            validationSchema={ replySchema }
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
                    <Box>
                        <Typography>
                            Reply :  {jobPost.isReply ? jobPost.reply : "No"}
                        </Typography>
                    </Box>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    >
                        <TextField
                            label="Reply"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.newReply}
                            name="newReply"
                            error={Boolean(touched.newReply) && Boolean(errors.newReply)}
                            helperText={touched.newReply && errors.newReply}
                            sx={{ gridColumn: "span 4"}}
                        />
                    </Box>
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.primary.dark,
                                "&:hover": { color: theme.palette.primary.main },
                            }}
                        >
                            Add reply
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
                        
                    </Paper>
                </WidgetWrapper>
            </Box>
            <WidgetWrapper>
                <ContactList/>
            </WidgetWrapper>
        </Box>
        
)};

export default JobPostDetails;