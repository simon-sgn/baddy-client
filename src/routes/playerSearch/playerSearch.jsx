import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvailabilityPicker from "../../components/availabilityPicker/availabilityPicker";
import LocationPicker from "../../components/locationPicker/locationPicker";
import LevelPicker from "../../components/levelPicker/levelPicker";
import GoalPicker from "../../components/goalPicker/goalPicker";
import Button from "../../components/button/button";
import buttonTypeClasses from "../../components/button/buttonTypeClasses";

// Define the PlayerSearch component that allows users to search for players based on their preferences
const PlayerSearch = () => {
    // Use state variables to store the selected availability cells, provinces, districts, levels and goals
    const [availability, setAvailability] = useState(new Set());
    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState([]);

    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Define a function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Construct a query string from the state variables
        const queryString =
            "?" +
            new URLSearchParams({
                availability: [...availability].join(","),
                province: selectedProvince.join(","),
                district: selectedDistrict.join(","),
                level: selectedLevel.join(","),
                goal: selectedGoal.join(","),
            }).toString();
        navigate("/search-results" + queryString);
    };

    // Return the JSX elements for rendering the component
    return (
        <>
            <h1 className="pt-3 font-extrabold uppercase">
                Tell us your preferences <br /> and we&apos;ll show you awesome players
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <AvailabilityPicker
                        mode="search"
                        allSelectedCells={availability}
                        setAllSelectedCells={setAvailability}
                        className="md:row-span-3"
                    />
                    <LocationPicker
                        mode="search"
                        selectedProvince={selectedProvince}
                        setSelectedProvince={setSelectedProvince}
                        selectedDistrict={selectedDistrict}
                        setSelectedDistrict={setSelectedDistrict}
                    />
                    <LevelPicker
                        mode="search"
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                    />
                    <GoalPicker
                        mode="search"
                        selectedGoal={selectedGoal}
                        setSelectedGoal={setSelectedGoal}
                    />
                </div>
                <Button
                    type="submit"
                    buttonType={buttonTypeClasses.highlightedButton}
                    className="mx-auto max-w-[18rem]"
                >
                    Find my buddies &gt;
                </Button>
            </form>
        </>
    );
};

export default PlayerSearch;
