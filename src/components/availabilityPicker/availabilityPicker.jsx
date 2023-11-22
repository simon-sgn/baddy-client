import { useState, useEffect, useRef } from "react";
import Tooltip from "../tooltip/tooltip";

// Define an array of time slots for each day
const timeSlots = [
    "0:00",
    "1:00",
    "2:00",
    "3:00",
    "4:00",
    "5:00",
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
];

// Define an array of days for each week
const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

// Define an object with the full names of days to use for accessibility improvement
const dayNames = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
};

// Define a function component for rendering an availability table
// It supports three modes: "search" for searching, "edit" for editing user profiles, and "readOnly" for display.
const AvailabilityPicker = ({ mode, allSelectedCells, setAllSelectedCells, className }) => {
    // Define state variables to store the selected and deselected cells in a single turn of selecting/deselecting
    const [selectedCells, setSelectedCells] = useState(new Set());
    const [deselectedCells, setDeselectedCells] = useState(new Set());
    // Define a state variable to store the pointer down status
    const [pointerDown, setPointerDown] = useState(false);
    // Define a state variable to store the selection mode (true for selecting and false for deselecting)
    const [selectMode, setSelectMode] = useState(true);
    // Define a state variable to store the start cell of the selection rectangle
    const [startCell, setStartCell] = useState(null);
    // Add a ref for the table element
    const tableRef = useRef(null);

    // Define a function to handle the click & touch event on a cell
    const handleCellSelect = (day, time) => {
        const cell = `${day}-${time}`;
        // Check if the start cell is null or not
        if (startCell === null) {
            // If null, set it as the current cell
            setStartCell(cell);
            const isAlreadySelected = allSelectedCells.has(cell);
            // Set the selection mode based on the current cell status
            setSelectMode(!isAlreadySelected);
            // Select or deselect the current cell based on the current cell status
            if (isAlreadySelected) {
                setDeselectedCells(new Set([cell]));
                setAllSelectedCells(
                    (prev) => new Set([...prev].filter((element) => element !== cell))
                );
            } else {
                setSelectedCells(new Set([cell]));
                setAllSelectedCells((prev) => new Set([...prev, cell]));
            }
        } else {
            // If not null, set it as the end cell and cover all the cells within the rectangle
            const endCell = cell;
            // Get the indices of the start and end cells in the days and timeSlots arrays
            const startDayIndex = days.indexOf(startCell.split("-")[0]);
            const endDayIndex = days.indexOf(endCell.split("-")[0]);
            const startTimeIndex = timeSlots.indexOf(startCell.split("-")[1]);
            const endTimeIndex = timeSlots.indexOf(endCell.split("-")[1]);
            // Determine the minimum and maximum indices for looping
            const minDayIndex = Math.min(startDayIndex, endDayIndex);
            const maxDayIndex = Math.max(startDayIndex, endDayIndex);
            const minTimeIndex = Math.min(startTimeIndex, endTimeIndex);
            const maxTimeIndex = Math.max(startTimeIndex, endTimeIndex);
            // Create a new set to store the covered cells
            const newSetInRectangle = new Set();
            // Loop through the days and timeSlots arrays within the range of indices
            for (let i = minDayIndex; i <= maxDayIndex; i++) {
                for (let j = minTimeIndex; j <= maxTimeIndex; j++) {
                    const cell = `${days[i]}-${timeSlots[j]}`;
                    newSetInRectangle.add(cell);
                }
            }
            if (selectMode) {
                setSelectedCells(newSetInRectangle);
                // Add the selected cells to the allSelectedCells Set without duplicates
                setAllSelectedCells((prev) => new Set([...prev, ...newSetInRectangle]));
            } else {
                setDeselectedCells(newSetInRectangle);
                // Remove the selected cells from the allSelectedCells Set
                setAllSelectedCells(
                    (prev) =>
                        new Set([...prev].filter((element) => !newSetInRectangle.has(element)))
                );
            }
        }
    };

    // Define a function to handle the pointerup event
    const handlePointerUp = () => {
        setStartCell(null);
        setPointerDown(false);
        setSelectedCells(new Set());
        setDeselectedCells(new Set());
    };

    // Define a function to handle the pointerdown event
    const handlePointerDown = (e, day, time) => {
        if (e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }
        if (!(mode === "readOnly")) {
            setPointerDown(true);
            handleCellSelect(day, time);
        }
    };

    // Define a function to handle the pointerover event
    const handlePointerOver = (day, time) => {
        if (!(mode === "readOnly")) {
            pointerDown && handleCellSelect(day, time);
        }
    };

    // Define a function to help keyboard navigation
    const handleKeyDown = (e, day, time) => {
        if (!(mode === "readOnly") && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            const cell = `${day}-${time}`;
            if (allSelectedCells.has(cell)) {
                // If the cell is already selected, remove it from the selection
                setAllSelectedCells(
                    (prev) => new Set([...prev].filter((element) => element !== cell))
                );
            } else {
                // If the cell is not selected, add it to the selection
                setAllSelectedCells((prev) => new Set([...prev, cell]));
            }
        }
    };

    // Use an effect hook to add and remove event listeners for pointerup events
    useEffect(() => {
        if (pointerDown) {
            document.addEventListener("pointerup", handlePointerUp);
            return () => {
                document.removeEventListener("pointerup", handlePointerUp);
            };
        }
    }, [pointerDown]);

    // Define a availabilityTable const to make it reusable in the return statement of component
    const availabilityTable = (
        <div className="rounded-md bg-red-100 p-2">
            <table
                ref={tableRef}
                onContextMenu={(e) => e.preventDefault()}
                className={`${mode !== "readOnly" && "touch-none"} text-indigo-900`}
            >
                <thead>
                    <tr>
                        <th></th>
                        {days.map((day) => (
                            <th key={day} className="w-10 md:w-12">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {timeSlots.map((time) => (
                        <tr key={time}>
                            <td className="h-5 -translate-x-1 -translate-y-2.5 select-none text-xs">
                                {time}
                            </td>
                            {days.map((day) => (
                                <td
                                    data-day={day}
                                    data-time={time}
                                    aria-label={`Cell representing the one-hour slot starting from ${time} on ${dayNames[day]}`}
                                    role="checkbox"
                                    aria-checked={allSelectedCells.has(`${day}-${time}`)}
                                    tabIndex="0"
                                    key={day}
                                    className={`select-none border border-solid border-gray-400 ${
                                        selectedCells.has(`${day}-${time}`)
                                            ? "bg-indigo-700"
                                            : allSelectedCells.has(`${day}-${time}`)
                                            ? "bg-indigo-900"
                                            : deselectedCells.has(`${day}-${time}`)
                                            ? "bg-white"
                                            : ""
                                    }`}
                                    onPointerOver={() => {
                                        handlePointerOver(day, time);
                                    }}
                                    onPointerDown={(e) => {
                                        handlePointerDown(e, day, time);
                                    }}
                                    onKeyDown={(e) => handleKeyDown(e, day, time)}
                                ></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    // Return the JSX elements for rendering the AvailabilityPicker component
    return (
        <div
            className={`${className} mx-2 my-4 flex flex-col items-center rounded-md bg-indigo-900 p-2.5 shadow-xl`}
        >
            {mode !== "readOnly" && (
                <Tooltip id="availabilityPicker">
                    <p className="my-3">
                        <span className="font-bold">How to pick:</span> Choose your preferred time
                        slots by selecting the cells from the availability table below. Each cell
                        represents a one-hour slot on a specific day of the week.
                    </p>
                </Tooltip>
            )}
            {mode === "readOnly" ? (
                <>
                    <h2 className="mb-2 font-semibold">Current time slots preferences</h2>
                    {availabilityTable}
                </>
            ) : (
                <fieldset>
                    <legend className="mx-auto mb-2 font-semibold">
                        {mode === "search" && "Pick your weekly time slots preferences"}
                        {mode === "edit" && "Select your available time slots"}
                    </legend>
                    {availabilityTable}
                    <p className="pt-2">{`You have selected ${allSelectedCells.size} time slots.`}</p>
                </fieldset>
            )}
        </div>
    );
};

export default AvailabilityPicker;
