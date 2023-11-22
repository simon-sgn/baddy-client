import PlayerInChat from "../playerInChat/playerInChat";
import Spinner from "../spinner/spinner";

// Create a component that renders the list of players who have chatted with the current user
const PlayerListInChat = ({
    hasUpdated,
    receiver,
    playerList,
    playerListError,
    playerListLoading,
    lastMessage,
    className,
    updatedPlayerList,
    setMessages,
}) => {
    // Return the JSX element for rendering the player list
    return (
        <div aria-live="polite" className={`${className}`}>
            <h2 className="mb-3 font-semibold">Inbox</h2>
            {playerListLoading && <Spinner />}
            {!playerListLoading && playerListError && (
                <span className="m-3">{playerListError.message}</span>
            )}
            {!playerListLoading && playerList && (
                <ul className="h-[calc(100svh-10.75rem)] overflow-auto md:h-[calc(100svh-12.5rem)]">
                    {(hasUpdated ? updatedPlayerList : playerList).map((player, index) => (
                        <PlayerInChat
                            index={index}
                            key={player._id}
                            player={player}
                            receiver={receiver}
                            lastMessage={lastMessage}
                            setMessages={setMessages}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlayerListInChat;
