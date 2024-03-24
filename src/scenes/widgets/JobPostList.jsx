import { 
    Typography,
    useTheme,
    Box
} from "@mui/material";
import JobPost from "./JobPost";
import WidgetWrapper from "components/WidgetWrapper";
import SearchAndFilters from "./SearchAndFilters"; 
import { useSelector } from "react-redux";


const JobPostList = () => {
    const jobPosts = useSelector((state) => state.jobPosts);

    /* Colors */
    const theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;

    return(
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
                Job Posts
            </Typography>

            <Box display="flex" alignItems={"left"} gap="1.5rem" p="3rem">
                <SearchAndFilters/>
            </Box>

            <Box display="Flex" alignItems={"left"} gap="1.5rem" pl="3rem">
                    <Typography variant="h5" fontWeight={"bold"} pr="4rem" >
                        Job Title
                    </Typography>
                    <Typography variant="h5" fontWeight={"bold"} pl="4rem" >
                        Company
                    </Typography>
            </Box>
                    
                {jobPosts.map(
                    ({
                        _id,
                        title,
                        type,
                        company,
                        isResearched,
                        isCoverLetter,
                        isApplied,
                        isReply,
                        reply
                    }) => (
                        <JobPost 
                            key={_id}
                            jobPostId={_id}
                            title={title}
                            company={company}
                            isResearched={isResearched}
                            isCoverLetter={isCoverLetter}
                            isApplied={isApplied}
                            isReply={isReply}
                            type={type}
                        />
                    )
                )}
            </WidgetWrapper>
    )
};

export default JobPostList;