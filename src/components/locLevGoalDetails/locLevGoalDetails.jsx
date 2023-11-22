// Define a Location-Level-Goal details component to render the related information on a user's profile
const LocLevGoalDetails = ({ province, district, level, goal }) => {
    return (
        <div className="mx-2 my-4 rounded-md bg-indigo-900 p-2.5 shadow-xl">
            {/* Location information */}
            <h2 className="font-semibold">Preferred playing locations</h2>
            <p className="my-3">
                {province.length > 1 ? "Provinces/Cities:" : "Province/City:"}
                {province.length > 0 ? (
                    province.map((each) => (
                        <span key={each} className="m-1 inline-block rounded-md bg-indigo-600 px-2">
                            {each}
                        </span>
                    ))
                ) : (
                    <span className="mx-1 rounded-md bg-indigo-600 px-2">unspecified</span>
                )}
            </p>
            <p className="mb-8 mt-3">
                {district.length > 1 ? "Districts:" : "District:"}
                {district.length > 0 ? (
                    district.map((each) => (
                        <span key={each} className="m-1 inline-block rounded-md bg-indigo-600 px-2">
                            {each}
                        </span>
                    ))
                ) : (
                    <span className="mx-1 rounded-md bg-indigo-600 px-2">unspecified</span>
                )}
            </p>

            {/* Skill information */}
            <h2 className="font-semibold">Skill level</h2>
            <p className="mb-8 mt-3">
                <span className="mx-1 rounded-md bg-indigo-600 px-2">{level || "unspecified"}</span>
            </p>

            {/* Goal information */}
            <h2 className="font-semibold">{goal.length > 1 ? "Goals" : "Goal"}</h2>
            <p>
                {goal.length > 0 ? (
                    goal.map((each) => (
                        <span key={each} className="m-1 inline-block rounded-md bg-indigo-600 px-2">
                            {each}
                        </span>
                    ))
                ) : (
                    <span className="mx-1 rounded-md bg-indigo-600 px-2">unspecified</span>
                )}
            </p>
        </div>
    );
};

export default LocLevGoalDetails;
