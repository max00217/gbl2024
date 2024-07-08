import axios from "axios";

export const getNotification = () => {
	const res = axios.get("/api/notification");
	return res;
};
