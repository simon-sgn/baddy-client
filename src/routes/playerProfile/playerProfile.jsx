import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import AvailabilityPicker from "../../components/availabilityPicker/availabilityPicker";
import LocLevGoalDetails from "../../components/locLevGoalDetails/locLevGoalDetails";
import ProfilePhoto from "../../assets/profilePhoto.png";
import Button from "../../components/button/button";
import Spinner from "../../components/spinner/spinner";
import buttonTypeClasses from "../../components/button/buttonTypeClasses";

// Create a component that renders the player's profile based on their ID
const PlayerProfile = () => {
    // Use useNavigate hook to navigate to different routes programmatically
    const navigate = useNavigate();
    // Use useParams hook to get the player's ID from the URL
    const { playerId } = useParams();
    // Get the current user's ID from the redux store
    const userId = useSelector((state) => state.user.currentUser).userId;

    // If the player's ID is the same as the current user's ID, redirect to the my-profile page
    useEffect(() => {
        if (playerId === userId) {
            navigate("/my-profile", { replace: true });
        }
    }, [playerId, userId, navigate]);

    // Use useFetch custom hook to fetch the player's profile data from the API
    const [data, error, loading] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/player/get-player-profile?playerId=${playerId}`,
        { delay: 300 }
    );

    // Return the JSX element for rendering the player's profile
    return (
        <>
            <h1 className="pt-3 font-extrabold uppercase">Player Profile</h1>
            <div aria-live="polite">
                {loading && <Spinner />}
                {!loading && error && <span className="m-3">{error.message}</span>}
                {!loading && data && (
                    <>
                        <div className="m-3 inline-block rounded-full bg-red-600 p-6">
                            <img
                                src={ProfilePhoto}
                                alt={`${data.name}'s profile photo`}
                                className="mx-auto h-[4rem] w-[4rem]"
                            />
                        </div>
                        <div>
                            <p>
                                Player&apos;s name:
                                <span className="pl-1 capitalize">{data.name}</span>
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <AvailabilityPicker
                                mode="readOnly"
                                allSelectedCells={new Set(data.availability)}
                            />
                            <LocLevGoalDetails
                                province={data.province}
                                district={data.district}
                                level={data.level}
                                goal={data.goal}
                            />
                        </div>
                        <Button
                            type="button"
                            buttonType={buttonTypeClasses.highlightedButton}
                            className="mx-auto max-w-[18rem]"
                            onClick={() => navigate(`/messages/${playerId}`)}
                        >
                            Chat
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export default PlayerProfile;
