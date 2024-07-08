import LoginLayout from "@/layouts/login-layout";
import Background from "@/components/background";
import GoogleLoginButton from "@/components/loginbutton";
import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useRouter } from "next/router";
import CustomSnackBar from "@/components/snackbar";
import { login } from "@/store/auth-slice";
import Stack from "@mui/material/Stack";
import Slide from "@mui/material/Slide";
import axios from "axios";

import LoadingPage from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import useGoogleSignIn from "@/hooks/useGoogleSignIn";
import SerializeUser from "@/utils/serializeUser";

const LoginPage = () => {
	const [animation, setanimation] = useState(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const AuthState = useSelector((state: RootState) => state.auth);
	const [SnackbarInfo, SetSnackbarInfo] = useState({
		open: false,
		text: "",
		severity: "",
	});

	const { user, error, isLoading, signInWithGoogle } = useGoogleSignIn();

	useEffect(() => {
		setanimation(true);
		if (localStorage.getItem("adminauth")) {
			router.push("/admin/dashboard");
		}
	}, []);

	return (
		<>
			{isLoading ? <LoadingPage msg='로그인 대기중'></LoadingPage> : null}
			<Background></Background>
			<LoginLayout width_pad={60} gap={4}>
				<Box position={"fixed"} top={"100px"}>
					<Typography fontWeight={800} variant='h2'>
						GBL
					</Typography>
					<Typography fontWeight={800} variant='h2' mb={"50px"}>
						2023
					</Typography>
					<Typography
						fontWeight={400}
						variant='subtitle2'
						color={"rgb(100, 100, 100)"}
						ml={"10px"}
					>
						혹시 부스 관리자이신가요?
					</Typography>
					<Button
						variant='contained'
						disableElevation
						startIcon={<VpnKeyIcon></VpnKeyIcon>}
						sx={{
							bgcolor: "rgb(208, 227, 255)",
							color: "rgb(0, 100, 255)",
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
						onClick={() => {
							router.push("/admin/dashboard");
						}}
					>
						관리자 페이지 바로가기
					</Button>
				</Box>
				<Slide in={animation} timeout={500} direction='up'>
					<Stack>
						<Typography
							color={"rgb(150, 150, 150)"}
							fontWeight={400}
							variant='subtitle1'
						>
							대신고등학교에서 발급한 GOOGLE
							<br />
							계정으로 로그인이 가능합니다.
						</Typography>
						<Box height={20}></Box>
						<GoogleLoginButton
							onClick={() => {
								signInWithGoogle()
									.then((userinfo: any) => {
										dispatch(login(SerializeUser(userinfo)));

										axios
											.post("/api/auth/login", { uid: userinfo.uid })
											.then((res) => {
												SetSnackbarInfo({
													...SnackbarInfo,
													open: true,
													text: "로그인에 성공했습니다.",
													severity: "success",
												});
												userinfo.registered = true;
												dispatch(login(SerializeUser(userinfo)));
											})
											.catch((err) => {
												if (err.response.data.message === "User not found") {
													SetSnackbarInfo({
														...SnackbarInfo,
														open: true,
														text: "회원가입페이지로 이동합니다.",
														severity: "success",
													});
													userinfo.registered = false;
													dispatch(login(SerializeUser(userinfo)));
												}
											});
									})

									.catch((error: any) => {
										SetSnackbarInfo({
											...SnackbarInfo,
											open: true,
											text: "로그인에 실패했습니다. " + error.message,
											severity: "error",
										});
									});
							}}
						></GoogleLoginButton>
					</Stack>
				</Slide>
			</LoginLayout>
			<CustomSnackBar
				{...SnackbarInfo}
				closefn={() => {
					SetSnackbarInfo({
						...SnackbarInfo,
						open: false,
					});
				}}
			></CustomSnackBar>
		</>
	);
};

export default LoginPage;
