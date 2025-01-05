import { UploadProductForm } from "../components/products/UploadProductForm";
import NavBar from "../components/UI/NavBar";

const FarmerDashboard = () => {

    return (
        <>
            <NavBar />

            <div className="max-w-7xl mx-auto h-screen flex justify-center items-center flex-col">
                <h1 className="text-2xl font-bold mb-4">Farmer Dashboard</h1>

                <UploadProductForm />

            </div>
        </>
    )
}

export default FarmerDashboard