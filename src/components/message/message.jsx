import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../../assets/profilePhoto.png";
import convertTimestampToVietnameseFormat from "../../utils/convertTimestampToVietnameseFormat";

// Create a Message component that renders a single message in the ChatBox component
const Message = ({
    message,
    index,
    currentUser,
    receiver,
    lastIndex,
    messagesWithTheReceiverLength,
}) => {
    // Create a ref for the last message
    const lastMessageRef = useRef();
    // Define a const to check if the current user is the sender
    const isCurrentUserSender = message.sender === currentUser.userId;

    // Use useEffect hook to scroll to the last message
    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [messagesWithTheReceiverLength]);

    // Return the JSX elements for rendering the component
    return (
        <div className="my-3 flex items-start" ref={index === lastIndex ? lastMessageRef : null}>
            <div
                className={`${
                    isCurrentUserSender ? "bg-indigo-900" : "bg-red-500"
                } mx-3 rounded-full p-2`}
            >
                <img
                    src={ProfilePhoto}
                    alt={`${
                        isCurrentUserSender ? currentUser.name : receiver.name
                    }'s profile photo in the chat`}
                    className="mx-auto h-[1rem] w-[1rem]"
                />
            </div>
            <div className="flex flex-col items-start pr-2">
                <p className="mb-2 flex flex-col items-start font-bold capitalize md:mb-0 md:block">
                    <Link to={`/player/${message.sender}`} className="text-indigo-100">
                        {isCurrentUserSender ? currentUser.name : receiver.name}
                    </Link>
                    <span className="text-xs font-semibold text-indigo-200 md:ml-5">
                        {convertTimestampToVietnameseFormat(message.timestamp)}
                    </span>
                </p>
                <p className="hyphens-auto break-words text-left text-sm [-ms-word-break:break-all] [word-break:break-word] [word-wrap:break-word]">
                    {message.message}
                </p>
            </div>
        </div>
    );
};

export default Message;
