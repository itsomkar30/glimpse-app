import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
    uid: string | null;
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
    isAuthenticated: boolean;
};


const initialState: UserState = {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Partial<UserState>>) {
            state.uid = action.payload.uid ?? state.uid;
            state.displayName = action.payload.displayName ?? state.displayName;
            state.email = action.payload.email ?? state.email;
            state.photoURL = action.payload.photoURL ?? state.photoURL;
            state.isAuthenticated = true;
        },
        clearUser(state) {
            state.uid = null;
            state.displayName = null;
            state.email = null;
            state.photoURL = null;
            state.isAuthenticated = false;
        },
    },
});




export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;