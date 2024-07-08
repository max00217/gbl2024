import { ReactNode } from "react";
import { Box } from "@mui/material";
import useElementHeight from "@/hooks/useElementHeight";

import NavBar from "@/components/navbar";

interface AppLayoutProps {
	children?: ReactNode;
	scroll_ref?: React.RefObject<HTMLDivElement>;
}

export default function AppLayout({ children, scroll_ref }: AppLayoutProps) {
	const nav_height = 70;

	const element_height_ref = useElementHeight(nav_height);

	return (
		<Box position={"relative"} pb={nav_height + "px"} ref={element_height_ref}>
			<Box width={"100%"} height={"100%"} ref={scroll_ref} overflow={"scroll"}>
				{children}
			</Box>
			<NavBar></NavBar>
		</Box>
	);
}
