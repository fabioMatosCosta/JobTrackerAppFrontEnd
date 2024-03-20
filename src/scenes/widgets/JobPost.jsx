import JobPostWrapper from "components/JobPostWrapper";
import FlexBetween from "components/FlexBetween";
import ToggleSwitch from "components/ToggleSwitch";
import { Typography, Box } from "@mui/material";

const JobPost = ({
    jobPostId,
    title,
    type,
    company,
    isResearched,
    isCoverLetter,
    isApplied,
    isReply
}) => {
    return(
        <JobPostWrapper>

        <FlexBetween>
        <Box 
            display="grid"
            gridTemplateColumns="repeat(8, minmax(0, 1fr))"
            width={"100%"}
        >
                    
                    <FlexBetween gap="3rem">
                        <Typography 
                            fontWeight="bold"
                        >
                            {title}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            {company}
                        </Typography>
                    </FlexBetween>


                    <FlexBetween gap="3rem">
                        <ToggleSwitch  checked={isResearched}/> Researched
                    </FlexBetween>
                    <FlexBetween gap="3rem">
                        <ToggleSwitch checked={isCoverLetter} /> Cover letter
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <ToggleSwitch  checked={isApplied}/> Applied
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <ToggleSwitch checked={isReply}  /> Reply
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            {type}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            open for details
                        </Typography>
                    </FlexBetween>
            </Box>
        </FlexBetween>
            
        </JobPostWrapper>
    )
};

export default JobPost;