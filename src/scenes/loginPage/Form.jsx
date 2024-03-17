import {
    Box,
    Typography,
    TextField,
    Button,
    useTheme,
    InputAdornment,
    IconButton,
    InputLabel,
    OutlinedInput,
    FormControl,
    FormHelperText 
} from "@mui/material";

import {     
    Visibility,
    VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import { setLogin } from "state";



const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
};


const Form = () => {

    /* hide password button logic */
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [pageType, setPageType] = useState("login");
    const [regError, setRegError] = useState(false);
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        )
        const savedUser = await savedUserResponse.json();

        if(!savedUser.message){
            setPageType("login");
            setRegError(false);
            onSubmitProps.resetForm(/*{values: {email: onSubmitProps.email , password: ""}}*/);
        }else{
            setRegError(savedUser.message);
        }
        
    };

    const login = async (values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();

        if(!loggedIn.message){
            dispatch(
                setLogin({
                    user: loggedIn.frontendUser,
                    token: loggedIn.token,
                })
            );
            setRegError(false);
            navigate("/home");
            onSubmitProps.resetForm();
        }else{
            setRegError(loggedIn.message);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(isLogin) await login(values, onSubmitProps);
        if(isRegister) await register(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={ handleFormSubmit }
            initialValues={ isLogin ? initialValuesLogin : initialValuesRegister }
            validationSchema={ isLogin ? loginSchema : registerSchema }
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2"}}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2"}}
                                />
                            </>
                        )}
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 4"}}
                        />
                        <FormControl sx={{ gridColumn: "span 4"}} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="password"
                                error={Boolean(touched.password) && Boolean(errors.password)}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText sx={{ color: "warning.dark" }} >{touched.password && errors.password}</FormHelperText>
                        </FormControl>
                    </Box>

                    {/* Message of error box */}
                    <Box>
                        <Typography variant="p" color="error">
                            {!regError ? "" : regError}
                        </Typography>
                    </Box>

                    {/* Buttons */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.primary.dark,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN": "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                setRegError(false);
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "unbderline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign in here." : "Already have and account? Login here."}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )
};

export default Form;