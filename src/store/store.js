import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userReducer from "./userSlice";
import tooltipReducer from "./tooltipSlice";
import socketMiddleware from "./socketMiddleware";
import loggerMiddleware from "./loggerMiddleware";

// Configuration for persisting the user slice of the state
const userPersistConfig = {
    key: "user",
    storage: storage,
    blacklist: ["error", "loading"], // List of state keys to ignore when persisting
};

// Configure the Redux store
export const store = configureStore({
    // Define the slices of state and their reducers
    reducer: {
        user: persistReducer(userPersistConfig, userReducer), // Use redux-persist for the user slice
        tooltip: tooltipReducer,
    },
    // Define the middleware to use
    middleware: (getDefaultMiddleware) => {
        // Start with the default middleware provided by Redux Toolkit
        let middleware = getDefaultMiddleware({ serializableCheck: false });

        // Apply logger middleware only in development
        if (import.meta.env.MODE === "development") {
            middleware = middleware.concat(loggerMiddleware);
        }

        // Apply socket middleware
        middleware = middleware.concat(socketMiddleware);

        return middleware;
    },
});

// Create a persisted version of the store
export const persistor = persistStore(store);
