import axios from "axios";

interface ProblemsType {
	pdf_url: string;
	file_type: string;
	question: string;
	answer: string;
	score: number;
}

export const makeProblems = (bid: string, problems: ProblemsType[]) => {
	console.log("final", problems);
	let pdata: ProblemsType[] = [...problems];
	for (var i = 0; i < pdata.length; i++) {
		if (pdata[i].file_type === "동영상") {
			pdata[i].question = pdata[i].question + "(동영상)";
		}
	}
	const res = axios.post("/api/problem/make/" + bid, {
		problems: pdata,
	});
	return res;
};
