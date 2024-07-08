import axios from "axios";

export const fileUpload = (ThumbnailformData: FormData, onProgress: any) => {
	const res = axios.post("/api/upload", ThumbnailformData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress: (progressEvent) => {
			let percentCompleted = Math.round(
				(progressEvent.loaded * 100) /
					(progressEvent.total ? progressEvent.total : 1)
			);
			onProgress(percentCompleted);
		},
	});

	return res;
};
