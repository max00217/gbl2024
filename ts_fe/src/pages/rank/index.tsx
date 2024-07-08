import { Typography, Slider, Button } from "@mui/material";
import Header from "@/components/header";
import Background from "@/components/background";
import useScroll from "@/hooks/useScroll";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import InputBase from "@mui/material/InputBase";
import RankItem from "@/components/rankitem";
import ProgressBar from "@/components/progressbar";

import withAuth from "@/utils/withAuth";
import useElementHeight from "@/hooks/useElementHeight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";
import { getRanks } from "@/lib/rank";

const RankPage = () => {
	const { scrollRef, scrollPosition } = useScroll(0);
	const [scrolled, Setscrolled] = useState(false);
	const [progress, Setprogress] = useState(0);
	const [Loading, SetLoading] = useState(true);
	const [Rank, SetRank] = useState([]);
	const element_height_ref = useElementHeight();
	const router = useRouter();

	useEffect(() => {
		if (scrollPosition.scrollTop > 0) {
			Setscrolled(true);
		} else {
			Setscrolled(false);
		}
		Setprogress(
			(scrollPosition.scrollTop /
				(scrollPosition.scrollHeight - scrollPosition.clientHeight)) *
				100
		);
	}, [scrollPosition]);

	useEffect(() => {
		getRanks().then((res) => {
			if (!res.data.ranks) {
				SetRank([]);
			} else {
				SetRank(res.data.ranks);
			}
		});
		SetLoading(false);
	}, []);

	return (
		<>
			<ProgressBar value={progress}></ProgressBar>
			<Background hide={scrolled}></Background>
			<Box ref={element_height_ref}>
				<Box height={"100%"} ref={scrollRef} overflow={"scroll"}>
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
					<Header title='현재 순위' hide={scrolled} disableQR></Header>

					<InputBase
						sx={{
							bgcolor: "rgb(240, 240, 240)",
							width: "calc(100% - 50px)",
							ml: "25px",
							p: "10px 20px",
							backdropFilter: "blur(0.1px)",
							height: "45px",
							zIndex: "30",
							borderRadius: "10px",
							transition: "0.3s",
							mb: "30px",
						}}
						placeholder='이름을 입력해주세요.'
					></InputBase>

					<Slide in={!Loading} direction='up' timeout={400}>
						<Box>
							{Rank.map((item, index) => (
								<RankItem rank={index + 1} item={item} key={index}></RankItem>
							))}
							{Rank.length === 0 ? (
								<Typography
									fontSize={"20px"}
									textAlign={"center"}
									color={"rgb(230, 230, 230)"}
								>
									체험자 없음
								</Typography>
							) : null}
						</Box>
					</Slide>
					<Box height={"60px"}></Box>

					<Button
						startIcon={<ChevronLeftIcon></ChevronLeftIcon>}
						variant='text'
						color='primary'
						sx={{
							position: "absolute",
							bottom: "10px",
							bgcolor: "rgb(255, 182, 10)",
							width: "calc(100% - 40px)",
							ml: "20px",
							mb: "10px",
							height: "50px",
							borderRadius: "10px",
							color: "white",
							"&:hover": {
								bgcolor: "rgb(255, 182, 10)",
							},
							fontSize: "15px",
							fontWeight: "900",
						}}
						disableElevation
						disableFocusRipple
						onClick={() => {
							router.push("/mypage");
						}}
					>
						뒤로가기
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default withAuth(RankPage);
