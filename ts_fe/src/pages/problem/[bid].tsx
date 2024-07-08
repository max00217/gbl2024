import useElementHeight from "@/hooks/useElementHeight";
import {
	Box,
	Button,
	Fade,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	Stack,
	SxProps,
	TextField,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import Background from "@/components/background";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import CustomizedSteppers from "@/components/stepper";
import PdfViwer from "@/components/pdfviwer";
import { changeComplexity, getBooth } from "@/lib/booth";
import { getProblem, submitAnswer } from "@/lib/problems";
import LoadingPage from "@/components/loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const PdfComponent = ({ src, step }: { src: string; step: number }) => {
	const element_height_ref = useElementHeight();

	return (
		<Box ref={element_height_ref}>
			<Typography
				fontSize={"20px"}
				pt={"35px"}
				ml={"25px"}
				fontWeight={900}
				color={"rgb(230, 230, 230)"}
			>
				STEP{step * 2 + 1}
			</Typography>
			<Typography
				fontSize={"25px"}
				width={"calc(100% - 80px)"}
				ml={"25px"}
				mb={"20px"}
				fontWeight={900}
				color={"rgb(50, 50, 50)"}
			>
				아래 PDF를 참고하여 기본 개념을 학습하세요.
			</Typography>
			{src === "" ? (
				<Box
					sx={{
						width: "calc(100% - 100px)",
						px: "30px",
						py: "20px",
						ml: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "10px",
						bgcolor: "rgb(240, 240, 240)",
					}}
				>
					PDF파일이 없습니다.
				</Box>
			) : (
				<PdfViwer fileUrl={`/getfile/${src}`}></PdfViwer>
			)}
		</Box>
	);
};

const VideoComponent = ({ src, step }: { src: string; step: number }) => {
	const element_height_ref = useElementHeight();

	return (
		<Box ref={element_height_ref}>
			<Typography
				fontSize={"20px"}
				pt={"35px"}
				ml={"25px"}
				fontWeight={900}
				color={"rgb(230, 230, 230)"}
			>
				STEP{step * 2 + 1}
			</Typography>
			<Typography
				fontSize={"25px"}
				width={"calc(100% - 80px)"}
				ml={"25px"}
				mb={"20px"}
				fontWeight={900}
				color={"rgb(50, 50, 50)"}
			>
				아래 동영상을 참고하여 문제를 해결하세요.
			</Typography>
			{src === "" ? (
				<Box
					sx={{
						width: "calc(100% - 100px)",
						px: "30px",
						py: "20px",
						ml: "20px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "10px",
						bgcolor: "rgb(240, 240, 240)",
					}}
				>
					동영상 파일이 없습니다.
				</Box>
			) : (
				<video
					style={{
						width: "calc(100% - 100px)",
						marginLeft: "50px",
						maxHeight: "70%",
						marginTop: "20px",
					}}
					playsInline
					controls
					src={`/getfile/${src}`}
				></video>
			)}
		</Box>
	);
};

const SolveComponent = ({
	step,
	question,
	score,
	value,
	onChange,
}: {
	step: number;
	question: string;
	score: number;
	value: string;
	onChange: any;
}) => {
	const element_height_ref = useElementHeight();

	return (
		<Box ref={element_height_ref}>
			<Typography
				fontSize={"20px"}
				pt={"35px"}
				ml={"25px"}
				fontWeight={900}
				color={"rgb(230, 230, 230)"}
			>
				STEP{step * 2 + 2}
			</Typography>
			<Typography
				fontSize={"25px"}
				width={"calc(100% - 80px)"}
				ml={"25px"}
				fontWeight={900}
				color={"rgb(50, 50, 50)"}
			>
				{question ? question : "정해진 문제가 존재하지 않습니다."}
			</Typography>
			<Typography
				fontSize={"15px"}
				width={"calc(100% - 80px)"}
				ml={"25px"}
				mb={"20px"}
				fontWeight={800}
				color={"rgb(150, 150, 150)"}
			>
				배점 : {score}점
			</Typography>
			<TextField
				label='답을 입력하세요.'
				variant='outlined'
				onChange={onChange}
				value={value}
				sx={{
					bgcolor: "rgb(240, 240, 240)",
					width: "calc(100% - 50px)",
					ml: "25px",
					border: "none",
					borderRadius: "10px",
					"& .MuiOutlinedInput-notchedOutline": {
						border: 0,
					},
					mt: "40px",
				}}
				fullWidth
			/>
		</Box>
	);
};

const CustomButton = ({
	onClick,
	text,
	sx,
}: {
	onClick?: any;
	text?: string;
	sx?: SxProps;
}) => {
	return (
		<Button
			fullWidth
			sx={{
				bgcolor: "rgb(240, 240, 240)",
				borderRadius: "10px",
				fontSize: "16px",
				"&:hover": {
					bgcolor: "rgb(240, 240, 240)",
				},
				color: "rgb(100, 100, 100)",
				fontWeight: 900,
				transition: "0.3s",
				overflow: "hidden",
				display: "block",
				...sx,
			}}
			disableRipple
			onClick={onClick}
		>
			{text}
		</Button>
	);
};

function ProblemPage() {
	interface ProblemType {
		answer: string;
		bid: string;
		pdf_url: string;
		problem_type: string;
		question: string;
		score: number;
	}

	const element_height_ref = useElementHeight();
	const [SwiperInstance, setSwiperInstance] = useState<any>(null);
	const [PageNum, SetPageNum] = useState(0);
	const AuthState = useSelector((state: RootState) => state.auth);
	const AdminAuthState = useSelector((state: RootState) => state.adminauth);
	const [BoothInfo, SetBoothInfo] = useState({
		name: "",
	});
	const [ProblemsInfo, SetProblemsInfo] = useState<ProblemType[]>([]);
	const [AnswerList, SetAnswerList] = useState<string[]>([]);
	const router = useRouter();
	const { bid } = router.query;

	const [loading, Setloading] = useState({
		is_loading: true,
		msg: "문제정보를 불러오는중입니다.",
	});

	const refreshBoothInfo = (bid: string) => {
		getBooth(bid).then((res) => {
			SetBoothInfo(res.data);
		});
	};

	const refreshProblemsInfo = (bid: string) => {
		getProblem(bid).then((res) => {
			console.log(res.data.problems);
			SetProblemsInfo(res.data.problems);
			Setloading({
				...loading,
				is_loading: false,
			});
			SetAnswerList(Array(res.data.problems.length).fill(""));
		});
	};

	useEffect(() => {
		if (!bid) {
			return;
		} else {
			refreshProblemsInfo(bid as string);
			refreshBoothInfo(bid as string);
		}
	}, [bid]);

	useEffect(() => {
		if (PageNum === -1) {
			router.push(`/booth/${bid}`);
		}
		if (SwiperInstance !== null) {
			SwiperInstance.slideTo(PageNum);
		}
	}, [PageNum]);

	return (
		<>
			{loading.is_loading ? (
				<LoadingPage msg={loading.msg}></LoadingPage>
			) : null}

			<Fade in={PageNum !== 0}>
				<Box>
					<CustomizedSteppers
						maxstep={ProblemsInfo.length * 2 + 1}
						now={PageNum}
					></CustomizedSteppers>
				</Box>
			</Fade>

			<Background></Background>
			<Swiper
				onSwiper={(swiper) => {
					setSwiperInstance(swiper);
				}}
				allowTouchMove={false}
			>
				<SwiperSlide>
					<Box ref={element_height_ref}>
						<Typography
							fontSize={"20px"}
							pt='25px'
							ml={"25px"}
							fontWeight={900}
							color={"rgb(230, 230, 230)"}
							zIndex={100}
							sx={{
								transition: "0.3s",
							}}
						>
							GBL2023 문제페이지
						</Typography>
						<Typography
							fontSize={"30px"}
							width={"calc(100% - 80px)"}
							ml={"25px"}
							fontWeight={900}
							color={"rgb(50, 50, 50)"}
						>
							{BoothInfo.name}
						</Typography>
					</Box>
				</SwiperSlide>
				{ProblemsInfo.map((item, index) => {
					return (
						<Fragment key={index}>
							<SwiperSlide key={index + "a"}>
								{item.question.search("(동영상)") === -1 ? (
									<PdfComponent step={index} src={item.pdf_url}></PdfComponent>
								) : (
									<VideoComponent
										step={index}
										src={item.pdf_url}
									></VideoComponent>
								)}
							</SwiperSlide>
							<SwiperSlide key={index + "b"}>
								<SolveComponent
									value={AnswerList[index]}
									onChange={(e: ChangeEvent<HTMLInputElement>) => {
										let temp = [...AnswerList];
										temp[index] = e.target.value;
										SetAnswerList(temp);
									}}
									step={index}
									question={item.question.replace("(동영상)", "")}
									score={item.score}
								></SolveComponent>
							</SwiperSlide>
						</Fragment>
					);
				})}
			</Swiper>
			<Stack
				direction={"row"}
				height={"50px"}
				px={"20px"}
				width={"calc(100% - 40px)"}
				gap={"15px"}
				position={"absolute"}
				bottom={"20px"}
				zIndex={1000}
			>
				<CustomButton
					text={PageNum == 0 ? "부스 소개" : "이전"}
					sx={{
						width: PageNum == 0 ? "120px" : "100%",
					}}
					onClick={() => {
						SetPageNum(PageNum - 1);
					}}
				></CustomButton>
				<CustomButton
					text={PageNum === ProblemsInfo.length * 2 ? "제출하기" : "다음"}
					onClick={() => {
						if (PageNum === ProblemsInfo.length * 2) {
							if (AdminAuthState.is_logined) {
								alert("부스 담당자는 문제를 풀 수 없습니다.");
								if (confirm("이전 페이지로 이동하시겠습니까?")) {
									router.push("/admin/dashboard");
								}
							} else if (confirm("답안을 제출하시겠습니까?")) {
								Setloading({
									...loading,
									is_loading: true,
									msg: "답안 제출중",
								});
								submitAnswer(
									bid as string,
									AuthState.user.uid,
									AnswerList
								).then((res) => {
									changeComplexity(bid as string, 0).then(() => {
										console.log(res);
										alert("채점이 완료되었습니다.");
										router.push("/booth");
									});
								});
							}
						} else {
							SetPageNum(PageNum + 1);
						}
					}}
				></CustomButton>
			</Stack>
		</>
	);
}

export default ProblemPage;
