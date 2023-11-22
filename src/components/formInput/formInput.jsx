// Define a functional component that renders a custom input field with a label
const FormInput = ({
    label,
    id,
    className,
    value,
    autoComplete = "off",
    onChange,
    ...otherProps
}) => {
    return (
        <div className={`${className} h-11`}>
            {label && (
                <label htmlFor={id} className="sr-only">
                    {label}
                </label>
            )}
            <input
                id={id}
                className="h-full w-full rounded border-2 border-indigo-400 bg-white px-1.5 text-base placeholder:text-gray-500 placeholder:[transition:color_0.7s] focus:placeholder:text-gray-400"
                value={value}
                autoComplete={autoComplete}
                onChange={onChange}
                placeholder={label}
                {...otherProps}
            />
        </div>
    );
};

export default FormInput;
