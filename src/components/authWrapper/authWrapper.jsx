import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Define an AuthWrapper component
const AuthWrapper = ({ redirectPath = "/sign-in", children }) => {
    // Get the current user from the Redux store using useSelector hook
    const currentUser = useSelector((state) => state.user?.currentUser);
    // Get the current location object from React Router using useLocation hook
    const location = useLocation();

    // If there is no current user (i.e., the user has not signed in)
    if (!currentUser) {
        // Redirect to the sign-in page, replacing the current entry in the history stack
        // Pass the current pathname in the state object to be able to redirect back to this page after signing in
        return <Navigate to={redirectPath} replace state={{ from: location.pathname }} />;
    }

    // If there is a current user, render the children components
    return children;
};

export default AuthWrapper;
