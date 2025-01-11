import { Home, LogOut, Settings, Users } from "lucide-react";

export const SideBar = () => {
    return (
        <>
            <aside className="fixed top-0 left-0 w-[15%] h-screen border-r bg-white shadow-sm flex flex-col z-10">
                <div className="flex-1">
                    <nav className="px-4 space-y-2">

                        <button className="flex items-center w-full p-3 h-16 text-gray-600 rounded-lg hover:bg-gray-100">                        
                        </button>

                        <button className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-100">
                            <Home className="h-5 w-5" />
                            <span className="ml-3">Dashboard</span>
                        </button>

                        <button className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-100">
                            <Users className="h-5 w-5" />
                            <span className="ml-3">Users</span>
                        </button>

                        <button className="flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-gray-100">
                            <Settings className="h-5 w-5" />
                            <span className="ml-3">Settings</span>
                        </button>
                    </nav>
                </div>

                <div className="p-2 border-t">
                    <button className="flex items-center justify-center w-full p-3 text-red-500">
                        <LogOut className="h-5 w-5" />
                        <span className="ml-3">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};