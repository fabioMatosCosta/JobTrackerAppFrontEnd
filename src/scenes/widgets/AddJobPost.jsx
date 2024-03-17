import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import {
    Box,
    Typography,
    TextField,
    Button,
    useTheme,
    IconButton,
    InputLabel,
    OutlinedInput,
    FormControl,
    FormHelperText 
} from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";

const jobPostSchema = yup.object().shape({
    title: yup.string().required("required"),
    type: yup.string().required("required"),
    jobLink: yup.string().required("required"),
    company: yup.string().required("required"),
    companyWebsite: yup.string().url().required("required"),
    dateToApply: yup.date().date.max(new Date().getMonth() + 6)
});

const initialValuesJobPost = {
    title: "",
    type: "",
    jobLink: "",
    company: "",
    companyWebsite: "",
    dateToApply: new Date(),
};

const AddJobPost = () => {
    
    return(
        <WidgetWrapper>
            <div>
            AddJobPost
            </div>
        </WidgetWrapper>
    )
};

export default AddJobPost;