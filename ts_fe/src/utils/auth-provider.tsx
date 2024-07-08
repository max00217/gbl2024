import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import SerializeUser from "@/utils/serializeUser";
import { login } from "@/store/auth-slice";
import axios from "axios";

interface AuthProviderProps {
	children: ReactElement;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem("auth")) {
			const ls = localStorage.getItem("auth");
			const userinfo = ls ? JSON.parse(ls) : null;
			axios
				.post("/api/auth/login", { uid: userinfo.uid })
				.then((res) => {
					userinfo.registered = true;
					dispatch(login(userinfo));
				})
				.catch((err) => {
					if (err.response.data.message === "User not found") {
						userinfo.registered = false;
						dispatch(login(SerializeUser(userinfo)));
					}
				});
		}
	}, []);

	return <>{children}</>;
};

export default AuthProvider;
