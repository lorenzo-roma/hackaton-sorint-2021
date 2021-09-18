import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {apiSlice as authApiSlice} from "../services/auth.service";
import {apiSlice as tripApiSlice} from "../services/trip.service";
import {apiSlice as userApiSlice} from "../services/user.service";
import authStore from "./auth.store";

const store = configureStore({
    reducer: {
        auth: authStore.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [tripApiSlice.reducerPath]: tripApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        const defaultMiddleware = getDefaultMiddleware().concat(authApiSlice.middleware);
        defaultMiddleware.concat(tripApiSlice.middleware);
        defaultMiddleware.concat(userApiSlice.middleware);
        return defaultMiddleware;
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export const useAppDispatch = () => useDispatch<StoreDispatch>();
