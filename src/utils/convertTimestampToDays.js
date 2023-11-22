// Define a helper function to convert the timestamp into a specific format - described in the return statement below
const convertTimestampToDays = (timestamp) => {
    // Parse the timestamp string into a Date object
    const date = new Date(timestamp);
    // Get the current date
    const today = new Date();
    // Calculate the difference in milliseconds
    const diff = today - date;
    // Calculate the number of days and round it
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    // Return "today" if days is 0, "yesterday" if days is 1, otherwise return days with a suffix
    return days === 0 ? "today" : days === 1 ? "yesterday" : `${days} days ago`;
};

export default convertTimestampToDays;
