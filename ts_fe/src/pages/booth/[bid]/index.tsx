import { useRouter } from "next/router";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import useElementHeight from "@/hooks/useElementHeight";
import { useEffect, useState } from "react";
import GetMaxLineProperty from "@/utils/linelimit";
import Image from "next/image";
import useScroll from "@/hooks/useScroll";
import Stack from "@mui/material/Stack";
import withAuth from "@/utils/withAuth";

import VerticalBoxLayout, {
	LeftTitle,
	RightTitle,
} from "@/layouts/verticalbox-layout";
import { getBooth, getCheck } from "@/lib/booth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { getUser } from "@/lib/auth";

const BoothDetail = () => {
	const router = useRouter();
	const { bid } = router.query;
	const element_height_ref = useElementHeight();
	const [Scrolled, SetScrolled] = useState(false);
	const { scrollRef, scrollPosition } = useScroll(0);
	const [BoothInfo, SetBoothInfo] = useState<any>({});
	const [inParticipate, SetinParticipate] = useState(0);
	const [inAdded, SetinAdded] = useState(0);
	const AuthState = useSelector((state: RootState) => state.auth);

	const [ButtonShown, SetButtonShown] = useState(false);

	useEffect(() => {
		if (scrollPosition.scrollTop > 3) {
			SetScrolled(true);
		} else {
			SetScrolled(false);
		}
	}, [scrollPosition]);

	useEffect(() => {
		if (!bid) {
			return;
		} else {
			getBooth(bid as string).then((booth_res) => {
				SetBoothInfo(booth_res.data);
				getCheck(AuthState.user.uid, bid as string).then((check_res) => {
					if (check_res.data.participate) {
						SetinAdded(1);
					} else {
						SetinAdded(2);
					}
					var hasValueLessThanTen = false;

					getUser(AuthState.user.uid).then((user_res) => {
						if (user_res.data.history === null) {
							SetinParticipate(1);
						} else {
							user_res.data.history.map((item: any, index: number) => {
								if (!hasValueLessThanTen) {
									console.log("da", item.name, booth_res.data.name);

									if (item.name == booth_res.data.name) {
										SetinParticipate(2);
										hasValueLessThanTen = true;
									}
								}
							});
							if (!hasValueLessThanTen) {
								SetinParticipate(1);
							}
						}
					});
				});
			});
		}
	}, [bid, AuthState]);

	useEffect(() => {
		console.log(inParticipate, inAdded);
	}, [inParticipate, inAdded]);

	useEffect(() => {
		setTimeout(() => {
			SetButtonShown(true);
		}, 500);
	}, []);

	return (
		<Box ref={element_height_ref} overflow={"hidden"}>
			<Box ref={scrollRef} height={"100%"} overflow={"scroll"}>
				<AppBar
					position='absolute'
					elevation={0}
					sx={{
						backgroundColor: Scrolled
							? "rgb(230, 230, 230)"
							: "rgba(255, 255, 255, 0)",
						transition: "0.3s",
						borderBottomRightRadius: "20px",
						borderBottomLeftRadius: "20px",
						height: "300px",
						transform: Scrolled ? "translateY(-230px)" : "translateY(0px)",
					}}
				>
					<Typography
						fontSize={"20px"}
						position={"absolute"}
						top={"25px"}
						left={"25px"}
						fontWeight={900}
						color={"rgb(230, 230, 230)"}
						zIndex={100}
					>
						GBL2023
					</Typography>
					{BoothInfo.thumbnail_url !== undefined ? (
						<Image
							fill
							style={{
								objectFit: "cover",
								filter: "brightness(70%)",
								transition: "0.3s",
								opacity: Scrolled ? "0" : "1",
							}}
							alt='BoothImage'
							src={`/getfile/${BoothInfo.thumbnail_url}`}
						></Image>
					) : null}
					<Toolbar
						sx={{
							marginBottom: "10px",
							position: "absolute",
							bottom: "0px",
						}}
					>
						<div style={GetMaxLineProperty(2)}>
							<Typography
								fontSize={"40px"}
								fontWeight={800}
								color={Scrolled ? "rgb(100, 100, 100)" : "white"}
								px={"10px"}
								sx={{
									transform: Scrolled ? "scale(0.4)" : "",
									transformOrigin: "left bottom",
									flexGrow: 1,
									alignSelf: "flex-end",
									transition: "0.3s",
								}}
							>
								{BoothInfo.name}
							</Typography>
						</div>
					</Toolbar>
				</AppBar>
				<Box height={"300px"}></Box>

				<Typography variant='h6' fontWeight={800} ml={"20px"} mt={"30px"}>
					필요 역량
				</Typography>
				<Typography
					width={"calc(100% - 80px)"}
					mt={"10px"}
					ml={"20px"}
					py={"20px"}
					px='20px'
					fontWeight={600}
					bgcolor={"rgb(240, 240, 240)"}
					variant='body1'
					color='rgb(100, 100, 100)'
					borderRadius={"10px"}
				>
					{BoothInfo.description}
				</Typography>

				<Typography variant='h6' fontWeight={800} ml={"20px"} mt={"30px"}>
					프로젝트 소개 영상
				</Typography>

				<video
					src={`/getfile/${BoothInfo.video_url}`}
					style={{
						width: "calc(100% - 50px)",
						marginLeft: "25px",
						marginTop: "10px",
						borderRadius: "10px",
					}}
					// autoPlay
					// muted
					playsInline
					controls
				></video>

				<Typography variant='h6' fontWeight={800} ml={"20px"} mt={"30px"}>
					프로젝트 개요
				</Typography>

				<Box mt={"20px"}>
					<VerticalBoxLayout>
						<LeftTitle>부스 혼잡도</LeftTitle>
						<RightTitle
							color={
								BoothInfo.complexity === 0
									? "rgb(0, 100, 255)"
									: "rgb(255, 68, 0)"
							}
						>
							{BoothInfo.complexity === 0 ? "체험 가능" : "체험 진행중"}
						</RightTitle>
					</VerticalBoxLayout>
				</Box>

				<Box mt={"20px"}>
					<VerticalBoxLayout>
						<LeftTitle>부스 분야</LeftTitle>
						<RightTitle color={"rgb(255, 149, 0)"}>{BoothInfo.part}</RightTitle>
					</VerticalBoxLayout>
				</Box>

				<Box height={"200px"}></Box>
				<Stack
					width={"calc(100% - 40px)"}
					ml={"20px"}
					direction={"row"}
					position={"sticky"}
					bottom={"15px"}
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
							router.push("/booth");
						}}
					>
						부스목록
					</Button>
					{inAdded !== 2 && inParticipate !== 2 && ButtonShown ? (
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
								router.push(`/problem/${bid}`);
							}}
						>
							문제풀기
						</Button>
					) : null}
					{inParticipate === 2 ? (
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
								alert("이미 참여한 부스입니다.");
							}}
						>
							참여한 부스
						</Button>
					) : null}
				</Stack>
			</Box>
		</Box>
	);
};

export default withAuth(BoothDetail);
