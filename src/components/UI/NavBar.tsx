import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { useState } from "react";
import { UserRound } from "lucide-react";

const NavBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Local storage user data, safely handle null case
    const userData = JSON.parse(localStorage.getItem("user") || "null");

    // User info state for dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        // Dispatch the logout action to clear user data and token
        dispatch(logout());
        // After logout, navigate the user to the login page
        navigate("/login");
    };

    const handleLogo = () => {
        navigate("/");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <nav className="bg-harvest-offwhite px-2 py-3 text-grey flex justify-between items-center shadow-sm">
            {/* Logo */}
            <div onClick={handleLogo} className="text-2xl text-grey font-bold cursor-pointer">
                <span className="text-green-600 font-bold">Harvest</span> Hub
            </div>

            <div className="flex items-center space-x-2">
                {/* User icon and dropdown */}
                <div className="relative">
                    <div
                        onClick={toggleDropdown}
                        className="w-10 h-10 rounded-full border border-gray-300 shadow-sm cursor-pointer flex justify-center items-center"
                    >
                        {/* User Initials or Icon */}
                        {userData ? (
                            <>
                                <UserRound className="text-harvest-secondary text-md" />
                            </>
                        ) : (
                            <span className="text-harvest-secondary text-md">U</span>
                        )}
                    </div>
                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-2 mt-2 bg-white text-center shadow-lg rounded-md w-48 p-3 border border-gray-300">
                            <div className="mb-2 text-gray-800 text-md font-semibold">
                                {userData ? `${userData.name} - ${userData.role}` : "Guest"}
                            </div>
                            <div className="mb-2 space-y-2 text-gray-600 text-xs">
                                {userData ? (
                                    <>
                                        <div>Email - {userData.email}</div>
                                        <div>Phone - {userData.phoneNo}</div>
                                    </>
                                ) : (
                                    <div>No user data available</div>
                                )}
                            </div>

                            <hr />

                            <Button onClick={handleLogout} className="w-full text-xs mt-3 bg-red-500 text-white">
                                Logout
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
