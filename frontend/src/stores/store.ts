import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { apiSlice } from "../services/auth.service";
import authStore from "./auth.store";

const store = configureStore({
    reducer: {
        auth: authStore.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type StoreDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;

export const useAppDispatch = () => useDispatch<StoreDispatch>();
