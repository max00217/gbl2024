import AppLayout from "@/layouts/app-layout";
import { Box, Card, CardContent, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

import { useRouter } from "next/router";
import Background from "@/components/background";
import { useEffect, useState } from "react";
import { getNotification } from "@/lib/notification";

interface NotificationType {
	title: string;
	content: string;
	time: string;
}
const AnnounceCard = ({ title, content, time }: NotificationType) => {
	return (
		<Card
			sx={{ mt: "15px", bgcolor: "rgb(250, 250, 250)", borderRadius: "10px" }}
			elevation={0}
		>
			<CardContent>
				<Typography sx={{ fontSize: 10 }} color='text.secondary'>
					{time}
				</Typography>
				<Typography
					fontSize={"20px"}
					fontWeight={800}
					color={"rgb(50, 50, 50)"}
				>
					{title}
				</Typography>

				<Typography
					variant='body2'
					sx={{ wordBreak: "break-all", color: "rgb(100, 100, 100)" }}
				>
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
};

const AnnouncePage = () => {
	const AuthState = useSelector((state: RootState) => state.auth);
	const router = useRouter();
	const [Notification, SetNotification] = useState<NotificationType[]>([]);
	useEffect(() => {
		getNotification().then((res) => {
			SetNotification(res.data.notifications);
		});
	}, []);
	return (
		<>
			<Background></Background>

			<AppLayout>
				<Typography
					fontSize={"20px"}
					mt={"25px"}
					ml={"25px"}
					fontWeight={900}
					color={"rgb(230, 230, 230)"}
				>
					GBL2023
				</Typography>
				<Typography fontSize={"35px"} ml={"25px"} fontWeight={900}>
					공지사항
				</Typography>

				<Box width={"calc(100% - 50px)"} ml={"25px"}>
					{Notification.map((item, index) => {
						return <AnnounceCard {...item} key={index}></AnnounceCard>;
					})}
				</Box>
			</AppLayout>
		</>
	);
};

export default AnnouncePage;
