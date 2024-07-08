import withAdminAuth from "@/utils/withAdminAuth";
import Background from "@/components/background";
import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/adminauth-slice";
import { useRouter } from "next/router";
import { RootState } from "@/store";
import { changeComplexity } from "@/lib/booth";
import useElementHeight from "@/hooks/useElementHeight";

const DashboardPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const AdminAuthState = useSelector((state: RootState) => state.adminauth);
	const element_height_ref = useElementHeight();
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
				부스관리
			</Typography>

			<Divider
				sx={{
					mt: "20px",
					mb: "10px",
					width: "calc(100% - 40px)",
					mx: "20px",
				}}
			>
				<Chip label='참가자 추가' />
			</Divider>
			<Typography fontWeight={500} variant='body1' ml={"25px"}>
				아래 버튼을 눌러 부스 참가자의
				<br />
				QR코드를 찍어주세요.
			</Typography>

			<Button
				variant='contained'
				color='inherit'
				disableElevation
				sx={{
					mx: "20px",
					width: "calc(100% - 40px)",
					mt: "10px",
					height: "50px",
				}}
				onClick={() => {
					router.push("/admin/adduser");
				}}
			>
				참가자 추가하기
			</Button>
			<Divider
				sx={{
					mt: "20px",
					mb: "10px",
					width: "calc(100% - 40px)",
					mx: "20px",
				}}
			>
				<Chip label='문제 수정' />
			</Divider>
			<Typography fontWeight={500} variant='body1' ml={"25px"}>
				아래 버튼을 눌러 부스 참가자들에게 보여질 문제를 수정하세요.
				<br />
				(초기 1회는 반드시 수정해야함.)
			</Typography>
			<Button
				variant='contained'
				disableElevation
				color='inherit'
				sx={{
					mx: "20px",
					width: "calc(100% - 40px)",
					mt: "10px",
					height: "50px",
				}}
				onClick={() => {
					router.push("/admin/editproblem");
				}}
			>
				문제 수정하기
			</Button>
			<Button
				variant='contained'
				disableElevation
				color='inherit'
				sx={{
					mx: "20px",
					width: "calc(100% - 40px)",
					mt: "10px",
					height: "50px",
				}}
				onClick={() => {
					router.push(`/problem/${AdminAuthState.bid}`);
				}}
			>
				문제 보기
			</Button>
			<Divider
				sx={{
					mt: "20px",
					mb: "10px",
					width: "calc(100% - 40px)",
					mx: "20px",
				}}
			>
				<Chip label='상태바꾸기' />
			</Divider>
			<Typography fontWeight={500} variant='body1' ml={"25px"}>
				상태바꾸기
			</Typography>
			<Button
				variant='contained'
				disableElevation
				sx={{
					mx: "20px",
					width: "calc(100% - 40px)",
					mt: "10px",
					height: "50px",
					color: "white",
				}}
				onClick={() => {
					changeComplexity(AdminAuthState.bid, 0);
					alert("변경되었습니다.");
				}}
			>
				원활로 바꾸기
			</Button>
			<Button
				variant='contained'
				disableElevation
				sx={{
					mx: "20px",
					width: "calc(100% - 40px)",
					mt: "10px",
					height: "50px",
					color: "white",
				}}
				onClick={() => {
					changeComplexity(AdminAuthState.bid, 1).then(() => {
						alert("변경되었습니다.");
					});
				}}
			>
				체험중으로 바꾸기
			</Button>

			<Divider
				sx={{
					mt: "20px",
					mb: "10px",
					width: "calc(100% - 40px)",
					mx: "20px",
				}}
			>
				<Chip label='로그아웃' />
			</Divider>
			<Typography fontWeight={500} variant='body1' ml={"25px"}>
				로그아웃
			</Typography>

			<Button
				variant='contained'
				disableElevation
				sx={{
					mx: "20px",
					width: "calc(100% - 40px)",
					mt: "10px",
					height: "50px",
					color: "white",
				}}
				onClick={() => {
					dispatch(logout());
					localStorage.removeItem("adminauth");
					router.push("/booth");
				}}
			>
				로그아웃
			</Button>
		</Box>
	);
};

export default withAdminAuth(DashboardPage);
