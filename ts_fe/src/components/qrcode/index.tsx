import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import QRCodeReact from "react-qr-code";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Stack, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import Avartar from "@mui/material/Avatar";
import CustomCircularProgress from "../circular";

const drawerBleeding = 178.5;

interface QrCOdeProps {
	open: any;
	closeQr: any;
	openQr: any;
	value?: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
	borderRadius: 3,
	position: "absolute",
	top: 8,
	left: "calc(50% - 15px)",
}));

export default function QRCodePage({
	open,
	closeQr,
	openQr,
	value,
}: QrCOdeProps) {
	const AuthState = useSelector((state: RootState) => state.auth);
	const QRvalue = encodeURI(
		JSON.stringify({
			name: AuthState.user.displayName,
			uid: AuthState.user.uid,
		})
	);
	const matches = useMediaQuery("(min-width:1024px)");

	return (
		<>
			<Global
				styles={{
					".MuiDrawer-root > .MuiPaper-root": {
						height: `calc(45% + ${drawerBleeding}px)`,
						overflow: "visible",
						borderRadius: "30px 30px 0px 0px",
						maxWidth: "1000px",
						marginLeft: matches ? "calc(50% - 500px)" : "0px",
					},
				}}
			/>
			<SwipeableDrawer
				anchor='bottom'
				open={open}
				onClose={closeQr}
				onOpen={openQr}
				disableDiscovery
				disableRestoreFocus
				disableSwipeToOpen
				disableScrollLock
				elevation={0}
				ModalProps={{
					keepMounted: false,
				}}
				sx={{
					zIndex: 3000,
				}}
			>
				<StyledBox
					sx={{
						position: "absolute",
						top: 0,
						visibility: "visible",
						right: 0,
						left: 0,
						bgcolor: "transparent",
					}}
				>
					<Puller />
					<Stack mt={"40px"} ml={"30px"}>
						<CustomCircularProgress></CustomCircularProgress>
						<Typography
							variant='h6'
							fontSize={"25px"}
							fontWeight={800}
							sx={{ mt: "20px" }}
						>
							아래 QR코드를
						</Typography>
						<Typography
							variant='h6'
							fontSize={"25px"}
							fontWeight={800}
							sx={{ pb: "20px" }}
						>
							담당자에게 보여주세요.
						</Typography>
					</Stack>
				</StyledBox>

				<Stack
					sx={{
						height: `calc(100% - ${drawerBleeding}px)`,
						mt: drawerBleeding + "px",
						px: "30px",
						pb: "200px",
						pt: "40px",
					}}
					flexDirection={"row"}
					alignItems={"center"}
					justifyContent={"center"}
					divider={<Divider orientation='vertical' flexItem />}
					gap={"30px"}
				>
					<Stack width={"50%"} alignItems={"center"} justifyContent={"center"}>
						<Avartar
							sx={{
								width: "23vw",
								maxWidth: "150px",
								height: "23vw",
								maxHeight: "150px",

								mb: "20px",
								fontSize: "30px",
							}}
							src={AuthState.user.photoURL}
						>
							{AuthState.user.displayName[0]}
						</Avartar>
						<Typography
							variant='h6'
							fontWeight={800}
							sx={{
								wordBreak: "break-all",
							}}
						>
							{AuthState.user.displayName}
						</Typography>
						<Typography
							textAlign={"center"}
							variant='body1'
							fontSize={"15px"}
							color={"rgb(200, 200, 200)"}
							sx={{
								wordBreak: "break-all",
							}}
						>
							{AuthState.user.email}
						</Typography>
					</Stack>
					<QRCodeReact
						value={QRvalue}
						style={{ height: "auth", width: "50%" }}
					></QRCodeReact>
				</Stack>
			</SwipeableDrawer>
		</>
	);
}
