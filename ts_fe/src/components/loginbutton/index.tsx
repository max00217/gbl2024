import GoogleLogo from "@/assets/img/search.svg";
import Image from "next/image";
import styles from "./styles.module.css";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

interface GoogleLoginButtonProps {
	onClick?: any;
}

const GoogleLoginButton = ({ onClick }: GoogleLoginButtonProps) => {
	return (
		<Button
			onClick={onClick}
			sx={{
				p:0,
				m:0
			}}
		>
			<Box
				className={styles.GoogleLoginButton}
				display={"flex"}
				flexDirection={"row"}
				width={"100%"}
				height={"55px"}
				bgcolor={"rgb(245, 245, 245)"}
				alignItems={"center"}
				justifyContent={"space-around"}
			>
				<Image
					width={27}
					src={GoogleLogo}
					className={styles.google_logo}
					alt='GoogleLogo'
				/>
				<Typography
					variant='subtitle1'
					className={styles.login_text}
					fontWeight={800}
				>
					GOOGLE 계정으로 로그인
				</Typography>
			</Box>
		</Button>
	);
};

export default GoogleLoginButton;
