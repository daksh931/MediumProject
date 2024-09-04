import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import blogsSlice from "./slices/blogsSlice";

const store = configureStore({
    reducer:{
        auth:authSlice,
        blogs:blogsSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;