import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./auth-slice";
import AdminAuthSlice from "./adminauth-slice";

const store = configureStore({
	reducer: {
		auth: AuthSlice.reducer,
		adminauth: AdminAuthSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
