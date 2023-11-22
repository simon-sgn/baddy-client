import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUserWithGoogleSignIn } from "../../store/userSlice";

// Define a component that renders a Google sign-in button using the Google Sign-In client library (https://developers.google.com/identity/gsi/web/guides/overview)
const GoogleSignInButton = ({ className, locationState }) => {
    // Define a state variable to track if the Google script is loaded
    const [googleLoaded, setGoogleLoaded] = useState(false);
    // Use useDispatch hook to dispatch Redux actions
    const dispatch = useDispatch();
    // Use useNavigate hook to navigate to different routes programmatically
    const navigate = useNavigate();
    // Use useRef hook to create a reference to the button div element
    const buttonDivRef = useRef();

    // Use an effect hook to load the Google script dynamically
    useEffect(() => {
        // Define the URL of the Google script
        const googleScriptURL = "https://accounts.google.com/gsi/client?h1=en";
        const scriptTag = document.createElement("script");
        scriptTag.src = googleScriptURL;
        scriptTag.addEventListener("load", () => setGoogleLoaded(true));
        // Append the scriptTag after the last child of the document's body
        document.body.append(scriptTag);
        // Return a clean-up function to remove the scriptTag
        return () => scriptTag.remove();
    }, []);

    // Use another effect hook to initialize and render the Google Sign-In button
    useEffect(() => {
        // Do nothing if the Google script is not loaded yet
        if (!googleLoaded) return;
        // Define a function to handle the credential response from Google
        async function handleCredentialResponse(response) {
            // Get the ID token from the response object
            let idToken = response.credential;
            try {
                await dispatch(fetchUserWithGoogleSignIn(idToken)).unwrap();
                navigate(locationState, { replace: true });
                toast.success("You have successfully signed in with Google!");
            } catch (error) {
                toast.error("Sign-in with Google failed. Please try again.");
                console.error("Token sign-in failed:", error);
            }
        }

        // Initialize the Google Sign-In client with the client ID and callback function
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
        });

        // // Get the button div element using the ref object
        const buttonDiv = buttonDivRef.current;

        // Render the Google Sign-In button with the desired theme and size
        window.google.accounts.id.renderButton(buttonDiv, {
            theme: "filled_blue",
            size: "large",
            shape: "square",
            width: "288",
            locale: "en",
        });
        window.google.accounts.id.prompt();
    }, [googleLoaded, dispatch, navigate, locationState]);

    return <div ref={buttonDivRef} className={className}></div>;
};

export default GoogleSignInButton;
