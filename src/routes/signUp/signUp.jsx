import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUserWithSignUp } from "../../store/userSlice";
import FormInput from "../../components/formInput/formInput";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";
import { ReactComponent as BaddyLogo } from "../../assets/baddy.svg";
import buttonTypeClasses from "../../components/button/buttonTypeClasses";

// Define the default values for the form fields
const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

// Define the SignUp component
const SignUp = () => {
    // Use useState hook to manage the form fields state
    const [{ name, email, password, confirmPassword }, setFormFields] = useState(defaultFormFields);
    // Use the useDispatch hook to dispatch actions to the Redux store
    const dispatch = useDispatch();
    // Use the useLocation hook to access the location object of the current route
    const location = useLocation();
    // Use the useNavigate hook to navigate programmatically
    const navigate = useNavigate();
    // Get the location state object that contains the path to redirect after sign up
    const locationState = location.state?.from || "/";
    // Use useSelector hook to access the current user ID and loading from the Redux store
    const userId = useSelector((state) => state.user.currentUser)?.userId;
    const loading = useSelector((state) => state.user.loading);

    // If the user has already signed up, navigate them to the root path
    useEffect(() => {
        if (userId) {
            navigate("/", { replace: true });
        }
    }, [userId, navigate]);

    // Define a function to handle sign up when the form is submitted
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }
        try {
            // Dispatch the fetchUserWithSignUp thunk action with the email and password as arguments
            // The thunk action will make an API call to sign up (and also sign in) the user and update the Redux store with the user data
            // Use unwrap() to extract the payload of a fulfilled action or to throw either the error or, if available, payload created by rejectWithValue from a rejected action
            await dispatch(fetchUserWithSignUp({ email, password, name })).unwrap();
            // Redirect to the desired page after successful sign up
            navigate(locationState, { replace: true });
            // Display a success message using toast component
            toast.success("You have successfully signed up!");
        } catch (error) {
            // Construct the error message to display to the user
            let errorMessage;
            if (error.statusCode === 400) {
                errorMessage = `Sign-up failed. ${error.error} Please try again.`;
            } else {
                errorMessage = "Sign-up failed. Please try again.";
            }
            // Display an error message using toast component
            toast.error(errorMessage);
            // Log the error to the console
            console.error("Sign up failed:", error);
        }
    };

    // Define a function to handle input change events
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields((prevFields) => {
            return {
                ...prevFields,
                [name]: value,
            };
        });
    };

    // Return JSX code that renders the sign-up page UI
    return (
        <>
            <div className="flex justify-center pt-5">
                <BaddyLogo className="h-auto max-w-[8rem]"></BaddyLogo>
            </div>
            <h1 className="text-lg font-extrabold">Sign up</h1>
            <div className="flex flex-col items-center gap-5">
                <div aria-live="polite">
                    {loading && <Spinner />}
                    {!loading && (
                        <form onSubmit={handleSignUp} className="min-w-[18rem]">
                            <FormInput
                                label="Display name"
                                type="text"
                                required
                                onChange={handleChange}
                                name="name"
                                value={name}
                                id="name"
                                maxLength="150"
                                autoFocus
                                className="my-3 max-w-[18rem]"
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                required
                                onChange={handleChange}
                                name="email"
                                value={email}
                                id="email"
                                maxLength="320"
                                className="my-3 max-w-[18rem]"
                            />
                            <FormInput
                                label="Password"
                                type="password"
                                required
                                onChange={handleChange}
                                name="password"
                                value={password}
                                id="password"
                                maxLength="64"
                                className="my-3 max-w-[18rem]"
                            />
                            <FormInput
                                label="Confirm password"
                                type="password"
                                required
                                onChange={handleChange}
                                name="confirmPassword"
                                value={confirmPassword}
                                id="confirmPassword"
                                maxLength="64"
                                className="my-3 max-w-[18rem]"
                            />
                            <Button
                                type="submit"
                                className="my-3 max-w-[18rem]"
                                buttonType={buttonTypeClasses.invertedButton}
                            >
                                Create Account
                            </Button>
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
                        onClick={() => navigate("/sign-in")}
                    >
                        Sign in &gt;
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SignUp;
