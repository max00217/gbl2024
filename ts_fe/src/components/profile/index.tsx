import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Typography, Button } from "@mui/material";
import { auth } from "@/utils/firebaseInit";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth-slice";

interface ProfileProps {
	displayName: string;
	email: string;
	photoURL: string;
}

const Profile = ({ displayName, email, photoURL }: ProfileProps) => {
	const router = useRouter();
	const dispatch = useDispatch();

	return (
		<Box
			width={"calc(100% - 70px)"}
			ml={"35px"}
			display={"flex"}
			flexDirection={"row"}
			alignItems={"center"}
			justifyContent={"space-between"}
			mt={"80px"}
		>
			<Avatar
				src={photoURL}
				sx={{ height: "130px", width: "130px", fontSize: "50px" }}
			></Avatar>
			<Box
				display={"flex"}
				flexDirection={"column"}
				alignItems={"end"}
				justifyContent={"center"}
			>
				<Typography
					variant='h4'
					fontWeight={800}
					mb={"5px"}
					textAlign={"right"}
				>
					{displayName}
				</Typography>
				<Typography
					mt={"5px"}
					color={"rgb(200, 200, 200)"}
					variant='subtitle1'
					maxWidth={"70%"}
					textAlign={"right"}
					sx={{
						wordBreak: "break-all",
					}}
				>
					{email}
				</Typography>
				<Button
					startIcon={<LogoutIcon></LogoutIcon>}
					sx={{
						mt: "10px",
						bgcolor: "#ffd8d8",
						borderRadius: "100px",
						color: "red",
						p: "5px 20px",
						"&:hover": {
							background: "#f00",
							color: "white",
						},
					}}
					disableRipple
					variant='contained'
					disableElevation
					onClick={() => {
						signOut(auth);
						dispatch(logout());
						router.push("/");
						localStorage.removeItem("auth");
					}}
				>
					로그아웃
				</Button>
			</Box>
		</Box>
	);
};

export default Profile;
