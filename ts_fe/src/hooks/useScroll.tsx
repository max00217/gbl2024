import { useEffect, useRef, useState } from "react";

interface ScrollPosition {
	scrollTop: number;
	scrollHeight: number;
	clientHeight: number;
}

const useScroll = (ms: number) => {
	const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
		scrollTop: 0,
		scrollHeight: 0,
		clientHeight: 0,
	});
	const scrollRef = useRef<HTMLDivElement>(null);
	const shouldIgnoreScrollRef = useRef<boolean>(false);
	const timerRef = useRef<NodeJS.Timeout>();

	const updateScrollPosition = () => {
		const currentRef = scrollRef.current;
		if (currentRef) {
			const scrollTop = currentRef.scrollTop;
			const scrollHeight = currentRef.scrollHeight;
			const clientHeight = currentRef.clientHeight;
			setScrollPosition({ scrollTop, scrollHeight, clientHeight });
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (!shouldIgnoreScrollRef.current) {
				updateScrollPosition();

				shouldIgnoreScrollRef.current = true;
				timerRef.current = setTimeout(() => {
					shouldIgnoreScrollRef.current = false;
					updateScrollPosition();
				}, ms);
			}
		};

		const currentRef = scrollRef.current;
		if (currentRef) {
			currentRef.addEventListener("scroll", handleScroll);
		}

		return () => {
			if (currentRef) {
				currentRef.removeEventListener("scroll", handleScroll);
			}
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, []);

	return { scrollRef, scrollPosition };
};

export default useScroll;
