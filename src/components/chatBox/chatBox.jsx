import { useState } from "react";
import { useDispatch } from "react-redux";
import useFetchInsideEventHandler from "../../hooks/useFetchInsideEventHandler";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "../formInput/formInput";
import Button from "../button/button";
import Message from "../message/message";
import buttonTypeClasses from "../button/buttonTypeClasses";

// Create a component that renders the chatbox with a specific player
const ChatBox = ({ messages, currentUser, receiver }) => {
    // Get the messages between the user and the receiver for display purposes
    const messagesWithTheReceiver = messages.filter(
        (messageObject) =>
            messageObject.receiver === receiver._id || messageObject.sender === receiver._id
    );

    // Return the JSX element for rendering the InnerChatBox with a key - to help reset states when the receiver._id changes
    return (
        <InnerChatBox
            key={receiver._id}
            messagesWithTheReceiver={messagesWithTheReceiver}
            receiver={receiver}
            currentUser={currentUser}
        />
    );
};

export default ChatBox;

// Define InnerChatBox component
function InnerChatBox({ currentUser, receiver, messagesWithTheReceiver }) {
    // Define skip state for fetching more chat history in the event handler, skip the first 10 because they are fetched and displayed by useFetch
    const [skip, setSkip] = useState(10);
    // Define isCompleted state variable to hide the load more button when there are no more messages to load from the server
    const [isCompleted, setIsCompleted] = useState(false);
    // Define the inputValue state variable to store the current input value of the message
    const [inputValue, setInputValue] = useState("");
    // Define the loadMoreHistory state variable to store the messages that are loaded when the user clicks on the load more button
    const [loadMoreHistory, setLoadMoreHistory] = useState([]);
    // Get the dispatch function
    const dispatch = useDispatch();
    // Get the fetchInsideEventHandler function from the custom hook
    const fetchInsideEventHandler = useFetchInsideEventHandler();

    // Use useFetch custom hook to fetch the initial chat history data from the server
    const [data, error] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/chat/get-chat-history?senderId=${
            currentUser.userId
        }&receiverId=${receiver._id}&skip=0`
    );

    // Define a function to handle the load more button click, the api has a limit of 10 messages for each click
    const loadMore = async () => {
        try {
            // BUG fix the "senderId and recieverID here - rename"
            const data = await fetchInsideEventHandler(
                `${import.meta.env.VITE_APP_API_URL}/api/chat/get-chat-history?senderId=${
                    currentUser.userId
                }&receiverId=${receiver._id}&skip=${skip}`
            );
            setLoadMoreHistory((prev) => [...data, ...prev]);
            setSkip((prev) => prev + 10);
            if (data.length < 10) {
                setIsCompleted(true);
            }
        } catch (error) {
            toast.error("Error fetching chat history. Please try again later.");
            console.error("Error fetching chat history:", error);
        }
    };

    // Define a function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            sender: currentUser.userId,
            receiver: receiver._id,
            message: inputValue,
        };
        // Dispatch an action with type 'message' and payload data
        dispatch({ type: "message", payload: data });
        setInputValue("");
    };

    // Define a function to handle the input change
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // Return the JSX elements for rendering the component
    return (
        <div className="p-3">
            <h2 className="mb-3 font-semibold">
                Chat with
                <Link className="capitalize" to={`/player/${receiver._id}`}>
                    {" " + receiver?.name}
                </Link>
            </h2>
            <div className="flex h-[calc(100svh-12.5rem)] flex-col">
                <div
                    aria-live="polite"
                    className="mb-3 flex h-[calc(100svh-15.25rem)] flex-col items-start overflow-auto rounded-md border bg-indigo-500 p-1.5 md:p-5"
                >
                    {error && <span className="m-3">{error.message}</span>}
                    {data && (
                        <>
                            <div className="flex w-full justify-center">
                                {!isCompleted && data.length === 10 && (
                                    <button
                                        className="my-1 rounded-md bg-indigo-400 px-3 font-bold text-white active:underline"
                                        onClick={loadMore}
                                    >
                                        Load more
                                    </button>
                                )}
                            </div>
                            {[...loadMoreHistory, ...data, ...messagesWithTheReceiver].map(
                                (message, index, array) => (
                                    <Message
                                        key={message._id}
                                        message={message}
                                        messagesWithTheReceiverLength={
                                            messagesWithTheReceiver.length
                                        }
                                        index={index}
                                        currentUser={currentUser}
                                        receiver={receiver}
                                        lastIndex={array.length - 1}
                                    />
                                )
                            )}
                        </>
                    )}
                </div>
                <form onSubmit={handleSubmit} className="flex flex-nowrap gap-2">
                    <FormInput
                        label="Type a message"
                        type="text"
                        required
                        onChange={handleChange}
                        name="message"
                        value={inputValue}
                        id="message"
                        maxLength="800"
                        className="grow text-indigo-900"
                    />
                    <Button type="submit" buttonType={buttonTypeClasses.baseButton}>
                        Send
                    </Button>
                </form>
            </div>
        </div>
    );
}
