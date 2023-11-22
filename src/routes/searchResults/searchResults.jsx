import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PlayerSearchCard from "../../components/playerSearchCard/playerSearchCard";
import Spinner from "../../components/spinner/spinner";

// Define the SearchResults component that displays the players that match the search criteria
const SearchResults = () => {
    // Use the useSearchParams hook to get the URLSearchParams object
    const [params] = useSearchParams();

    // Use useFetch custom hook to fetch related data based on the params
    const [data, error, loading] = useFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/player/search-players?availability=${params.get(
            "availability"
        )}&province=${params.get("province")}&district=${params.get("district")}&level=${params.get(
            "level"
        )}&goal=${params.get("goal")}`,
        { delay: 500 }
    );

    // Return the JSX element for rendering the component
    return (
        <>
            <h1 className="pt-3 font-bold uppercase">Search Results</h1>
            <div className="aria-live">
                {loading && <Spinner />}
                {!loading && error && <span className="m-3">{error.message}</span>}
                {!loading && data && (
                    <>
                        <p className="mb-3 p-1">
                            We have found {data.length} players that&nbsp;
                            {data.length > 1 ? "match" : "matches"} your preferences.
                        </p>
                        <div className="grid md:grid-cols-3 lg:grid-cols-4">
                            {data.map((player) => (
                                <PlayerSearchCard key={player._id} player={player} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default SearchResults;
