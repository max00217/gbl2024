import LogoImage from "@/assets/img/logo.svg";
import { Stack, Typography, Box } from "@mui/material";
import useElementHeight from "@/hooks/useElementHeight";
import Image from "next/image";
import { Fade } from "@mui/material";

interface LoadingPageProps {
	msg ? : string;
}

const LoadingPage = ({ msg="페이지 로딩중" }: LoadingPageProps) => {
	const element_ref = useElementHeight();

	return (
		<Fade in={true} timeout={100}>
			<Stack
				width={"100%"}
				ref={element_ref}
				bgcolor={"white"}
				zIndex={4000}
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
					<Typography variant='h5' fontWeight={800} mb={"20px"}>
						{msg}
					</Typography>
					<Typography
						variant='subtitle2'
						textAlign={"center"}
						fontWeight={600}
						color={"rgb(100, 100, 100)"}
					>
						페이지 로딩이 길어질
						<br />
						경우 브라우저를 새로고침해주세요.
					</Typography>
				</Stack>
			</Stack>
		</Fade>
	);
};

export default LoadingPage;
