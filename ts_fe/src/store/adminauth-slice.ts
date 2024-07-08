import { createSlice } from "@reduxjs/toolkit";

interface AuthReducerProps {
	bid: string;
	is_created: boolean;
	is_logined: boolean;
}

const initialState: AuthReducerProps = {
	bid: "",
	is_created: false,
	is_logined: false,
};

const AdminAuthSlice = createSlice({
	name: "adminauth",
	initialState,
	reducers: {
		login: (state, action) => {
			state.is_logined = true;
			state.bid = action.payload.bid;
			state.is_created = action.payload.is_created;
		},
		logout: (state) => {
			state.is_logined = false;
			state.bid = "";
			state.is_created = false;
		},
		create: (state) => {
			state.is_created = true;
		},
	},
});

export default AdminAuthSlice;
export const { login, logout, create } = AdminAuthSlice.actions;
