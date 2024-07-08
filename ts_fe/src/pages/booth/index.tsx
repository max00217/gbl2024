import AppLayout from "@/layouts/app-layout";
import { FilledInput, Typography } from "@mui/material";
import Header from "@/components/header";
import Background from "@/components/background";
import useScroll from "@/hooks/useScroll";
import { useEffect, useState } from "react";
import BoothItem from "@/components/boothitem";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import QRCodePage from "@/components/qrcode";
import InputBase from "@mui/material/InputBase";

import ProgressBar from "@/components/progressbar";

import withAuth from "@/utils/withAuth";
import { getBooths } from "@/lib/booth";

const BoothListPage = () => {
	const { scrollRef, scrollPosition } = useScroll(0);
	const [scrolled, Setscrolled] = useState(false);
	const [progress, Setprogress] = useState(0);
	const [Loading, SetLoading] = useState(true);
	const [OpenModal, SetOpenModal] = useState(false);
	const [boothList, SetboothList] = useState([]);
	const [Search, SetSearch] = useState("");
	const [Available, SetAvailable] = useState(0);
	const openQr = () => {
		SetOpenModal(true);
	};

	const closeQr = () => {
		SetOpenModal(false);
	};

	const refreshBoothList = () => {
		let avail = 0;
		getBooths().then((res) => {
			SetboothList(res.data.boothlist);
			console.log(res.data.boothlist);
			res.data.boothlist.map((item: any) => {
				if (item.complexity === 0) {
					avail = avail + 1;
				}
			});
			SetAvailable(avail);
		});
	};

	useEffect(() => {
		if (scrollPosition.scrollTop > 140) {
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
		SetLoading(false);

		refreshBoothList();

		const getBoothInterval = setInterval(() => {
			refreshBoothList();
		}, 5000);
		return () => {
			clearInterval(getBoothInterval);
		};
	}, []);

	return (
		<>
			<QRCodePage
				open={OpenModal}
				closeQr={closeQr}
				openQr={openQr}
			></QRCodePage>
			<ProgressBar value={progress}></ProgressBar>
			<Background></Background>

			<AppLayout scroll_ref={scrollRef}>
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
				<Header openModal={openQr} hide={scrolled}></Header>

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
					}}
					placeholder='부스명을 입력해주세요.'
					value={Search}
					onChange={(e) => {
						SetSearch(e.target.value);
					}}
				></InputBase>

				<Box
					ml={"25px"}
					padding={"8px 15px"}
					bgcolor={"rgb(240, 240, 240)"}
					mb={"20px"}
					display={"inline-block"}
					borderRadius={"20px"}
					fontSize={"13px"}
					fontWeight={600}
					color={"rgb(100, 100, 100)"}
					mt={"20px"}
				>
					체험가능 부스 : {Available}개
				</Box>

				<Slide in={!Loading} direction='up' timeout={400}>
					<Box>
						{boothList.map((item: any, index) =>
							item.name.search(Search) !== -1 && item.complexity === 0 ? (
								<BoothItem item={item} key={index}></BoothItem>
							) : null
						)}
						{boothList.map((item: any, index) =>
							item.name.search(Search) !== -1 && item.complexity === 1 ? (
								<BoothItem item={item} key={index}></BoothItem>
							) : null
						)}
					</Box>
				</Slide>
			</AppLayout>
		</>
	);
};

export default withAuth(BoothListPage);
