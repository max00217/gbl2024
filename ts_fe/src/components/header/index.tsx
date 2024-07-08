import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Box } from "@mui/material";
import QrCodeIcon from "@mui/icons-material/QrCode";

interface HeaderProps {
	hide: boolean;
	openModal?: any;
	disableQR?: boolean;
	title?: string;
}

function Header({
	disableQR = false,
	hide,
	openModal = () => {},
	title = "부스 목록",
}: HeaderProps) {
	return (
		<>
			{disableQR ? null : (
				<Box position={"absolute"} top={20} right={20} zIndex={1500}>
					<Button
						variant='contained'
						disableElevation
						startIcon={<QrCodeIcon></QrCodeIcon>}
						sx={{
							bgcolor: hide ? "rgb(0, 100, 255)" : "rgb(208, 227, 255)",
							color: hide ? "white" : "rgb(0, 100, 255)",
							transition: "0.3s",
							borderRadius: "100px",
							fontSize: "13px",
							"&:hover": {
								backgroundColor: "rgb(0, 100, 255)",
								color: "white",
							},
						}}
						disableRipple
						disableTouchRipple
						disableFocusRipple
						onClick={openModal}
					>
						QR코드 스캔
					</Button>
				</Box>
			)}
			<AppBar
				position='sticky'
				elevation={0}
				sx={{
					backgroundColor: hide
						? "rgb(230, 230, 230)"
						: "rgba(255, 255, 255, 0)",
					transition: "0.3s",
					borderBottomRightRadius: "20px",
					borderBottomLeftRadius: "20px",
					transform: hide ? "translateY(calc(-30vh - 30px))" : "",
				}}
			>
				<Toolbar>
					<Typography
						fontSize={"50px"}
						ml={"10px"}
						fontWeight={800}
						alignItems={"flex-end"}
						color={hide ? "rgb(0, 100, 255)" : "rgb(50, 50, 50)"}
						pt={"30vh"}
						pb={"30px"}
						sx={{
							transform: hide ? "scale(0.5)" : "",
							transformOrigin: "left bottom",
							flexGrow: 1,
							alignSelf: "flex-end",
							transition: "0.3s",
						}}
					>
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
		</>
	);
}

export default Header;
