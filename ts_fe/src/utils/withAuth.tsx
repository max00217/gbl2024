import { useSelector } from "react-redux";
import { NextPage } from "next";
import { RootState } from "@/store";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";

const withAuth = (Component: NextPage | React.FC) => {
	const Auth = () => {
		const AuthState = useSelector((state: RootState) => state.auth);
		if (!AuthState.logined) {
			return <LoginPage></LoginPage>;
		} else if (!AuthState.user.registered) {
			return <RegisterPage></RegisterPage>;
		}
		return <Component />;
	};

	return Auth;
};

export default withAuth;
