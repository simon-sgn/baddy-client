import io from "socket.io-client";
import { authError } from "./userSlice";
import { toast } from "react-toastify";

// Create a socket.io instance with the server URL and options
export const socket = io("http://localhost:3000", {
    withCredentials: true,
    autoConnect: false,
});

// Define the socket middleware
const socketMiddleware = (store) => (next) => {
    // Listen for 'auth_error' events from the server
    // When such an event occurs, dispatch an authError action and show a toast notification
    socket.on("auth_error", (data) => {
        store.dispatch(authError(data.message));
        toast.error("Sorry, some went wrong. Please sign in again.");
        console.error("Authentication error:", data.message);
    });

    // Return the middleware function
    return (action) => {
        // If the action type is 'message', emit a 'message' event to the server
        // Handle any errors that occur when sending the message
        switch (action.type) {
            // if the action type is 'message', emit the message event to the server with the action payload
            case "message":
                socket.emit("message", action.payload, (error) => {
                    if (error) {
                        toast.error(
                            "Sorry, something went wrong while sending message. Please try again later."
                        );
                        console.error("Error sending message: ", error);
                    } else {
                        console.log("Message sent successfully");
                    }
                });
                break;
            default:
                break;
        }

        // Pass the action to the next middleware or reducer in line
        next(action);

        // Connect or disconnect the socket based on whether there is a current user and the connected property of the socket
        let currentUser = store.getState().user.currentUser;
        if (currentUser) {
            if (!socket.connected) {
                socket.io.opts.query = {
                    userId: currentUser.userId,
                };
                socket.connect();
                console.log("Socket has connected");
            }
        } else {
            if (socket.connected) {
                socket.disconnect();
                console.log("Socket has disconnected");
            }
        }
    };
};

export default socketMiddleware;
