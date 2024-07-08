import Background from "@/components/background";
import useElementHeight from "@/hooks/useElementHeight";
import AppLayout from "@/layouts/app-layout";
import {
	Box,
	Button,
	Card,
	CardContent,
	Stack,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const ResultPage = () => {
	const element_height_ref = useElementHeight();
	const router = useRouter();
	return (
		<Box ref={element_height_ref} overflow={"scroll"}>
			<Background></Background>
			<Typography
				fontSize={"20px"}
				mt={"25px"}
				ml={"25px"}
				fontWeight={900}
				color={"rgb(230, 230, 230)"}
			>
				GBL2023
			</Typography>
			<Typography fontWeight={900} variant='h4' ml={"25px"}>
				채점 결과
			</Typography>

			<Stack px={"30px"}>
				{Array(10)
					.fill(1)
					.map((item, index) => {
						return (
							<Card
								key={index}
								sx={{
									mt: "15px",
									bgcolor: "rgb(250, 250, 250)",
									borderRadius: "10px",
								}}
								elevation={0}
							>
								<CardContent>
									<Typography fontSize={"20px"} fontWeight={800}>
										문제
									</Typography>
									<Typography
										fontSize={"15px"}
										fontWeight={800}
										color={"rgb(36, 189, 110)"}
									>
										얻은 점수 : 0 / 10
									</Typography>

									<Typography
										variant='body2'
										sx={{ wordBreak: "break-all", color: "rgb(100, 100, 100)" }}
									>
										입력한 답 : ㅇㅁㅈㅇ
									</Typography>
								</CardContent>
							</Card>
						);
					})}
			</Stack>
			<Button
				variant='contained'
				disableElevation
				fullWidth
				sx={{
					position: "sticky",
					bottom: "20px",
					height: "50px",
					width: "calc(100% - 60px)",
					ml: "30px",
					mt: "60px",
					borderRadius: "10px",
				}}
				onClick={() => {
					router.push("/booth");
				}}
			>
				돌아가기
			</Button>
		</Box>
	);
};

export default ResultPage;
