import { useEffect, useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";
// import "nprogress/nprogress.css";

const useProgress = () => {
	const [ProgressState, SetProgressState] = useState(0);
	useEffect(() => {
		const start = () => {
			NProgress.start();
			SetProgressState(1);
		};
		const end = () => {
			NProgress.done();
			SetProgressState(0)
		};

		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);

		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, []);

	return ProgressState;
};

export default useProgress;