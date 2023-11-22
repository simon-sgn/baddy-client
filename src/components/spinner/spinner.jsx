// Define a spinner component to use for "loading" states
const Spinner = () => (
    <div className="flex h-40 w-full items-center justify-center">
        <div
            role="status"
            aria-label="Loading"
            className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-500"
        ></div>
    </div>
);

export default Spinner;
