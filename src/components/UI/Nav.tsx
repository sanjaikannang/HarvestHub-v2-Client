import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button";

const Nav = () => {

    const Navigate = useNavigate();

    // Function to Navigate to Signup Page
    const handleSignup = () => {
        Navigate("/signup");
    };

    // Function to Navigate to Login Page
    const handleLogin = () => {
        Navigate("/login");
    };

    return (
        <>
            {/* NavBar Section  */}
            <nav className="bg-harvest-offwhite px-2 py-4 text-grey flex justify-between items-center shadow-sm">
                <div className="text-2xl text-grey font-bold">
                    <span className=" text-green-600 font-bold">Harvest</span>
                    Hub
                </div>
                <div className="flex items-center space-x-2">

                    <Button onClick={handleLogin}>
                        Login
                    </Button>

                    <Button onClick={handleSignup}>
                        Signup
                    </Button>
                </div>
            </nav>
        </>
    )
}

export default Nav