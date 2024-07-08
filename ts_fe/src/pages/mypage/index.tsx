import AppLayout from "@/layouts/app-layout";
import { Box, Typography, Button } from "@mui/material";

import Stack from "@mui/material/Stack";
import Profile from "@/components/profile";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import CustomDivider from "@/components/customdivider";

import VerticalBoxLayout, {
	LeftTitle,
	RightTitle,
} from "@/layouts/verticalbox-layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import withAuth from "@/utils/withAuth";

const MyPage = () => {
	interface MyInfoType {
		total_score: number;
		time: string;
		now_rank: number;
		history: {
			name: string;
			score: number;
		}[];
	}

	const AuthState = useSelector((state: RootState) => state.auth);
	const router = useRouter();

	const [MyInfo, SetMyInfo] = useState<MyInfoType>({
		total_score: 0,
		time: "0",
		now_rank: 0,
		history: [],
	});
	useEffect(() => {
		getUser(AuthState.user.uid).then((res) => {
			console.log(res.data);
			if (!res.data.history) {
				SetMyInfo({ ...res.data, history: [] });
			} else {
				SetMyInfo(res.data);
			}
		});
	}, []);

	return (
		<AppLayout>
			<Typography
				fontSize={"20px"}
				position={"absolute"}
				top={"25px"}
				left={"25px"}
				fontWeight={900}
				color={"rgb(230, 230, 230)"}
			>
				GBL2023
			</Typography>

			<Profile {...AuthState.user}></Profile>
			<Box>
				<CustomDivider label='현재까지 받은 점수'></CustomDivider>

				<VerticalBoxLayout>
					<LeftTitle>총 점수</LeftTitle>
					<RightTitle color={"rgb(0, 100, 255)"}>
						{MyInfo.total_score}점
					</RightTitle>
				</VerticalBoxLayout>
			</Box>
			<Box>
				<CustomDivider mt={10} label='현재 등수'></CustomDivider>

				<VerticalBoxLayout>
					<LeftTitle>현재 등수</LeftTitle>
					<RightTitle color={"rgb(255, 165, 81)"}>
						<Stack alignItems={"end"}>
							<Typography variant='h5' fontWeight={800}>
								{MyInfo.now_rank}등
							</Typography>
							<Button
								onClick={() => {
									router.push("/rank");
								}}
							>
								등수 전체보기
							</Button>
						</Stack>
					</RightTitle>
				</VerticalBoxLayout>
			</Box>
			<Box>
				<CustomDivider label='참여 부스 목록' mt={10}></CustomDivider>
				<Stack gap={"30px"} direction={"column"} mb={"50px"}>
					{MyInfo.history.map((item, index) => {
						return (
							<VerticalBoxLayout key={index}>
								<LeftTitle>{item.name}</LeftTitle>
								<RightTitle color='rgb(39, 196, 89)'>
									+{item.score}점
								</RightTitle>
							</VerticalBoxLayout>
						);
					})}
					{MyInfo.history.length === 0 ? (
						<Typography
							fontSize={"20px"}
							textAlign={"center"}
							color={"rgb(230, 230, 230)"}
						>
							부스 체험 기록 없음
						</Typography>
					) : null}
				</Stack>
			</Box>
		</AppLayout>
	);
};

export default withAuth(MyPage);
