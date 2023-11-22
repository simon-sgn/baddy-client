import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";

// Define a custom hook that wraps around the fetch function and automatically provides navigate and dispatch
// Use this function inside a try-catch block
const useFetchInsideEventHandler = () => {
    // Get the navigate function from useNavigate
    const navigate = useNavigate();
    // Get the dispatch function from useDispatch
    const dispatch = useDispatch();

    // Define an async function that utilizes fetch. The function takes a url, a method (optional) and a body (optional)
    const fetchInsideEventHandler = async (
        url,
        { method = "GET", body = null, timeout = 5000 } = {}
    ) => {
        // Create an AbortController instance
        const controller = new AbortController();

        // Use setTimeout that helps abort the fetch request after the timeout
        // Side note: Calling abort() after the fetch is complete has no effect
        const timerId = setTimeout(() => controller.abort(), timeout);

        let response;
        // Make a GET request if method is GET
        if (method === "GET") {
            response = await fetch(url, {
                credentials: "include",
                signal: controller.signal,
            });
        }
        // Make a POST, PUT or DELETE request if method is one of them
        else if (method === "POST" || method === "PUT" || method === "DELETE") {
            response = await fetch(url, {
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                method: method,
                body: body,
                signal: controller.signal,
            });
        } else {
            throw new Error(
                "Sorry, method is invalid. Currently, only GET, POST, PUT and DELETE are supported."
            );
        }

        // Clear the timeout right after the fetch request completes
        clearTimeout(timerId);

        // Check if the response is ok and parse it as JSON
        if (response.ok) {
            const data = await response.json();
            return data.data;
        }
        // If the server returns a 401 status code (Unauthorized), redirect to login page and reset user state
        else if (response.status === 401) {
            navigate("/sign-in");
            dispatch(resetUser());
        } else {
            const error = await response.json();
            throw new Error(`${response.status}: ${error.error}`);
        }
    };

    // Return the fetch function from the custom hook
    return fetchInsideEventHandler;
};

export default useFetchInsideEventHandler;
