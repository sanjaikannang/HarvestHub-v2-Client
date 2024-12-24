import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>

                {/* Landing Page */}
                <Route path="/" element={<LandingPage />} />

                {/* Signup Page */}
                <Route path="/signup" element={<SignupPage />} />

                {/* Login Page */}
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
