// Define a helper function to format timestamps in a format that is more familiar to Vietnamese users
const convertTimestampToVietnameseFormat = (timestamp) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
};

export default convertTimestampToVietnameseFormat;
