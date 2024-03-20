import { 
    Typography,
    useTheme,
    Box
} from "@mui/material";
import JobPost from "./JobPost";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setJobPosts } from "state";

const JobPostList = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const jobPosts = useSelector((state) => state.jobPosts);
    const user = useSelector((state) => state.user);
    const userId = user._id;

    const getJobPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        console.log(data)
        dispatch(setJobPosts({ jobPosts: data }));
    }

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
                        padding: "3rem",
                    }}
            >
                Job Posts
            </Typography>

            <Box display="Flex" alignItems={"left"} gap="1.5rem" pl="3rem">
                    <Typography variant="h5" fontWeight={"bold"}  >
                        Title
                    </Typography>
                    <Typography variant="h5" fontWeight={"bold"} pl="3rem" >
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