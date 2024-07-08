import LogoImage from "@/assets/img/logo.svg";
import { Stack, Typography, Box } from "@mui/material";
import useElementHeight from "@/hooks/useElementHeight";
import Image from "next/image";
import { Fade, Button } from "@mui/material";
import WindowIcon from "@mui/icons-material/Window";
import { useRouter } from "next/router";
import withAuth from "@/utils/withAuth";
import { useEffect } from "react";
import axios from "axios";
const LoadingPage = () => {
	const element_ref = useElementHeight();
	const router = useRouter();
	return (
		<Fade in={true} timeout={100}>
			<Stack
				width={"100%"}
				ref={element_ref}
				bgcolor={"white"}
				zIndex={3000}
				position={"fixed"}
				top={0}
				left={0}
				sx={{
					backdropFilter: "opacity:1",
				}}
				alignItems={"center"}
				justifyContent={"center"}
				gap={"50px"}
			>
				<Image src={LogoImage} alt='Logo' width={100} height={100}></Image>
				<Stack alignItems={"center"} justifyContent={"center"}>
					<Typography variant='h3' fontWeight={800} mb={"20px"}>
						404
					</Typography>
					<Typography variant='h5' fontWeight={800} mb={"20px"}>
						페이지를 찾을 수 없어요.
					</Typography>
					<Typography
						variant='subtitle2'
						textAlign={"center"}
						fontWeight={600}
						color={"rgb(100, 100, 100)"}
					>
						입력한 URL이 올바른지 확인해주세요.
					</Typography>
					<Button
						sx={{ mt: "20px", color: "white" }}
						disableRipple
						variant='contained'
						disableElevation
						startIcon={<WindowIcon></WindowIcon>}
						onClick={() => {
							router.push("/");
						}}
					>
						홈화면 바로가기
					</Button>
				</Stack>
			</Stack>
		</Fade>
	);
};

export default withAuth(LoadingPage);
