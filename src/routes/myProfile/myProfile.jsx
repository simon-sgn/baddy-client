import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useFetchInsideEventHandler from "../../hooks/useFetchInsideEventHandler";
import { toast } from "react-toastify";
import { signOut } from "../../store/userSlice";
import AvailabilityPicker from "../../components/availabilityPicker/availabilityPicker";
import GoalPicker from "../../components/goalPicker/goalPicker";
import LocationPicker from "../../components/locationPicker/locationPicker";
import LevelPicker from "../../components/levelPicker/levelPicker";
import LocLevGoalDetails from "../../components/locLevGoalDetails/locLevGoalDetails";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";
import ProfilePhoto from "../../assets/profilePhoto.png";
import buttonTypeClasses from "../../components/button/buttonTypeClasses";

// Define a functional component named MyProfile that renders the user's profile page
const MyProfile = () => {
    // Use state variables to store the user's information and preferences
    // These state variables will be updated when the user edits their profile
    const [availability, setAvailability] = useState(new Set());
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState([]);
    const [level, setLevel] = useState("");
    const [goal, setGoal] = useState([]);

    // Use the useDispatch hook to get a reference to the dispatch function of the Redux store
    const dispatch = useDispatch();
    // Use the useNavigate hook to get a function that can navigate to different pages programmatically
    const navigate = useNavigate();
    // Get the fetchInsideEventHandler from the custom hook
    const fetchInsideEventHandler = useFetchInsideEventHandler();

    // Use two boolean state variables to manage the editing state
    const [isEditing, setIsEditing] = useState(false); // Indicates whether the user is currently editing their profile
    const [hasEdited, setHasEdited] = useState(false); // Indicates whether the user has ever edited their profile

    // Use the useSelector hook to get the userId of the current user from the Redux store
    const userId = useSelector((state) => state.user.currentUser).userId;

    // Use the useFetch custom hook to make a GET request to fetch the user's profile data from the server
    const [data, error, loading] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/user/get-user-profile?userId=${userId}`,
        { delay: 300 }
    );

    // Define the handleEdit function to set isEditing to true when the user starts editing
    // and only set the state variables to the values from "data" if hasEdited is false
    const handleEdit = () => {
        if (!hasEdited) {
            setAvailability(new Set(data?.availability));
            setProvince(data?.province);
            setDistrict(data?.district);
            setLevel(data?.level);
            setGoal(data?.goal);
        }
        setIsEditing(true);
    };

    // Define a function to handle finishing editing the user's profile
    const handleEditFinish = async (e) => {
        e.preventDefault();
        try {
            // Use the fetchInsideEventHandler utility function to make a PUT request to update the user's profile data on the server
            await fetchInsideEventHandler(
                `${import.meta.env.VITE_APP_API_URL}/api/user/update-user-profile?userId=${userId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        availability: [...availability],
                        province,
                        district,
                        level,
                        goal,
                    }),
                }
            );
            setIsEditing(false);
            if (!hasEdited) {
                setHasEdited(true);
            }
        } catch (error) {
            toast.error("Error updating user's information. Please try again later.");
            console.error("Error updating user's information:", error);
        }
    };

    // Define a function to handle signing out the user
    const handleSignOut = async (e) => {
        e.preventDefault();
        try {
            // Dispatch the signOut thunk action with the userId as an argument
            // The signOut thunk action will make an API call to sign out the user and update the Redux store with null user data
            // Use unwrap() to extract the payload of a fulfilled action or to throw either the error or, if available, payload created by rejectWithValue from a rejected action
            await dispatch(signOut()).unwrap();
            // Navigate to the sign-in page after successful sign-out
            navigate("/sign-in");
        } catch (error) {
            toast.error("Sign-out failed. Please try again.");
            console.error("Sign-out failed:", error);
        }
    };

    // Return a JSX element that renders the user's profile page
    return (
        <>
            <h1 className="pt-3 font-extrabold uppercase">My Profile</h1>
            <div aria-live="polite">
                {loading && <Spinner />}
                {!loading && error && <span className="m-3">{error.message}</span>}
                {!loading && data && (
                    <>
                        <div className="m-3 inline-block rounded-full bg-indigo-900 p-6">
                            <img
                                src={ProfilePhoto}
                                alt={`${data.name}'s profile photo`}
                                className="mx-auto h-[4rem] w-[4rem]"
                            />
                        </div>
                        <div>
                            <p>
                                Display name:
                                <span className="pl-1 capitalize">{data.name}</span>
                            </p>
                            <p>
                                Email: <span className="pl-1">{data.email}</span>
                            </p>
                        </div>
                        {/* Use conditional rendering to show or hide the form elements based on the edit mode */}
                        {isEditing ? (
                            // Show the form elements if the edit mode is true
                            <form onSubmit={handleEditFinish}>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <AvailabilityPicker
                                        mode="edit"
                                        allSelectedCells={availability}
                                        setAllSelectedCells={setAvailability}
                                        className="md:row-span-3"
                                    />
                                    <LocationPicker
                                        mode="edit"
                                        selectedProvince={province}
                                        setSelectedProvince={setProvince}
                                        selectedDistrict={district}
                                        setSelectedDistrict={setDistrict}
                                    />
                                    <LevelPicker
                                        mode="edit"
                                        selectedLevel={level}
                                        setSelectedLevel={setLevel}
                                    />
                                    <GoalPicker
                                        mode="edit"
                                        selectedGoal={goal}
                                        setSelectedGoal={setGoal}
                                    />
                                </div>
                                <Button type="submit" className="mx-auto max-w-[18rem]">
                                    Save my preferences
                                </Button>
                            </form>
                        ) : (
                            // Show the plain text if the edit mode is false
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <AvailabilityPicker
                                        mode="readOnly"
                                        allSelectedCells={
                                            hasEdited ? availability : new Set(data.availability)
                                        }
                                    />
                                    <LocLevGoalDetails
                                        province={hasEdited ? province : data.province}
                                        district={hasEdited ? district : data.district}
                                        level={hasEdited ? level : data.level}
                                        goal={hasEdited ? goal : data.goal}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleEdit}
                                    buttonType={buttonTypeClasses.highlightedButton}
                                    className="mx-auto max-w-[18rem]"
                                >
                                    Edit my preferences
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSignOut}
                                    buttonType={buttonTypeClasses.invertedButton}
                                    className="mx-auto mt-4 max-w-[18rem]"
                                >
                                    Sign out
                                </Button>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
export default MyProfile;
