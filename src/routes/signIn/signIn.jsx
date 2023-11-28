import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUserWithSignIn } from "../../store/userSlice";
import FormInput from "../../components/formInput/formInput";
import Button from "../../components/button/button";
import GoogleSignInButton from "../../components/googleSignInButton/googleSignInButton";
import Spinner from "../../components/spinner/spinner";
import { ReactComponent as BaddyLogo } from "../../assets/baddy.svg";
import buttonTypeClasses from "../../components/button/buttonTypeClasses";

// Define the default values for the form fields
const defaultFormFields = {
    email: "",
    password: "",
};

// Define the SignIn component
const SignIn = () => {
    // Use useState hook to manage the form fields state
    const [{ email, password }, setFormFields] = useState(defaultFormFields);
    // Use useNavigate hook to navigate to different routes programmatically
    const navigate = useNavigate();
    // Use useLocation hook to access the location object of the current route
    const location = useLocation();
    // Get the state parameter from the location object, which contains the previous path before redirecting to sign-in page, or use "/" as default
    const locationState = location.state?.from || "/";
    // Use useSelector hook to access the current user ID and loading from the Redux store
    const userId = useSelector((state) => state.user.currentUser)?.userId;
    const loading = useSelector((state) => state.user.loading);
    // Use useDispatch hook to dispatch Redux actions
    const dispatch = useDispatch();

    // If the user has already signed in, navigate them to the root path
    useEffect(() => {
        if (userId) {
            navigate("/", { replace: true });
        }
    }, [userId, navigate]);

    // Define a function to handle the sign-in form submission
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            // Dispatch the fetchUserWithSignIn thunk action with the email and password as arguments
            // The thunk action will make an API call to sign in the user and update the Redux store with the user data
            // Use unwrap() to extract the payload of a fulfilled action or to throw either the error or, if available, payload created by rejectWithValue from a rejected action
            await dispatch(fetchUserWithSignIn({ email, password })).unwrap();
            // Redirect to the desired page after successful login
            navigate(locationState, { replace: true });
            // Display a success message using toast component
            toast.success("You have successfully signed in!");
        } catch (error) {
            // Construct the error message to display to the user
            let errorMessage;
            if (error.statusCode === 400) {
                errorMessage = `Sign-in failed. ${error.error} Please try again.`;
            } else {
                errorMessage = "Sign-in failed. Please try again.";
            }
            // Display an error message using toast component
            toast.error(errorMessage);
            // Log the error to the console
            console.error("Sign-in failed:", error);
        }
    };

    // Define a function to handle the change of form input values
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields((prevFields) => {
            return {
                ...prevFields,
                [name]: value,
            };
        });
    };

    // Return JSX code that renders the sign-in page UI
    return (
        <>
            <div className="flex justify-center pt-5">
                <BaddyLogo className="h-auto max-w-[8rem]"></BaddyLogo>
            </div>
            <h1 className="text-lg font-extrabold">Sign in</h1>
            <div className="flex flex-col items-center gap-5">
                <div aria-live="polite">
                    {loading && (
                        <div className="flex h-[14.5rem] items-center justify-center">
                            <Spinner />
                        </div>
                    )}
                    {!loading && (
                        <form
                            onSubmit={handleSignIn}
                            className="my-3 flex min-w-[18rem] flex-col gap-3"
                        >
                            <FormInput
                                label="Email address"
                                type="email"
                                required
                                onChange={handleChange}
                                name="email"
                                value={email}
                                id="email"
                                maxLength="150"
                                autoFocus
                                className="max-w-[18rem]"
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                required
                                onChange={handleChange}
                                name="password"
                                value={password}
                                id="password"
                                maxLength="320"
                                className="max-w-[18rem]"
                            />
                            <Button
                                type="submit"
                                className="max-w-[18rem]"
                                buttonType={buttonTypeClasses.invertedButton}
                            >
                                Sign in
                            </Button>
                            <GoogleSignInButton locationState={locationState} />
                        </form>
                    )}
                </div>
                <div className="mx-10 my-3">
                    <h2 className="font-extrabold">
                        Baddy helps you find a badminton buddy in a snap!
                    </h2>
                    <ul>
                        <li>
                            • Search for players who share your availability, location, skill level
                            and more
                        </li>
                        <li>• Showcase your badminton preferences</li>
                        <li>• Chat and invite your badminton buddies to play offline</li>
                    </ul>
                    <Button
                        className="mx-auto my-3 max-w-[18rem]"
                        type="button"
                        buttonType={buttonTypeClasses.invertedButton}
                        onClick={() => navigate("/sign-up")}
                    >
                        Create an account &gt;
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SignIn;
