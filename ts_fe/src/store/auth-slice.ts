import SerializeUser from "@/utils/serializeUser";
import { createSlice } from "@reduxjs/toolkit";

interface AuthReducerProps {
	user: any;
	logined: boolean;
	type: String;
}

const initialState: AuthReducerProps = {
	user: null,
	logined: false,
	type: "",
};

const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.user = SerializeUser(action.payload);
			state.logined = true;
		},
		logout: (state) => {
			state.logined = false;
			state.user = null;
		},
		change_type: (state, action) => {
			state.user.registered = true;
			state.type = action.payload;
		},
	},
});

export default AuthSlice;
export const { login, logout, change_type } = AuthSlice.actions;
