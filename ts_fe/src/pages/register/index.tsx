import useElementHeight from "@/hooks/useElementHeight";
import {
	Box,
	Typography,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import Background from "@/components/background";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import axios from "axios";
import LoadingPage from "@/components/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { change_type } from "@/store/auth-slice";
import { useRouter } from "next/router";

const CustomSelect = ({
	options,
	name,
	label,
	...arg
}: {
	options: Array<string>;
	name: string;
	value: any;
	label: string;
	onChange: any;
}) => {
	return (
		<FormControl fullWidth>
			<InputLabel id='demo-simple-select-label'>{label}</InputLabel>
			<Select
				labelId='demo-simple-select-label'
				id='demo-simple-select'
				label='Age'
				required
				sx={{
					bgcolor: "rgb(240, 240, 240)",
					borderRadius: "10px",
					"& .MuiOutlinedInput-notchedOutline": {
						border: 0,
					},
				}}
				{...arg}
				name={name}
			>
				{options.map((item, index) => {
					return (
						<MenuItem key={index} value={item}>
							{item}
						</MenuItem>
					);
				})}
			</Select>
		</FormControl>
	);
};

const RegisterPage = () => {
	const element_height_ref = useElementHeight();

	const [formData, setFormData] = useState("메이커");
	const [loading, setloading] = useState(false);
	const AuthState = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();
	const onSubmit = () => {
		setloading(true);
		dispatch(change_type(formData));

		axios
			.post("/api/auth/register", {
				name: AuthState.user.displayName,
				uid: AuthState.user.uid,
				profile_image: AuthState.user.photoURL,
				type: formData,
			})
			.then(() => {
				dispatch(change_type(formData));
			});
	};

	return (
		<>
			{loading ? <LoadingPage msg='회원 등록중입니다.'></LoadingPage> : null}

			<Background></Background>
			<Box ref={element_height_ref} overflow={"scroll"}>
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
				<Typography fontWeight={900} variant='h4' mt={"70px"} ml={"25px"}>
					분야를 선택해주세요.
				</Typography>
				<Typography
					fontWeight={400}
					variant='subtitle1'
					color={"rgb(100, 100, 100)"}
					mt={"10px"}
					ml={"25px"}
				>
					선택하신 분야에 맞추어
					<br />
					부스의 정렬 순서가 바뀝니다.
				</Typography>
				<Stack mt={"40px"} px={"20px"} mb={"100px"} gap={"20px"}>
					<CustomSelect
						name='boothField'
						label='부스 분야'
						options={["메이커", "환경", "STEAM", "AI", "미디어", "창업"]}
						value={formData}
						onChange={(e: any) => {
							setFormData(e.target.value);
						}}
					></CustomSelect>
				</Stack>

				<Button
					variant='contained'
					disableElevation
					color='primary'
					fullWidth
					onClick={onSubmit}
					sx={{
						fontSize: "15px",
						fontWeight: "900",
						height: "50px",
						color: "white",
						width: "calc(100% - 40px)",
						ml: "20px",
						borderRadius: "10px",
						position: "absolute",
						bottom: "20px",
					}}
				>
					입장하기
				</Button>
			</Box>
		</>
	);
};

export default RegisterPage;
