/**
 * Slider - A 2-thumb slider component.
 *
 * This component is designed to work with an array of strings, for example: ["Beginner", "Intermediate", "Advanced", "Expert"].
 * However, the core dragging logic is built based on percentages, so it can easily be customized to work with a numeric range as well.
 *
 * @component
 *
 * @param {function} onValueChange - The useState setter function passed from the parent of the slider component. This function is called with an array of selected range values when the slider value changes. For example, in the parent component, if you have `const [selectedLevels, setSelectedLevels] = useState([])`, then you need to pass `onValueChange={setSelectedLevels}`.
 * @param {string[]} rangeArray - Array of strings for the range. Must have at least 2 elements and each element must be unique.
 * @param {string} [minInitialValue] - Initial value for the minimum thumb. Defaults to the first element in rangeArray.
 * @param {string} [maxInitialValue] - Initial value for the maximum thumb. Defaults to the last element in rangeArray.
 *
 * @example
 *
 * // Example usage of Slider
 * // setSelectedLevels is a useState setter function in the parent component
 * <Slider
 *    onValueChange={setSelectedLevels}
 *    rangeArray={["Beginner", "Intermediate", "Advanced", "Expert"]}
 *    minInitialValue="Beginner"
 *    maxInitialValue="Expert"
 * />
 */

import { useState, useEffect, useRef, useCallback } from "react";

// Create an array of class names for Tailwind CSS to generate those classnames to use dynamically for the slider component
// eslint-disable-next-line no-unused-vars
const leftOffsetPercentageClassNames = [
    "left-[0%]",
    "left-[1%]",
    "left-[2%]",
    "left-[3%]",
    "left-[4%]",
    "left-[5%]",
    "left-[6%]",
    "left-[7%]",
    "left-[8%]",
    "left-[9%]",
    "left-[10%]",
    "left-[11%]",
    "left-[12%]",
    "left-[13%]",
    "left-[14%]",
    "left-[15%]",
    "left-[16%]",
    "left-[17%]",
    "left-[18%]",
    "left-[19%]",
    "left-[20%]",
    "left-[21%]",
    "left-[22%]",
    "left-[23%]",
    "left-[24%]",
    "left-[25%]",
    "left-[26%]",
    "left-[27%]",
    "left-[28%]",
    "left-[29%]",
    "left-[30%]",
    "left-[31%]",
    "left-[32%]",
    "left-[33%]",
    "left-[34%]",
    "left-[35%]",
    "left-[36%]",
    "left-[37%]",
    "left-[38%]",
    "left-[39%]",
    "left-[40%]",
    "left-[41%]",
    "left-[42%]",
    "left-[43%]",
    "left-[44%]",
    "left-[45%]",
    "left-[46%]",
    "left-[47%]",
    "left-[48%]",
    "left-[49%]",
    "left-[50%]",
    "left-[51%]",
    "left-[52%]",
    "left-[53%]",
    "left-[54%]",
    "left-[55%]",
    "left-[56%]",
    "left-[57%]",
    "left-[58%]",
    "left-[59%]",
    "left-[60%]",
    "left-[61%]",
    "left-[62%]",
    "left-[63%]",
    "left-[64%]",
    "left-[65%]",
    "left-[66%]",
    "left-[67%]",
    "left-[68%]",
    "left-[69%]",
    "left-[70%]",
    "left-[71%]",
    "left-[72%]",
    "left-[73%]",
    "left-[74%]",
    "left-[75%]",
    "left-[76%]",
    "left-[77%]",
    "left-[78%]",
    "left-[79%]",
    "left-[80%]",
    "left-[81%]",
    "left-[82%]",
    "left-[83%]",
    "left-[84%]",
    "left-[85%]",
    "left-[86%]",
    "left-[87%]",
    "left-[88%]",
    "left-[89%]",
    "left-[90%]",
    "left-[91%]",
    "left-[92%]",
    "left-[93%]",
    "left-[94%]",
    "left-[95%]",
    "left-[96%]",
    "left-[97%]",
    "left-[98%]",
    "left-[99%]",
    "left-[100%]",
];

// Define the Slider component
const Slider = ({ onValueChange, rangeArray, minInitialValue, maxInitialValue }) => {
    // Define state variables for the current values of the thumbs
    const [minThumbValue, setMinThumbValue] = useState(
        minInitialValue ? minInitialValue : rangeArray[0]
    );
    const [maxThumbValue, setMaxThumbValue] = useState(
        maxInitialValue ? maxInitialValue : rangeArray[rangeArray.length - 1]
    );

    // Define a flag to indicate which thumb is being dragged
    const [dragging, setDragging] = useState(null);

    // Define refs for the slider elements
    const minThumbRef = useRef();
    const maxThumbRef = useRef();
    const trackRef = useRef();
    const sliderRef = useRef();

    // Helper functions
    // Define a function to convert a range value to a percentage value
    const getPercentage = useCallback(
        (rangeValue) => {
            return Math.round((rangeArray.indexOf(rangeValue) / (rangeArray.length - 1)) * 100);
        },
        [rangeArray]
    );
    // Define a function to convert a percentage value to a range value
    const getRangeValue = useCallback(
        (percentage) => {
            return rangeArray[Math.round((percentage / 100) * (rangeArray.length - 1))];
        },
        [rangeArray]
    );
    // Define a function to set the style of the thumb
    const setThumbStyle = useCallback(
        (thumb, value) => {
            if (thumb.current) {
                thumb.current.style.left = `${getPercentage(value)}%`;
            }
        },
        [getPercentage]
    );
    // Define a function to set the position and width of the track element
    const setTrackStyle = useCallback(
        (minThumbValue, maxThumbValue) => {
            if (trackRef.current) {
                trackRef.current.style.left = `${getPercentage(minThumbValue)}%`;
                trackRef.current.style.width = `${
                    getPercentage(maxThumbValue) - getPercentage(minThumbValue)
                }%`;
            }
        },
        [getPercentage]
    );
    // Define a function to update the value with the useState setter function passed from the parent of the slider component
    const updateValue = useCallback(
        (minValue, maxValue) => {
            const starting = rangeArray.indexOf(minValue);
            const ending = rangeArray.indexOf(maxValue);
            const resultArray = rangeArray.slice(starting, ending + 1);
            onValueChange(resultArray);
        },
        [onValueChange, rangeArray]
    );
    // Define a function to handle the update of the minimum thumb
    const handleMinThumbUpdate = useCallback(
        (minThumbRef, minThumbValue, maxThumbValue) => {
            setMinThumbValue(minThumbValue);
            setThumbStyle(minThumbRef, minThumbValue);
            setTrackStyle(minThumbValue, maxThumbValue);
            updateValue(minThumbValue, maxThumbValue);
        },
        [setThumbStyle, setTrackStyle, updateValue]
    );
    // Define a function to handle the update of the maximum thumb
    const handleMaxThumbUpdate = useCallback(
        (maxThumbRef, minThumbValue, maxThumbValue) => {
            setMaxThumbValue(maxThumbValue);
            setThumbStyle(maxThumbRef, maxThumbValue);
            setTrackStyle(minThumbValue, maxThumbValue);
            updateValue(minThumbValue, maxThumbValue);
        },
        [setThumbStyle, setTrackStyle, updateValue]
    );

    // Use effect to handle the initial values from the parent
    useEffect(() => {
        if (minInitialValue && maxInitialValue) {
            if (minThumbRef.current && maxThumbRef.current && trackRef.current) {
                handleMinThumbUpdate(minThumbRef, minInitialValue, maxInitialValue);
                handleMaxThumbUpdate(maxThumbRef, minInitialValue, maxInitialValue);
            }
        } else {
            const minValue = rangeArray[0];
            const maxValue = rangeArray[rangeArray.length - 1];

            if (minThumbRef.current && maxThumbRef.current && trackRef.current) {
                handleMinThumbUpdate(minThumbRef, minValue, maxValue);
                handleMaxThumbUpdate(maxThumbRef, minValue, maxValue);
            }
        }
    }, [maxInitialValue, minInitialValue, rangeArray, handleMaxThumbUpdate, handleMinThumbUpdate]);

    // Define a function to handle pointer down events
    const handlePointerDown = useCallback((e, thumb) => {
        e.preventDefault();
        setDragging(thumb);
    }, []);

    // Register event listeners for pointermove and pointerup events
    useEffect(() => {
        if (dragging) {
            const handlePointerMove = (e) => {
                if (dragging && sliderRef.current) {
                    const { left, right } = sliderRef.current.getBoundingClientRect();
                    const width = right - left;
                    let percentage = ((e.clientX - left) / width) * 100;
                    // Clamp the percentage between 0 and 100
                    percentage = Math.min(Math.max(percentage, 0), 100);
                    if (dragging === "minThumb") {
                        // Prevent minThumb from passing the maxThumb
                        percentage = Math.min(percentage, getPercentage(maxThumbValue));
                        const rangeValue = getRangeValue(percentage);
                        handleMinThumbUpdate(minThumbRef, rangeValue, maxThumbValue);
                    } else if (dragging === "maxThumb") {
                        // Prevent maxThumb from passing the minThumb
                        percentage = Math.max(percentage, getPercentage(minThumbValue));
                        const rangeValue = getRangeValue(percentage);
                        handleMaxThumbUpdate(maxThumbRef, minThumbValue, rangeValue);
                    }
                }
            };
            const handlePointerUp = () => {
                setDragging(null);
            };

            document.addEventListener("pointermove", handlePointerMove);
            document.addEventListener("pointerup", handlePointerUp);

            return () => {
                document.removeEventListener("pointermove", handlePointerMove);
                document.removeEventListener("pointerup", handlePointerUp);
            };
        }
    }, [
        dragging,
        getPercentage,
        getRangeValue,
        maxThumbValue,
        minThumbValue,
        handleMaxThumbUpdate,
        handleMinThumbUpdate,
    ]);

    // Define a function to handle click events on the thumbs
    const handleClick = useCallback(
        (rangeValue) => {
            // Decide which thumb to move based on the distance between the rangeValue and the two thumbs
            if (
                getPercentage(rangeValue) - getPercentage(minThumbValue) >=
                getPercentage(maxThumbValue) - getPercentage(rangeValue)
            ) {
                handleMaxThumbUpdate(maxThumbRef, minThumbValue, rangeValue);
            } else {
                handleMinThumbUpdate(minThumbRef, rangeValue, maxThumbValue);
            }
        },
        [getPercentage, handleMaxThumbUpdate, handleMinThumbUpdate, maxThumbValue, minThumbValue]
    );

    // Define a function to handle keyboard usage
    const handleKeyDown = useCallback(
        (e, thumb) => {
            // Prevent the default scrolling behavior of the arrow keys
            if (e.keyCode === 37 || e.keyCode === 39) {
                e.preventDefault();
                // Define the step value for the slider
                const step = 1;
                // Define the percentage increment or decrement based on the step value
                const percentageStep = (step / (rangeArray.length - 1)) * 100;
                // Get the current percentage of the thumb
                let percentage = getPercentage(
                    thumb === "minThumb" ? minThumbValue : maxThumbValue
                );
                // Check which arrow key is pressed and adjust the percentage accordingly
                if (e.keyCode === 37) {
                    // Left arrow key
                    percentage -= percentageStep;
                } else if (e.keyCode === 39) {
                    // Right arrow key
                    percentage += percentageStep;
                }
                // Clamp the percentage between 0 and 100
                percentage = Math.min(Math.max(percentage, 0), 100);
                // Update the state and styles of the thumb and track elements
                if (thumb === "minThumb") {
                    // Prevent minThumb from passing the maxThumb
                    percentage = Math.min(percentage, getPercentage(maxThumbValue));
                    // Get the range value corresponding to the percentage
                    const rangeValue = getRangeValue(percentage);
                    handleMinThumbUpdate(minThumbRef, rangeValue, maxThumbValue);
                } else if (thumb === "maxThumb") {
                    // Prevent maxThumb from passing the minThumb
                    percentage = Math.max(percentage, getPercentage(minThumbValue));
                    // Get the range value corresponding to the percentage
                    const rangeValue = getRangeValue(percentage);
                    handleMaxThumbUpdate(maxThumbRef, minThumbValue, rangeValue);
                }
            }
        },
        [
            getPercentage,
            getRangeValue,
            handleMaxThumbUpdate,
            handleMinThumbUpdate,
            maxThumbValue,
            minThumbValue,
            rangeArray,
        ]
    );

    return (
        <div className="slider-container">
            <div className="slider relative h-[3.5rem] w-[16rem] bg-indigo-900" ref={sliderRef}>
                <div className="slider-track-background absolute top-[1rem] h-[0.5rem] w-full touch-none bg-red-100">
                    <div className="slider-marks absolute w-full">
                        {rangeArray.map((rangeValue) => (
                            <div
                                onClick={() => handleClick(rangeValue)}
                                key={rangeValue}
                                className={`absolute left-[${Math.round(
                                    getPercentage(rangeValue)
                                )}%] z-[5] h-[1rem] w-[1rem] translate-x-[-50%] translate-y-[-25%] cursor-pointer select-none rounded-full bg-indigo-100`}
                            ></div>
                        ))}
                    </div>
                    <div className="slider-mark-labels absolute top-5 w-full select-none">
                        {rangeArray.map((rangeValue) => (
                            <div
                                key={rangeValue}
                                className={`absolute left-[${Math.round(
                                    getPercentage(rangeValue)
                                )}%] translate-x-[-50%]`}
                            >
                                {rangeValue}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="slider-track absolute top-[1rem] h-[0.5rem] w-[100%] touch-none bg-indigo-500"
                    ref={trackRef}
                ></div>
                <div className="slider-thumb-container relative -left-[0.625rem]">
                    <button
                        className={`min-slider-thumb absolute top-[0.625rem] ${
                            // Adjust the z-index of the minThumb when it reaches the largest value in the rangeArray. Otherwise, it will get stuck there because the maxThumb, which is on top of it, prevents it from being selected
                            minThumbValue === rangeArray[rangeArray.length - 1] ? "z-[11]" : "z-10"
                        } h-[1.25rem] w-[1.25rem] cursor-pointer touch-none rounded-[50%] border-2 border-indigo-100 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-900`}
                        ref={minThumbRef}
                        onPointerDown={(e) => handlePointerDown(e, "minThumb")}
                        onKeyDown={(e) => handleKeyDown(e, "minThumb")}
                        type="button"
                        role="slider"
                        aria-valuemin={0}
                        aria-valuemax={rangeArray.length - 1}
                        aria-valuenow={rangeArray.indexOf(minThumbValue)}
                        aria-valuetext={minThumbValue}
                    ></button>
                    <button
                        className="max-slider-thumb absolute top-[0.625rem] z-10 h-[1.25rem] w-[1.25rem] cursor-pointer touch-none  rounded-[50%] border-2 border-indigo-200 bg-indigo-700 hover:bg-indigo-600 active:bg-indigo-900"
                        ref={maxThumbRef}
                        onPointerDown={(e) => handlePointerDown(e, "maxThumb")}
                        onKeyDown={(e) => handleKeyDown(e, "maxThumb")}
                        type="button"
                        aria-valuemin={0}
                        aria-valuemax={rangeArray.length - 1}
                        aria-valuenow={rangeArray.indexOf(maxThumbValue)}
                        aria-valuetext={maxThumbValue}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default Slider;
