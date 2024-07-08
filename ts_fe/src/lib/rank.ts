import axios from "axios";

export const getRanks = () => {
	const res = axios.get("/api/ranking");
	return res;
};
