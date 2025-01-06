import { useState } from 'react';
import NavBar from "../components/UI/NavBar";
import Modal from "../components/common/Modal";
import { UploadProductForm } from "../components/products/UploadProductForm";
import { Button } from '../components/common/Button';


const FarmerDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUploadSuccess = () => {
        handleCloseModal();
        // You can add additional success handling here, like showing a toast notification
    };


    return (
        <>
            <NavBar />
            <div className="h-screen mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Farmer Dashboard</h1>

                    <Button
                        onClick={handleOpenModal}
                        className="text-white px-4 py-2 rounded-md"
                    >
                        Create Order
                    </Button>

                </div>

                {/* Add your dashboard content here */}

                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    title="Create New Order"
                >
                    <div className="max-h-[80vh]">
                        <UploadProductForm
                            onUploadSuccess={handleUploadSuccess}
                            isModal={true}
                        />
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default FarmerDashboard;