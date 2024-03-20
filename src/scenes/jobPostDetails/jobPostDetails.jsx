import Navbar from "scenes/navbar/navbar";
import FlexBetween from "components/FlexBetween";
import{ 
    Box,
    Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from 'react-router';
import { useState, useEffect } from "react";


const JobPostDetails = () => {
    const token = useSelector((state) => state.token);
    const params = useParams();
    const jobPostId = params.jobPostId;

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
            <FlexBetween gap="3rem">
                <Typography>
                    {jobPost.title}
                </Typography>
                <Typography>
                    {jobPost.jobLink}
                </Typography>
                <Typography>
                    {jobPost.company}
                </Typography>
                <Typography>
                    {jobPost.companyWebsite}
                </Typography>
                <Typography>
                isResearched {jobPost.isResearched ? "Yes" : "No"} 
                </Typography>
                <Typography>
                isCoverLetter {jobPost.isCoverLetter ? "Yes" : "No"}
                </Typography>
                <Typography>
                isApplied {jobPost.isApplied ? "Yes" : "No"}	
                </Typography>
                <Typography>
                isReply {jobPost.isReply ? "Yes" : "No"}	
                </Typography>
                <Typography>
                Reply {jobPost.reply}
                </Typography>

                <Typography>
                Contacts {jobPost.contacts}
                </Typography>
                
            </FlexBetween>
        </Box>
        
)};

export default JobPostDetails;