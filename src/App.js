import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import HomePage from "scenes/homePage/homePage";
import LoginPage from "scenes/loginPage/loginPage";
import JobPostDetails from "scenes/jobPostDetails/jobPostDetails";
import ContactList from "scenes/widgets/ContactList";
import ContactDetails from  "scenes/contactDetails/ContactDetails";

function App() {
  const mode = useSelector((state)=> state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route 
              path="/home" 
              element={isAuth ?  <HomePage/> : <Navigate to="/"/>} 
            />
            <Route 
              path="/jobPostDetails/:jobPostId" 
              element={isAuth ? <JobPostDetails /> : <Navigate to="/"/>} 
            />
            <Route 
              path="/jobPostDetails/:jobPostId/contacts/:contactId" 
              element={isAuth ? <ContactDetails /> : <Navigate to="/"/>} 
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;