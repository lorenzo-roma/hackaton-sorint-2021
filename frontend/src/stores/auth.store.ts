import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import User from "../classes/User.class";

export enum AuthState {
    LOGGED_OUT,
    LOGGED_IN,
}

type AuthStoreType = {
    token?: string | null;
    current: AuthState;
    user: User | null;
};

const initial: AuthStoreType = {
    token: getCookie("token"),
    current: getCookie("token") ? AuthState.LOGGED_IN : AuthState.LOGGED_OUT,
    user: null
};

const authStore = createSlice({
    name: "tokens",
    initialState: initial,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.current = AuthState.LOGGED_IN;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearToken: (state, action) => {
            state.token = null;
            state.current = AuthState.LOGGED_OUT;
            state.user = null;
        },
    },
});

export const {setToken, clearToken, setUser} = authStore.actions;

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

export function prepareAuthentication(headers: Headers, {getState}: {getState: () => unknown}) {
    const token = (getState() as RootState).auth.token
    if (token) {
        headers.set('authorization', `Bearer ${token}`)
    }
    return headers;

}