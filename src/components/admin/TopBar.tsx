import { Bell, MessageSquare } from "lucide-react";
import AdminIcon from "../../../public/Icons/admin_iconn.png"

export const TopBar = () => {
    return (
        <div className="fixed top-0 right-0 h-16 w-full border-b bg-white z-20">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Admin Profile Section */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-gray-400 p-1">
                        <img
                            src={AdminIcon}
                            alt="Admin"
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <span className="text-gray-600 font-medium">Admin Dashboard</span>
                </div>

                {/* Notification Icons */}
                <div className="flex items-center gap-6">
                    <button aria-label="chat" className="p-2 rounded-lg bg-gray-200">
                        <MessageSquare className="h-6 w-6 text-gray-600" />
                    </button>

                    <button aria-label="notification" className="p-2 rounded-lg bg-gray-200">
                        <Bell className="h-6 w-6 text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
};