// Define a form select component that utilizes the select element
const FormSelect = ({
    label,
    selectOptions,
    disabled,
    optionPlaceholder,
    multiple,
    value,
    onChange,
    className,
    ...otherProps
}) => {
    // Create an ID from the label prop by replacing spaces with hyphens to associate the label with the select element.
    const id = label.split(" ").join("-");

    // Render the JSX elements
    return (
        <div className={`${className} flex flex-col items-center`}>
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                multiple={multiple}
                disabled={disabled}
                aria-disabled={disabled}
                value={value}
                onChange={onChange}
                className="rounded-md bg-red-100 bg-none p-2"
                {...otherProps}
            >
                <option value="" disabled>
                    {optionPlaceholder || "—Select an option—"}
                </option>
                {selectOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;
