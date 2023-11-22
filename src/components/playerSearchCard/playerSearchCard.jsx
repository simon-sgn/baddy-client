import { useNavigate } from "react-router-dom";
import ProfilePhoto from "../../assets/profilePhoto.png";
import Button from "../button/button";
import buttonTypeClasses from "../button/buttonTypeClasses";

// Define a helper function that formats an array into a string
const formatArray = (array, limit) => {
    return array.length > 0
        ? `${array.slice(0, limit).join(", ")}${array.length > limit ? ",..." : ""}`
        : "Unspecified";
};

// Define a PlayerSearchCard component that takes a player prop
const PlayerSearchCard = ({ player }) => {
    // Destructure the player object to get the relevant fields
    const { _id, name, province, district, level, goal } = player;

    // Get the navigate function from useNavigate() hook
    const navigate = useNavigate();

    // Use the helper function to format the province, district, and goal arrays
    const provinceString = formatArray(province, 3);
    const districtString = formatArray(district, 3);
    const goalString = formatArray(goal, 3);

    // Return a JSX element that displays the player's brief information
    return (
        <div className="m-3 rounded-md bg-indigo-900 p-4 text-sm">
            <h2 className="font-bold capitalize">{name}</h2>
            <div className="m-3 inline-block rounded-full bg-red-500 p-3">
                <img
                    src={ProfilePhoto}
                    alt={`{${name}'s profile photo}`}
                    className="mx-auto h-[2.5rem] w-[2.5rem] md:h-[3.5rem] md:w-[3.5rem]"
                />
            </div>
            <p className="m-1 font-light">
                <span className="font-bold">
                    {province.length > 1 ? "Provinces: " : "Province: "}
                </span>
                {provinceString}
            </p>
            <p className=" m-1 font-light">
                <span className="font-bold">
                    {district.length > 1 ? "Districts: " : "District: "}
                </span>
                {districtString}
            </p>
            <p className="m-1 font-light">
                <span className="font-bold">Level: </span>
                {level ? level : "Unspecified"}
            </p>
            <p className="m-1 font-light">
                <span className="font-bold"> {goal.length > 1 ? "Goals: " : "Goal: "}</span>
                {goalString}
            </p>

            <Button
                type="button"
                buttonType={buttonTypeClasses.baseButton}
                aria-label={`View ${name}'s full profile`}
                onClick={() => navigate(`/player/${_id}`)}
                className="mx-auto mt-3 max-w-[18rem]"
            >
                View full profile &gt;
            </Button>
        </div>
    );
};

export default PlayerSearchCard;
