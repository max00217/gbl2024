import { Box } from "@mui/material";
import { ReactNode } from "react";

import useElementHeight from "@/hooks/useElementHeight";

interface LoginLayoutProps {
	children: ReactNode;
	width_pad: number;
	gap: number;
}

const LoginLayout = ({
	children,
	width_pad = 0,
	gap = 0,
}: LoginLayoutProps) => {
	const full_height_ref = useElementHeight(60);

	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			justifyContent={"end"}
			ref={full_height_ref}
			pb={"60px"}
			gap={gap + "px"}
			position={"relative"}
			sx={{
				width: `calc(100% - ${width_pad}px)`,
				zIndex: 10,
			}}
			pl={width_pad / 2 + "px"}
		>
			{children}
		</Box>
	);
};

export default LoginLayout;
