import OptionInput from "../optionInput/optionInput";
import Slider from "../slider/slider";
import Tooltip from "../tooltip/tooltip";

// Define an array of possible levels
const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

// Define the LevelPicker component that takes mode, selectedLevel and setSelectedLevel as props
// The mode can be "search" for searching purposes, "edit" for editing the level on a user's profile
const LevelPicker = ({ mode, selectedLevel, setSelectedLevel }) => {
    // Define a function to use in "edit" mode to handle the change of the input elements
    const handleLevelChange = (e) => {
        const { value, checked } = e.target;
        // If mode is "edit", use setSelectedLevel with selectedLevel as a string
        if (checked) {
            setSelectedLevel(value);
        }
    };

    // Return the JSX code for rendering the LevelPicker component
    return (
        <div className="mx-2 my-4 flex flex-col rounded-md bg-indigo-900 p-2.5 shadow-xl">
            <Tooltip id="levelPicker">
                <p className="my-3">
                    <span className="font-bold">How to pick:</span> Please refer to Baddy&apos;s
                    level descriptions below:
                </p>
                <ul>
                    <li className="my-3">
                        <span className="font-semibold">Beginner:</span> Beginner badminton players
                        can play a few simple shots with low speed, power, and accuracy. They have
                        limited technical skills, tactical knowledge, and consistency. They can also
                        enjoy the game without worrying too much about the score or the outcome.
                    </li>
                    <li className="my-3">
                        <span className="font-semibold">Intermediate:</span> Intermediate badminton
                        players can play some basic shots with fair speed, power, and accuracy. They
                        have moderate technical skills, tactical knowledge, and consistency. They
                        can also follow some simple strategies and rules.
                    </li>
                    <li className="my-3">
                        <span className="font-semibold">Advanced:</span> Advanced badminton players,
                        who can play a variety of shots with decent speed, power, and accuracy. They
                        have good technical skills, tactical knowledge, and consistency. They can
                        also handle different situations and challenges well.
                    </li>
                    <li className="my-3">
                        <span className="font-semibold">Expert:</span> Expert badminton players can
                        play fast, powerful, and accurate shots in any situation. They have very
                        good technical skills, tactical knowledge, and consistency. They can also
                        adapt to different opponents and strategies quickly.
                    </li>
                </ul>
            </Tooltip>
            <fieldset>
                <legend className="mx-auto mb-2 font-semibold">
                    {mode === "search"
                        ? "What is your preferred skill level range for badminton buddies?"
                        : "What is your badminton playing level?"}
                </legend>
                <div className="flex flex-wrap justify-center gap-2.5">
                    {mode === "search" ? (
                        <Slider rangeArray={levels} onValueChange={setSelectedLevel} />
                    ) : (
                        levels.map((level) => (
                            <OptionInput
                                key={level}
                                id={level.toLowerCase()}
                                name="level"
                                value={level}
                                onChange={handleLevelChange}
                                checked={selectedLevel === level}
                                label={level}
                                type="radio"
                            />
                        ))
                    )}
                </div>
            </fieldset>
        </div>
    );
};

export default LevelPicker;
