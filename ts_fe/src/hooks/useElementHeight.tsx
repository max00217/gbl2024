import { useEffect, useRef } from "react";

const useElementHeight = (gap = 0) => {
	const elementRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const resizeHandler = () => {
			if (elementRef.current) {
				elementRef.current.style.height = `${window.innerHeight - gap}px`;
			}
		};

		resizeHandler(); // 초기 렌더링 시에도 높이를 설정하기 위해 한 번 호출

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return elementRef;
};

export default useElementHeight