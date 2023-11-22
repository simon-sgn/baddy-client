// Define a helper function to trim a long message into a shorter version concatenated with "..."
const trimMessage = (message, limit) => {
    if (message.length > limit) {
        return message.substring(0, limit).trimEnd() + "...";
    } else {
        return message;
    }
};

export default trimMessage;
