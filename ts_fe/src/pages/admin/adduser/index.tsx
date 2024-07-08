import useElementHeight from "@/hooks/useElementHeight";
import withAdminAuth from "@/utils/withAdminAuth";
import { Box, Button, Fade, Typography } from "@mui/material";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import LogoImage from "@/assets/img/logo.svg";
import Image from "next/image";
import { addUser, changeComplexity } from "@/lib/booth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import LoadingPage from "@/components/loading";

const ScannedComponent = ({ data }: { data: any }) => {
	const object_height_ref1 = useElementHeight();
	const router = useRouter();
	const AdminAuthState = useSelector((state: RootState) => state.adminauth);
	const [loading, Setloading] = useState({
		is_loading: false,
		msg: "",
	});
	return (
		<>
			{loading.is_loading ? (
				<LoadingPage msg={loading.msg}></LoadingPage>
			) : null}
			<Fade in={true} timeout={100}>
				<Stack
					width={"100%"}
					ref={object_height_ref1}
					bgcolor={"white"}
					zIndex={20}
					position={"absolute"}
					top={0}
					left={0}
					sx={{
						backdropFilter: "opacity:1",
					}}
					alignItems={"center"}
					justifyContent={"center"}
					gap={"50px"}
				>
					<Stack position={"absolute"} top={"50px"} width={"calc(100% - 50px)"}>
						<Image src={LogoImage} alt='Logo' width={50} height={50}></Image>

						<Typography
							variant='h5'
							fontWeight={800}
							mt={"30px"}
							color={"#ffa600"}
						>
							{data.name}
						</Typography>
						<Typography variant='h5' fontWeight={800} mb={"10px"}>
							사용자를 부스체험자로
							<br />
							추가시키겠습니까?
						</Typography>
						<Typography
							variant='subtitle2'
							fontWeight={600}
							color={"rgb(100, 100, 100)"}
						>
							부스체험자로 등록될 경우,
							<br />
							주어진 문제를 풀고 점수를 받을 수 있습니다.
						</Typography>
					</Stack>
					<Stack
						width={"calc(100% - 50px)"}
						direction={"row"}
						position={"absolute"}
						bottom={"20px"}
						height={"50px"}
						gap={"15px"}
					>
						<Button
							fullWidth
							sx={{
								bgcolor: "rgb(240, 240, 240)",
								borderRadius: "10px",
								fontSize: "16px",
								"&:hover": {
									bgcolor: "rgb(240, 240, 240)",
								},
								fontWeight: "900",
							}}
							disableRipple
							onClick={() => {
								router.push("/admin/adduser");
							}}
						>
							취소하기
						</Button>
						<Button
							fullWidth
							disableRipple
							variant='contained'
							color='primary'
							disableElevation
							sx={{
								borderRadius: "10px",
								color: "white",
								fontSize: "16px",
								fontWeight: "900",
							}}
							onClick={() => {
								Setloading({
									...loading,
									is_loading: true,
									msg: "부스 참가자 추가중",
								});
								addUser(data.uid, AdminAuthState.bid).then((res) => {
									changeComplexity(AdminAuthState.bid, 1).then(() => {
										alert("참가자가 추가되었습니다.");
										router.push("/admin/dashboard");
										console.log(res);
									});
								});
							}}
						>
							추가하기
						</Button>
					</Stack>
				</Stack>
			</Fade>
		</>
	);
};

const AddUserPage = () => {
	const vf = () => {
		return null;
	};
	const [QrData, SetQrData] = useState({
		disabled: true,
		data: {
			is_scanned: false,
			name: "",
			uid: "",
		},
	});
	const router = useRouter();
	const object_height_ref = useElementHeight();

	const onDecode = (result: string) => {
		const QRvalue: typeof QrData.data = JSON.parse(decodeURI(result));
		SetQrData({
			...QrData,
			disabled: true,
			data: { ...QRvalue, is_scanned: true },
		});
	};

	useEffect(() => {
		SetQrData({
			...QrData,
			disabled: false,
		});
	}, []);

	return (
		<>
			{QrData.data.is_scanned ? (
				<ScannedComponent data={QrData.data}></ScannedComponent>
			) : null}

			<Box ref={object_height_ref}>
				<Box
					position={"absolute"}
					zIndex={10}
					width={"calc(100% - 150px)"}
					ml={"50px"}
					px={"30px"}
					py={"20px"}
					bgcolor={"rgb(240, 240, 240)"}
					borderRadius={"10px"}
					mt={"20px"}
				>
					<Typography variant='body1' color='initial' textAlign={"center"}>
						체험자의 QR코드를 인식시켜주세요.
					</Typography>
				</Box>
				{!QrData.disabled ? (
					<QrScanner
						containerStyle={{
							height: "100%",
							padding: "0px",
						}}
						videoStyle={{
							objectFit: "cover",
						}}
						viewFinder={vf}
						onDecode={onDecode}
						onError={(error) => console.log(error?.message)}
					/>
				) : (
					<Stack
						sx={{
							height: "100%",
							alignItems: "center",
							justifyContent: "center",
						}}
						gap={"10px"}
					>
						<CircularProgress></CircularProgress>
						<Typography variant='body1' color='initial'>
							카메라 로딩중
						</Typography>
					</Stack>
				)}

				<Button
					variant='contained'
					disableElevation
					sx={{
						zIndex: 10,
						position: "absolute",
						bottom: "20px",
						width: "calc(100% - 50px)",
						ml: "25px",
						height: "50px",
						color: "white",
					}}
					onClick={() => {
						router.push("/admin/dashboard");
					}}
				>
					돌아가기
				</Button>
			</Box>
		</>
	);
};

export default withAdminAuth(AddUserPage);
