import React, { useEffect, useState } from "react";
import { Box, LinearProgress, styled } from "@mui/material";
import { linearProgressClasses } from "@mui/material";

const AnimatedLinearProgress = styled(LinearProgress)`
	& .MuiLinearProgress-bar {
		background-color: "red !important";
	}
`;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 4,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: "rgb(231, 241, 255)",
	},
	[`& .${linearProgressClasses.bar}`]: {
		transition: "width 1s easeInOut",
		borderRadius: "0px 5px 5px 0px",
		backgroundColor: "rgb(0, 100, 255)",
	},
}));

interface ProgressBarProps {
	value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		setProgress(value);
	}, [value]);

	return (
		<Box position={"fixed"} top={0} left={0} width={"100%"} zIndex={2000}>
			<BorderLinearProgress variant='determinate' value={progress} />
		</Box>
	);
};

export default ProgressBar;
