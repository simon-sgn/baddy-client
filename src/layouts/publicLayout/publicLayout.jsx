import { Outlet } from "react-router-dom";

// Define a public layout for routes that do not require authentication, such as sign-in and sign-up
const PublicLayout = () => {
    return (
        <main className="min-h-[100svh] bg-white text-indigo-900 md:mt-10">
            <Outlet />
        </main>
    );
};

export default PublicLayout;
