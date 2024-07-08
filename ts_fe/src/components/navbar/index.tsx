import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import HomeIcon from "@mui/icons-material/Home";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import NotificationsIcon from "@mui/icons-material/Notifications";

import CornerImage from "@/assets/img/corner.svg";

import Image from "next/image";
import { Box } from "@mui/material";
import { useState, memo } from "react";
import { useRouter } from "next/router";

const NavBar = () => {
	const nav_height = 70;
	const router = useRouter();
	const [value, setValue] = useState(router.pathname);
	const nav_color = "rgb(240, 240, 240)";
	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
		router.push(newValue);
	};
	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "1000px",
				height: nav_height + "px",
			}}
			position={"absolute"}
		>
			<Box
				width={"100%"}
				position={"absolute"}
				height={"30px"}
				display={"flex"}
				flexDirection={"row"}
				justifyContent={"space-between"}
				top={"-29px"}
			>
				<Image
					style={{ transform: "rotate(90deg)" }}
					height={30}
					src={CornerImage}
					alt='corneriamge'
				></Image>
				<Image height={30} src={CornerImage} alt='corneriamge'></Image>
			</Box>
			<BottomNavigation
				value={value}
				onChange={handleChange}
				sx={{
					backgroundColor: "red",
					width: "100%",
					bottom: `-${nav_height}px`,
					height: nav_height,
					bgcolor: nav_color,
					zIndex: 200,
				}}
			>
				<BottomNavigationAction
					value='/booth'
					disableRipple
					icon={
						<HomeIcon
							sx={{
								color:
									value === "/booth"
										? "rgb(100, 100, 100)"
										: "rgb(220, 220, 220)",
								transition: "0.3s",
							}}
							fontSize={"large"}
						/>
					}
				/>
				<BottomNavigationAction
					value='/announce'
					disableRipple
					icon={
						<NotificationsIcon
							sx={{
								color:
									value === "/announce"
										? "rgb(100, 100, 100)"
										: "rgb(220, 220, 220)",
								transition: "0.3s",
							}}
							fontSize={"large"}
						/>
					}
				/>
				<BottomNavigationAction
					value='/mypage'
					disableRipple
					icon={
						<AdminPanelSettingsIcon
							sx={{
								color:
									value === "/mypage"
										? "rgb(100, 100, 100)"
										: "rgb(220, 220, 220)",
								transition: "0.3s",
							}}
							fontSize={"large"}
						/>
					}
				/>
			</BottomNavigation>
		</Box>
	);
};

export default memo(NavBar);
