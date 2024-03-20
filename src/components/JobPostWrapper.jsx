import { Paper } from "@mui/material";
import { styled } from "@mui/system";

const JobPostWrapper =  styled(Paper)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    borderRadius: "0.75rem",
    marginTop: "1rem",
    backgroundColor: theme.palette.background.default
}));

export default JobPostWrapper;