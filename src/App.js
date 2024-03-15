import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "./theme";
import HomePage from "scenes/homePage/homePage";
import LoginPage from "scenes/loginPage/loginPage";
import JobPostDetails from "scenes/jobPostDetails/jobPostDetails";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/jobPostDetails/:postId" element={<JobPostDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;