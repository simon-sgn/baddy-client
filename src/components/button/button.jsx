// Define a functional component that renders a custom button with different styles
const Button = ({
    children,
    onClick,
    type,
    buttonType = "highlighted-button",
    className,
    ...otherProps
}) => {
    // Define the class for the button based on the buttonType
    let buttonClass;
    switch (buttonType) {
        case "base-button":
            buttonClass = "bg-white text-indigo-900 active:bg-gray-300 active:font-black";
            break;
        case "inverted-button":
            buttonClass = "bg-indigo-800 text-white active:bg-indigo-950 active:font-black";
            break;
        default:
            buttonClass = "bg-red-600 text-white active:bg-red-700 active:font-black";
    }

    // Render the custom button
    return (
        <div className={`${className} h-11 font-medium`}>
            <button
                onClick={onClick}
                type={type}
                className={`h-full w-full cursor-pointer rounded px-3 py-1.5 text-sm transition-all ${buttonClass}`}
                {...otherProps}
            >
                {children}
            </button>
        </div>
    );
};

export default Button;
