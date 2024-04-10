import {
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    Avatar,
} from "@mui/material";
import {
    DarkMode,
    LightMode,
} from "@mui/icons-material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = (page) => {;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const secondary = theme.palette.secondary.main;

    const fullName = `${user.firstName} ${user.lastName}`;


    return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75 rem">
            <Typography 
                fontWeight="bold" 
                variant="h1"
                color={secondary}
                onClick={()=> navigate("/home")}
                sx={{
                    "&:hover": {
                        color: primaryLight,
                        cursor: "pointer",
                    },
                    padding: "0 0.5rem",
                }}
            >
                Jobbing Memory
            </Typography>
        </FlexBetween>

        <FlexBetween gap="2rem">
            <FlexBetween>
            {page.page === "contactDetails" || page.page === "jobPostDetails" || page.page === "userContactList" ? (<IconButton onClick={() => navigate(-1)}><NavigateBeforeIcon></NavigateBeforeIcon></IconButton>) : null}
            </FlexBetween>
            <FlexBetween gap="1.5rem"> 
                <Avatar src={user.picturePath}/>
            </FlexBetween>
            <FormControl variant = "standard" value={fullName}>
                <Select 
                    value={fullName}
                    sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        boderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root": {
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select:focus": {
                            backgroundColor: neutralLight
                        }
                    }}
                    input={<InputBase />}
                >
                    <MenuItem value={fullName}>
                        <Typography>{fullName}</Typography>
                    </MenuItem>
                    <MenuItem onClick={()=> navigate("/contactList")}> Contact list </MenuItem>
                    <MenuItem onClick={()=> dispatch(setLogout())}> Log Out </MenuItem>
                    
                </Select>
                </FormControl>
                <IconButton onClick = { () => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                    <DarkMode sx={{  color: dark , fontSize: "25px" }} />
                ) : (
                    <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
            </IconButton>
        </FlexBetween>
    </FlexBetween>
)};

export default Navbar;