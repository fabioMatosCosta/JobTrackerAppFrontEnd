import JobPostWrapper from "components/JobPostWrapper";
import FlexBetween from "components/FlexBetween";
import ToggleSwitch from "components/ToggleSwitch";
import { Typography } from "@mui/material";

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
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">
                    
                    <FlexBetween gap="3rem">
                        <Typography>
                            title {jobPostId}
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            company
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            type
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <ToggleSwitch>
                            Is Researched toggle
                        </ToggleSwitch>
                    </FlexBetween>
                    <FlexBetween gap="3rem">
                        <Typography>
                            Is Cover letter toggle
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            Is Applied toggle
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            Is reply toggle
                        </Typography>
                    </FlexBetween>

                    <FlexBetween gap="3rem">
                        <Typography>
                            open for details
                        </Typography>
                    </FlexBetween>

                </FlexBetween>
            </FlexBetween>
        </JobPostWrapper>
    )
};

export default JobPost;