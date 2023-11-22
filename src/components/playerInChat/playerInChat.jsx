import { useState, useEffect } from "react";
import { socket } from "../../store/socketMiddleware";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../assets/profilePhoto.png";
import convertTimestampToDays from "../../utils/convertTimestampToDays";
import trimMessage from "../../utils/trimMessage";

// Create a component that renders a single player who has chatted with the current user
const PlayerInChat = ({ setMessages, player, receiver, index, lastMessage }) => {
    // Define a state variable to store the online status of the player, which can changes in real-time with Socket.io
    const [isOnline, setIsOnline] = useState(player.online);

    // Use effect hook to handle the online and offline events: listen for online and offline events from the server and update the online status accordingly
    useEffect(() => {
        const handleOnline = (onlineId) => {
            if (onlineId === player._id) {
                setIsOnline(true);
            }
        };
        const handleOffline = (onlineId) => {
            if (onlineId === player._id) {
                setIsOnline(false);
            }
        };
        socket.on("online", handleOnline);
        socket.on("offline", handleOffline);
        return () => {
            socket.off("online", handleOnline);
            socket.off("offline", handleOffline);
        };
    }, [player._id]);

    // Define a function to return the details of the last message
    const renderLastMessageDetails = () => {
        // Determine the message to use. If lastMessage exists and index is 0, use lastMessage.message. Otherwise, use player.latestMessage fetched from API
        const message = lastMessage && index === 0 ? lastMessage.message : player.latestMessage;
        // Determine the timestamp to use. If lastMessage exists and index is 0, use lastMessage.timestamp. Otherwise, use player.timestamp fetched from API
        const timestamp = lastMessage && index === 0 ? lastMessage.timestamp : player.timestamp;

        // Return an object containing the trimmed message (max length of 15 characters) and the converted timestamp
        // The 'convertTimestampToDays' function converts the timestamp into a more readable format (days)
        return {
            message: trimMessage(message, 15),
            timestamp: convertTimestampToDays(timestamp),
        };
    };

    // Define a handleClick function to clear the messages array when switching between players
    const handleClick = () => {
        setMessages([]);
    };

    // Destructure the message and timestamp properties from the returned object of renderLastMessageDetails function
    const { message, timestamp } = renderLastMessageDetails();

    // Return the JSX element for rendering a single player in chat
    return (
        <li className="mb-3">
            <Link
                onClick={handleClick}
                to={`/messages/${player._id}`}
                className={` ${
                    player._id === receiver?._id ? "bg-indigo-800 font-extrabold" : "bg-indigo-400"
                } flex flex-nowrap items-center rounded-md shadow-md transition-all duration-300 active:bg-indigo-600 md:w-[95%]`}
            >
                <div className="m-3 rounded-full bg-red-500 p-3">
                    <img
                        src={ProfilePhoto}
                        alt={`${player.name}'s profile photo`}
                        className="mx-auto h-[2rem] w-[2rem]"
                    />
                </div>
                <div>
                    <div aria-live="polite" className="flex justify-start">
                        <span className="capitalize">{player.name}</span>
                        {isOnline ? (
                            <span className="ml-1 rounded-md bg-white px-2 text-indigo-900">
                                online
                            </span>
                        ) : (
                            <span className="ml-1 rounded-md bg-indigo-950 px-2">offline</span>
                        )}
                    </div>
                    <div className="flex text-[0.8rem] text-indigo-100">
                        <span className="font-semibold ">{message}</span>
                        <span className="pl-3 font-extralight">- {timestamp}</span>
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default PlayerInChat;
