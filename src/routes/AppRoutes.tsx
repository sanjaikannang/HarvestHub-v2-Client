import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import FarmerDashboard from "../pages/FarmerDashboard";
import BuyerDashboard from "../pages/BuyerDashboard";
import AdminDashboard from "../pages/AdminDashboard";


// AppRoutes component to handle routing of the application
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

                {/* Farmer Dashboard */}
                <Route path="/farmer-dashboard" element={<FarmerDashboard />} />

                {/* Farmer Dashboard */}
                <Route path="/buyer-dashboard" element={<BuyerDashboard />} />

                {/* Farmer Dashboard */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
