import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/navigationBar/navigationBar";

// Define the main layout for routes that require authentication, such as player search, messages, and player's profile
const MainLayout = () => {
    return (
        <div className="min-h-[100svh] pb-3 md:pb-10">
            <NavigationBar />
            <main className="mx-auto max-w-[1280px] text-sm">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
