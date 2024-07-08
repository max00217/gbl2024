import { Box, Typography, Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { ReactNode } from "react";

interface VerticalBoxLayoutProps {
	children: ReactNode;
	sx?:any
}

const VerticalBoxLayout = ({ children, sx }: VerticalBoxLayoutProps) => {
	return (
		<Box
			sx={{ width: "calc(100% - 60px)", ml: "30px", ...sx }}
			display={"flex"}
			flexDirection={"row"}
			alignItems={"center"}
			justifyContent={"space-between"}
		>
			{children}
		</Box>
	);
};

export default VerticalBoxLayout;

interface LeftTitleProps {
	children: any;
	color?: string;
}

export const LeftTitle = ({ children, color="rgb(100, 100, 100)" }: LeftTitleProps) => {
	return (
		<Typography variant='h6' fontWeight={500} color={color}>
			{children}
		</Typography>
	);
};

interface RightTitleProps {
	children: any;
	color: string;
}


export const RightTitle = ({ children, color }: RightTitleProps) => {
	return (
		<Typography variant='h5' fontWeight={800} color={color}>
            {children}
		</Typography>
	);
};
