import { NextPage } from "next";
import AdminLoaginPage from "@/pages/admin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MakeBoothPage from "@/pages/admin/makebooth";

const withAdminAuth = (Component: NextPage | React.FC) => {
	const Auth = () => {
		const AdminAuthState = useSelector((state: RootState) => state.adminauth);
		if (!AdminAuthState.is_logined) {
			return <AdminLoaginPage></AdminLoaginPage>;
		} else if (!AdminAuthState.is_created) {
			return <MakeBoothPage></MakeBoothPage>;
		}
		return <Component />;
	};

	return Auth;
};

export default withAdminAuth;
