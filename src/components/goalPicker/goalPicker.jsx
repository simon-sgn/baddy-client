import OptionInput from "../optionInput/optionInput";
import Tooltip from "../tooltip/tooltip";

// Define an array of possible goals
const goals = [
    "Win",
    "Have fun",
    "Learn",
    "Teach",
    "Make friends",
    "Network",
    "Improve fitness and health",
    "Other",
];

// Define the GoalPicker component that takes mode, selectedGoal and setSelectedGoal as props
// The mode can be "search" for searching purposes, "edit" for editing the goals on a user's profile
const GoalPicker = ({ mode, selectedGoal, setSelectedGoal }) => {
    // Define a function to handle the change of the checkbox inputs for the goals
    const handleGoalChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedGoal([...selectedGoal, value]);
        } else {
            setSelectedGoal(selectedGoal.filter((item) => item !== value));
        }
    };

    // Return the JSX code for rendering the GoalPicker component
    return (
        <div className="mx-2 my-4 flex flex-col rounded-md bg-indigo-900 p-2.5 shadow-xl">
            <Tooltip id="goalPicker">
                <p className="my-3">
                    <span className="font-bold">How to pick:</span> Select as many goals as you like
                    from the list. If you have any other goals that are not explicitly in the list,
                    please choose &quot;Other&quot; and if you don&apos;t mind, share your specific
                    goal with us at&nbsp;
                    <a href="mailto:simonnguyen.sgn@gmail.com" className="font-semibold">
                        simonnguyen.sgn@gmail.com
                    </a>
                    . We appreciate your feedback and we will consider adding your goal in the
                    future version of Baddy.
                </p>
            </Tooltip>
            <fieldset>
                <legend className="mx-auto mb-2 font-semibold">
                    {mode === "search"
                        ? "What are the goals of the players that you would like to find?"
                        : "What are your badminton goals?"}
                </legend>
                <div className="flex flex-wrap justify-center gap-2.5">
                    {goals.map((goal) => (
                        <OptionInput
                            key={goal}
                            id={goal.toLowerCase().split(" ").join("-")}
                            name="goal"
                            value={goal}
                            onChange={handleGoalChange}
                            checked={selectedGoal.includes(goal)}
                            label={goal}
                            type="checkbox"
                        />
                    ))}
                </div>
            </fieldset>
        </div>
    );
};

export default GoalPicker;
