import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export enum AuthState {
    LOGGED_OUT,
    LOGGED_IN,
}

type AuthStoreType = {
    token?: string | null;
    current: AuthState;
};

const initial: AuthStoreType = {
    token: getCookie("token"),
    current: getCookie("token") ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT,
};

const authStore = createSlice({
    name: "tokens",
    initialState: initial,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.current = AuthState.LOGGED_IN;
        },
        clearToken: (state, action) => {
            state.token = null;
            state.current = AuthState.LOGGED_OUT;
        },
    },
});

export const { setToken, clearToken } = authStore.actions;

export default authStore;

export function selectAuthState(state: RootState) {
    return state.auth.current;
}

function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
}
