import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state for the user slice
const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

// Async thunk for signing up a user
export const fetchUserWithSignUp = createAsyncThunk(
    "user/fetchUserWithSignUp",
    async ({ email, password, name }, thunkAPI) => {
        // Fetch user data from the server when signing up
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/sign-up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, name }),
            credentials: "include",
        });
        const userResponse = await response.json();

        // Get the status code from the response
        const statusCode = response.status;

        // If the response is not ok, reject the promise with the error data
        if (!response.ok) {
            return thunkAPI.rejectWithValue({ ...userResponse, statusCode });
        }

        // If the response is ok, resolve the promise with the user data
        return { ...userResponse, statusCode };
    }
);

// Async thunk for signing in a user
export const fetchUserWithSignIn = createAsyncThunk(
    "user/fetchUserWithSignIn",
    async ({ email, password }, thunkAPI) => {
        // Fetch user data from the server when signing in
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/sign-in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        const userResponse = await response.json();

        // Get the status code from the response
        const statusCode = response.status;

        // If the response is not ok, reject the promise with the error data
        if (!response.ok) {
            return thunkAPI.rejectWithValue({ ...userResponse, statusCode });
        }

        // If the response is ok, resolve the promise with the user data
        return { ...userResponse, statusCode };
    }
);

// Async thunk for signing in a user with Google
export const fetchUserWithGoogleSignIn = createAsyncThunk(
    "user/fetchWithGoogleSignIn",
    async (idToken, thunkAPI) => {
        // Fetch user data from the server when signing in with Google
        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/token-sign-in`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
            credentials: "include",
        });

        const userResponse = await response.json();

        // Get the status code from the response
        const statusCode = response.status;

        // If the response is not ok, reject the promise with the error data
        if (!response.ok) {
            return thunkAPI.rejectWithValue({ ...userResponse, statusCode });
        }

        // If the response is ok, resolve the promise with the user data
        return { ...userResponse, statusCode };
    }
);

// Async thunk for signing out a user
export const signOut = createAsyncThunk("user/signOut", async (_, thunkAPI) => {
    // Sign out the user on the server
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/sign-out`, {
        method: "POST",
        credentials: "include",
    });
    const data = await response.json();

    // If the response is not ok, reject the promise with the error data
    if (!response.ok) {
        return thunkAPI.rejectWithValue(data);
    }

    // If the response is ok, resolve the promise
    return data;
});

// Create the user slice using createSlice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Reducer for resetting the user state to initial state on 401 status code
        resetUser: () => initialState,
        // Reducer for handling socket authentication errors
        authError: (state, action) => {
            state.error = action.payload;
            state.currentUser = initialState.currentUser;
        },
    },
    // Extra reducers for handling the lifecycle of the async actions
    extraReducers: (builder) => {
        builder.addCase(fetchUserWithSignUp.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserWithSignUp.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.data;
        });
        builder.addCase(fetchUserWithSignUp.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchUserWithSignIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserWithSignIn.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.data;
        });
        builder.addCase(fetchUserWithSignIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(fetchUserWithGoogleSignIn.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserWithGoogleSignIn.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload.data;
        });
        builder.addCase(fetchUserWithGoogleSignIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(signOut.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(signOut.fulfilled, (state) => {
            state.currentUser = initialState.currentUser;
            state.loading = initialState.loading;
            state.error = initialState.error;
        });
        builder.addCase(signOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

// Export the actions and reducer
export const { resetUser, authError } = userSlice.actions;
export default userSlice.reducer;
