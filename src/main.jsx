import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import MainLayout from "./layouts/mainLayout/mainLayout";
import PublicLayout from "./layouts/publicLayout/publicLayout";
import AuthWrapper from "./components/authWrapper/authWrapper";
import PlayerSearch from "./routes/playerSearch/playerSearch";
import SignIn from "./routes/signIn/signIn";
import SignUp from "./routes/signUp/signUp";
import Messages from "./routes/messages/messages";
import PlayerProfile from "./routes/playerProfile/playerProfile";
import MyProfile from "./routes/myProfile/myProfile";
import SearchResults from "./routes/searchResults/searchResults";
import ErrorMessage from "./components/errorMessage/errorMessage";
import NotFound from "./routes/notFound/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// The router defines the structure of the web app's routes and their corresponding components
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthWrapper>
                <MainLayout />
            </AuthWrapper>
        ),
        children: [
            {
                index: true,
                element: <PlayerSearch />,
            },

            {
                path: "my-profile",
                element: <MyProfile />,
            },
            {
                path: "player/:playerId",
                element: <PlayerProfile />,
            },
            {
                path: "messages/:receiverId?",
                element: <Messages />,
            },
            {
                path: "search-results",
                element: <SearchResults />,
            },
        ],
        errorElement: <ErrorMessage />,
    },
    {
        element: <PublicLayout />,
        children: [
            {
                path: "sign-in",
                element: <SignIn />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
        errorElement: <ErrorMessage />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
                <ToastContainer
                    hideProgressBar="true"
                    bodyClassName="custom-toast-style"
                    limit="4"
                />
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
