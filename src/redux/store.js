import { configureStore } from "@reduxjs/toolkit";
import candAuthReducer from "./slices/candAuthSlice";
import employerAuthReducer from "./slices/employerAuthSlice";

const rootReducer = {
    candAuth: candAuthReducer,
    employerAuth: employerAuthReducer,
}
const store = configureStore({
    reducer: rootReducer,
});

export default store;