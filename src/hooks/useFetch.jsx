import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/userSlice";

// Define a custom hook that fetches data based on the given URL (required)
// and an options object containing method, body, dependency array, delay and shouldFetchData flag
const useFetch = (
    url,
    {
        method = "GET",
        body = null,
        deps = [],
        delay = 0,
        shouldFetchData = true,
        timeout = 10000,
    } = {}
) => {
    // Initialize state variables for data, error and loading
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Get the navigate function and dispatch function from the hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Define useEffect hook to fetch data
    useEffect(() => {
        // Use the isMounted variable to prevent setting the state of an unmounted component
        let isMounted = true;
        // Create an AbortController instance to be able to cancel fetch requests
        const controller = new AbortController();

        // Define an async function to fetch the data
        const fetchData = async () => {
            setLoading(true);
            // Create a promise that resolves after a delay to ensure minimum loading time for display purposes
            const loaderTimeout = new Promise((resolve) => setTimeout(resolve, delay));
            // Start a timer that aborts the fetch request after the timeout
            const timerId = setTimeout(() => controller.abort(), timeout);
            try {
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
                }
                // Throw an error for any other method
                else {
                    throw new Error(
                        "Sorry, method is invalid. Currently, only GET, POST, PUT and DELETE are supported."
                    );
                }

                // Clear the timeout right after the fetch request completes
                clearTimeout(timerId);

                // If response is ok, parse it as JSON and set data state
                if (response.ok) {
                    const data = await response.json();
                    // Wait for the minimum loading time to complete
                    await loaderTimeout;
                    if (isMounted) {
                        setData(data.data);
                        setError(null);
                    }
                }
                // If response status is 401 (Unauthorized), navigate to sign-in page and reset user state
                else if (response.status === 401) {
                    navigate("/sign-in");
                    dispatch(resetUser());
                }
                // For any other status, parse response as JSON and throw an error
                else {
                    const error = await response.json();
                    throw new Error(error.message);
                }
            } catch (error) {
                // Wait for the minimum loading time to complete
                await loaderTimeout;
                if (isMounted) {
                    setError(
                        new Error(
                            "Sorry, something went wrong while fetching the data. Please try again later."
                        )
                    );
                    console.error(error);
                    setData(null);
                }
            } finally {
                isMounted && setLoading(false);
            }
        };

        // Invoke the fetch function only if shouldFetchData is truthy
        if (shouldFetchData) {
            fetchData();
        } else {
            setData(null);
            setError(null);
            setLoading(false);
        }

        // Define the clean-up function
        const cleanUp = () => {
            isMounted = false;
            controller.abort();
        };

        return cleanUp;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, method, body, shouldFetchData, dispatch, navigate, ...deps]);

    // Return the data, error and loading from the custom hook
    return [data, error, loading];
};

export default useFetch;
