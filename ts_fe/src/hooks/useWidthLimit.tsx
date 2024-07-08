import { useEffect, useState } from "react";

const useWidthExceedingThreshold = (threshold: number): boolean => {
	const [exceedingThreshold, setExceedingThreshold] = useState(false);

	useEffect(() => {
		const handleResize = (): void => {
			const { body } = document;
			if (body) {
				const { clientWidth } = body;
				const isExceedingThreshold = clientWidth > threshold;
				setExceedingThreshold(isExceedingThreshold);
			}
		};

		window.addEventListener("resize", handleResize);
		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [threshold]);

	return exceedingThreshold;
};

export default useWidthExceedingThreshold;
