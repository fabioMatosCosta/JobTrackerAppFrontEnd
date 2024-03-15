import { useState } from "react";
import {
    Box,
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
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { red } from "@mui/material/colors";

const Navbar = () => {;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;
    const secondary = theme.palette.secondary.main;
    const primary = theme.palette.primary.main;

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
                    }
                }}
            >
                Jobbing Memory
            </Typography>
        </FlexBetween>

        <FlexBetween gap="2rem">
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