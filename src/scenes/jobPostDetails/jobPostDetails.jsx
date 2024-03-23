import Navbar from "scenes/navbar/navbar";
import FlexBetween from "components/FlexBetween";
import{ 
    Box,
    Typography,
    Paper,
    useTheme,
    Link
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";
import ContactList from "scenes/widgets/ContactList";
import WidgetWrapper from "components/WidgetWrapper";


const JobPostDetails = () => {
    const token = useSelector((state) => state.token);
    const params = useParams();
    const jobPostId = params.jobPostId;
    const theme = useTheme();

    const [jobPost, setJobPost] = useState(null);

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
                        <Typography padding="0.75rem 6%">
                            Researched : {jobPost.isResearched ? "Yes" : "No"} 
                        </Typography>
                        <Typography padding="0.75rem 6%">
                            Cover Letter done : {jobPost.isCoverLetter ? "Yes" : "No"}
                        </Typography>
                        <Typography padding="0.75rem 6%">
                            Applied : {jobPost.isApplied ? "Yes" : "No"}	
                        </Typography>
                    </WidgetWrapper>
                </FlexBetween>
                <WidgetWrapper width="90%" maxWidth={"500px"}>
                    <Paper
                        elevation={2}
                        sx={{ "padding" : "1.5rem", 
                        "backgroundColor": theme.palette.background.default, 
                        }}
                    > 
                        <Typography>
                            Reply :  	
                        </Typography>
                        <Typography>
                            {jobPost.isReply ? jobPost.reply : "No"}
                        </Typography>
                    </Paper>
                </WidgetWrapper>
            </Box>
            <WidgetWrapper>
                <ContactList/>
            </WidgetWrapper>
        </Box>
        
)};

export default JobPostDetails;