import JobPostWrapper from "components/JobPostWrapper";
import FlexBetween from "components/FlexBetween";
import ToggleSwitch from "components/ToggleSwitch";
import { Typography, 
    Box,
    FormControlLabel,
    Fab,
    Button
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setJobPost } from "state";
import { useNavigate } from "react-router-dom";

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);

    /* Toggles */
    const handleChangeToggle = async (event) => {
        const name = event.target.name;
        const response = await fetch(`http://localhost:3001/posts/${jobPostId}/${name}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        dispatch(setJobPost({ jobPost: data }));
    }

    const handleEdit = () => {
        navigate(`/jobPostDetails/${jobPostId}`);
    }

    /* Delete */

    const deletePost =  async () => {
        const delPost = await fetch(
            `http://localhost:3001/posts/${jobPostId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await delPost.json();
        dispatch(setJobPost({ jobPost: data }));
    }

    return(
        <JobPostWrapper>
            <FlexBetween>
                <Box 
                    display="grid"
                    gridTemplateColumns="repeat(8, minmax(0, 2fr))"
                    width={"100%"}
                >
                    <FlexBetween gap="3rem" >
                        <Typography 
                            fontWeight="bold"
                            sx={{width: "fit-content"}}
                            pr="4rem"
                        >
                            {title}
                        </Typography>
                    </FlexBetween>
                    <FlexBetween gap="3rem">
                        <Typography>
                            {company}
                        </Typography>
                    </FlexBetween>

                    {/* Toggles */}

                    <FlexBetween>
                        <FormControlLabel
                                control={
                                    <ToggleSwitch checked={isResearched} onChange={handleChangeToggle}  name="isResearched" />
                                }
                                label= "Researched"
                                labelPlacement="top"
                        >
                        </FormControlLabel>
                    </FlexBetween>
                    <FlexBetween>
                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={isCoverLetter} onChange={handleChangeToggle}  name="isCoverLetter" />
                            }
                            label= "Cover letter"
                            labelPlacement="top"
                        >
                        </FormControlLabel>
                    </FlexBetween>
                    <FlexBetween>
                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={isApplied} onChange={handleChangeToggle}  name="isApplied" />
                            }
                            label= "Applied"
                            labelPlacement="top"
                        >
                        </FormControlLabel>
                    </FlexBetween>
                    <FlexBetween>
                        <FormControlLabel
                            control={
                                <ToggleSwitch checked={isReply} onChange={handleChangeToggle}  name="isReply" />
                            }
                            label= "Reply"
                            labelPlacement="top"
                        >
                        </FormControlLabel>
                    </FlexBetween>

                    {/* Edit Button */}
                    
                    <FlexBetween gap="3rem">
                        <Fab size="medium" variant="extended" color="primary" onClick={handleEdit}>
                            <EditIcon />
                            Details
                        </Fab>
                    </FlexBetween>

                    {/* Delete Button */}
                    <FlexBetween>
                        <Button>
                            <DeleteOutlineOutlinedIcon onClick={() => deletePost()} />
                        </Button>
                    </FlexBetween>
                    
                </Box>
            </FlexBetween>
        </JobPostWrapper>
    )
};

export default JobPost;