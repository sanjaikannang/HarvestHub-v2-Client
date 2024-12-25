import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import Nav from "../components/UI/Nav";

const FarmerDashboard = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Dispatch the logout action to clear user data and token
        dispatch(logout());
        // After logout, navigate the user to the login page
        navigate("/login");
    };

    return (
        <>
            <Nav />

            <div className="max-w-7xl mx-auto h-screen flex justify-center items-center flex-col">
                <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white py-2 px-6 rounded-lg mt-4 hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </>
    )
}

export default FarmerDashboard