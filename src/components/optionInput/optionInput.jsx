// Define an OptionInput component which renders an input field.
// This component is designed to work with either 'checkbox' or 'radio' input types.
const OptionInput = ({ id, name, value, onChange, checked, label, type }) => {
    return (
        <div>
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                checked={checked}
                className="mr-1"
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export default OptionInput;
