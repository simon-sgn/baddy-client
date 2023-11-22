// Note: Although the project utilizes Redux, the states of the Messages component and its sub-components are managed as local states
// This approach is primarily adopted for learning purposes

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import useFetchInsideEventHandler from "../../hooks/useFetchInsideEventHandler";
import { toast } from "react-toastify";
import { socket } from "../../store/socketMiddleware";
import PlayerListInChat from "../../components/playerListInChat/playerListInChat";
import Spinner from "../../components/spinner/spinner";
import ChatBox from "../../components/chatBox/chatBox";

// Define the Messages component that renders the chat interface
const Messages = () => {
    // Get the current user data from the Redux store
    const currentUser = useSelector((state) => state.user.currentUser);
    // Get the receiverId parameter from the URL
    const { receiverId } = useParams();
    // Define a state variable to store the messages array
    const [messages, setMessages] = useState([]);
    // Define a state variable to store the updated player list by fetching data in event handler
    const [updatedPlayerList, setUpdatedPlayerList] = useState([]);
    // Define a state variable to check if the player list has been updated by fetching data in event handler
    const [hasUpdated, setHasUpdated] = useState(false);

    // Use the custom useFetch hook to fetch the receiver's profile data from the API
    // Pass a Boolean value to indicate whether to fetch or not (only when receiverId is truthy)
    const [playerProfile, playerProfileError, playerProfileLoading] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/player/get-player-profile?playerId=${receiverId}`,
        {
            delay: 500,
            shouldFetchData: Boolean(receiverId),
        }
    );

    // Fetch the list of players in chat to display to the user
    const [playerList, playerListError, playerListLoading] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/chat/get-players-in-chat?userId=${
            currentUser.userId
        }`,
        { delay: 200 }
    );

    // Create a lastMessage const from the messages array to use for display purposes in the PlayerListInChat component
    const lastMessage = messages[messages.length - 1];

    // Get the first player in the player list and in the updated player list
    const firstPlayerinPlayerList = playerList?.[0]?._id;
    const firstPlayerInUpdatedPlayerList = updatedPlayerList[0]?._id;

    // Get the fetchInsideEventHandler function from the custom hook
    const fetchInsideEventHandler = useFetchInsideEventHandler();
    // Use effect hook to handle the message event: listen for message event from the server and add the received message to the messages state
    useEffect(() => {
        socket.on("message", async (data) => {
            // Determine whether to refetch the player list when a new message arrives in order to keep the player list in the correct order (most recent first)
            // This is decided based on whether the first player in the updated player list or the first player in the original player list
            // is not equal to the receiver of the message if the current user is the sender, or the sender of the message if not
            const shouldRefetchPlayerList =
                (firstPlayerInUpdatedPlayerList || firstPlayerinPlayerList) !==
                (data.sender === currentUser.userId ? data.receiver : data.sender);

            if (shouldRefetchPlayerList) {
                try {
                    const data = await fetchInsideEventHandler(
                        `${import.meta.env.VITE_APP_API_URL}/api/chat/get-players-in-chat?userId=${
                            currentUser.userId
                        }`
                    );
                    setUpdatedPlayerList(data);
                    if (!hasUpdated) {
                        setHasUpdated(true);
                    }
                } catch (error) {
                    toast.error("Error updating player list. Please try again later.");
                    console.error("Error updating player list:", error);
                }
            }
            setMessages((messages) => [...messages, data]);
        });
        return () => {
            socket.off("message");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.userId, firstPlayerinPlayerList, firstPlayerInUpdatedPlayerList]);

    // Return the JSX elements for rendering the component
    return (
        <>
            <h1 className="pt-3 font-extrabold uppercase">Chats</h1>
            <div aria-live="polite" className="flex md:gap-3">
                <PlayerListInChat
                    hasUpdated={hasUpdated}
                    lastMessage={lastMessage}
                    receiver={playerProfile}
                    playerList={playerList}
                    playerListError={playerListError}
                    playerListLoading={playerListLoading}
                    updatedPlayerList={updatedPlayerList}
                    setMessages={setMessages}
                    className={`${
                        receiverId ? "hidden md:block" : ""
                    } w-full shrink-0 p-3 md:w-[360px]`}
                />
                {!receiverId ? (
                    <div className="hidden w-full p-3 md:block">
                        <h2 className="mb-3 font-semibold">
                            Select a chat or start a new conversation
                        </h2>
                        <div className="rounded-md bg-indigo-400 md:h-[calc(100svh-12.5rem)]"></div>
                    </div>
                ) : (
                    <>
                        {playerProfileLoading && <Spinner />}
                        {!playerProfileLoading && playerProfileError && (
                            <span className="m-3 w-full font-semibold">
                                {playerProfileError.message}
                            </span>
                        )}
                        {!playerProfileLoading && playerProfile && (
                            <div className="grow">
                                <Link
                                    className="my-1 inline-block rounded-md bg-indigo-400 px-3 font-bold text-white active:underline md:hidden"
                                    to="/messages"
                                >
                                    &lt; Back to inbox
                                </Link>
                                <ChatBox
                                    messages={messages}
                                    currentUser={currentUser}
                                    receiver={playerProfile}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Messages;
