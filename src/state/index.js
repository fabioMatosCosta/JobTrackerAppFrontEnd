import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    jobPosts: [],
    jobPostContacts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.frontendUser = null;
            state.token = null;
        },
        setJobPostList: (state, action) => {
            state.jobPosts = action.payload.jobPosts;
        },
        setJobPost: (state, action) => {
            const updatedJobPosts =  state.jobPosts.map((jobPost) => {
                if(jobPost._id === action.payload.jobPost._id) return action.payload.jobPost;
                return jobPost;
            });
            state.jobPosts = updatedJobPosts;
        },
        setJobPostContacts: (state, action) => {
            state.jobPostContacts = action.payload.jobPostContacts;
        },
        setJobPostContact: (state, action) => {
            const updatedJobPostContacts =  state.jobPostContacts.map((jobPostContact) => {
                if(jobPostContact._id === action.payload.jobPostContact._id) return action.payload.jobPostContact;
                return jobPostContact;
            });
            state.jobPostContacts = updatedJobPostContacts;
        }
    }
})

export const { 
    setMode, 
    setLogin, 
    setLogout, 
    setJobPosts, 
    setJobPost, 
    setJobPostContacts, 
    setJobPostContact } = authSlice.actions;

export default authSlice.reducer;