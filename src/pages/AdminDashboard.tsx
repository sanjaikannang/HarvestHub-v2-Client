import { SideBar } from "../components/admin/Sidebar";
import { TopBar } from "../components/admin/TopBar";

export const AdminDashboard = () => {
  return (
    <div className="flex">
      <SideBar />

      <main className="w-full">
        <TopBar />

        <div className="mt-16 pl-[15%]">
          {/* main content goes here */}

        </div>
      </main>
    </div>
  );
};