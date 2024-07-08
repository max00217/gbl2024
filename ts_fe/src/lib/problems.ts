import axios from "axios";

export const getProblem = (bid: string) => {
	const res = axios.get(`/api/problem/${bid}`);
	return res;
};

export const submitAnswer = (bid: string, uid: string, answers: string[]) => {
	const res = axios.post(`/api/problem/submit/${bid}`, {
		submit_answer: answers,
		uid: uid,
	});
	return res;
};
