import axios from "axios";

export const boothAdminAuth = (pw: string) => {
	const res = axios.post("/api/auth/boothadmin", {
		password: pw,
	});

	return res;
};

export const getUser = (uid: string) => {
	const res = axios.get(`/api/user/${uid}`);
	return res;
};
