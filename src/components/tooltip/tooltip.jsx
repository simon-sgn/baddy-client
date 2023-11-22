import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { openTooltip, closeTooltip } from "../../store/tooltipSlice";
import { ReactComponent as InfoIcon } from "../../assets/info.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";

// Define the tooltip component
const Tooltip = ({ children, id }) => {
    // Get the 'dispatch' function from Redux to dispatch actions to the store
    const dispatch = useDispatch();
    // Get the pathname from the location object from useLocation hook to track page navigation and dispatch closeTooltip accordingly
    const pathName = useLocation().pathname;
    // Get the currently openTooltipId from the Redux store
    const openTooltipId = useSelector((state) => state.tooltip.openTooltip);
    // Determine if this tooltip is currently open by comparing its ID with the openTooltipId from the Redux store
    const isThisTooltipOpen = openTooltipId === id;

    // Effect hook to close any open tooltips when the pathName changes (the user navigates to a different page)
    useEffect(() => {
        if (isThisTooltipOpen) {
            dispatch(closeTooltip());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, pathName]);

    // // Another solution to note: can use ref in case following eslint's rules is a must
    // // Use a ref to track whether this tooltip is open
    // const isThisTooltipOpenRef = useRef(isThisTooltipOpen);
    // isThisTooltipOpenRef.current = isThisTooltipOpen;
    // // The useEffect will look like this
    // useEffect(() => {
    //     if (isThisTooltipOpenRef.current) {
    //         dispatch(closeTooltip());
    //     }
    // }, [dispatch, pathName]);

    // Handler for tooltip click events
    const handleTooltipClick = () => {
        if (isThisTooltipOpen) {
            dispatch(closeTooltip());
        } else {
            dispatch(openTooltip(id));
        }
    };

    // Render the Tooltip component
    return (
        <button
            type="button"
            className="relative self-end"
            tabIndex="0"
            onClick={handleTooltipClick}
        >
            {isThisTooltipOpen ? (
                <CloseIcon className="h-auto max-w-[1.3rem] cursor-pointer rounded-md bg-red-600 p-0.5 hover:bg-red-800 active:bg-red-900 lg:max-w-[1.5rem]" />
            ) : (
                <InfoIcon className="h-auto max-w-[1.3rem] cursor-pointer rounded-md bg-red-600 p-0.5 hover:bg-red-800 active:bg-red-900 lg:max-w-[1.5rem]" />
            )}

            <div
                role="tooltip"
                aria-hidden={!isThisTooltipOpen}
                className={`${
                    isThisTooltipOpen
                        ? "visible top-7 max-h-[11rem] w-[15rem] opacity-100 md:w-[18rem]"
                        : "invisible opacity-0"
                }  absolute right-0 z-20 overflow-auto rounded-md bg-white px-3 text-indigo-900 shadow-lg transition-all duration-300 `}
            >
                {isThisTooltipOpen && children}
            </div>
        </button>
    );
};

export default Tooltip;
