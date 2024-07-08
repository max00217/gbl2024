import useElementHeight from "@/hooks/useElementHeight";
import {
	Box,
	TextField,
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
import LoadingPage from "@/components/loading";
import CustomSnackBar from "@/components/snackbar";
import { fileUpload } from "@/lib/upload";
import { makeBooth } from "@/lib/booth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { create } from "@/store/adminauth-slice";

export const CustomFileInput = ({
	text,
	name,
	onChange,
	filetype,
	...args
}: {
	text: string;
	name: string;
	filetype: string;
	onChange: (file: File) => void;
	InputLabelProps: any;
}) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const maxSize = 500 * 1024 * 1024;

		const file = event.target.files?.[0];
		if (file) {
			if (file.size > maxSize) {
				alert("파일 용량이 500MB를 넘을 수 없습니다.");
				event.target.value = "";
			} else {
				if (file.type.search(filetype) === -1) {
					alert(
						filetype + "에 해당하는 파일이 아닙니다. 파일을 다시 선택해주세요."
					);
					event.target.value = "";
				} else {
					onChange(file);
				}
			}
		}
	};

	return (
		<TextField
			type='file'
			label={text}
			id='margin-none'
			required
			name={name}
			onChange={handleFileChange}
			{...args}
			sx={{
				bgcolor: "rgb(240, 240, 240)",
				borderRadius: "10px",
				border: 0,

				"& .MuiOutlinedInput-notchedOutline": {
					border: 0,
					borderRadius: "10px",
				},
			}}
		/>
	);
};

export const CustomInput = ({
	text,
	multiline = false,
	name,
	type = "text",
	...args
}: {
	text: string;
	multiline?: boolean;
	name: string;
	value: any;
	onChange: any;
	type?: string;
}) => {
	return (
		<TextField
			label={text}
			id='margin-none'
			multiline
			maxRows={multiline ? 6 : 1}
			required
			name={name}
			type={type}
			{...args}
			sx={{
				bgcolor: "rgb(240, 240, 240)",
				borderRadius: "10px",
				border: 0,

				"& .MuiOutlinedInput-notchedOutline": {
					border: 0,
					borderRadius: "10px",
				},
			}}
		/>
	);
};

export const CustomSelect = ({
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

const MakeBoothPage = () => {
	const element_height_ref = useElementHeight();

	const [SnackbarInfo, SetSnackbarInfo] = useState({
		open: false,
		text: "",
		severity: "",
	});

	interface FormData {
		boothName: string;
		boothDescription: string;
		boothField: string;
		peopleNumber: string;
	}

	interface FileList {
		thumbnail: Blob | null;
		video: Blob | null;
	}

	const [formData, setFormData] = useState<FormData>({
		boothName: "",
		boothDescription: "",
		boothField: "",
		peopleNumber: "",
	});
	const [fileList, SetfileList] = useState<FileList>({
		thumbnail: null,
		video: null,
	});
	const [loading, Setloading] = useState({
		is_loading: false,
		msg: "",
	});
	const AdminAuthState = useSelector((state: RootState) => state.adminauth);
	const dispatch = useDispatch();

	const validateData = (): string[] => {
		let emptyFields: string[] = [];

		for (let field in formData) {
			if (!formData[field as keyof FormData]) {
				emptyFields.push(field);
			}
		}

		for (let file in fileList) {
			if (!fileList[file as keyof FileList]) {
				emptyFields.push(file);
			}
		}

		return emptyFields;
	};

	const handleChange = (event: any) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleThumbnailFileUpload = async (file: File) => {
		SetfileList((prevFormData: any) => ({
			...prevFormData,
			thumbnail: file,
		}));
	};
	const handleVideoFileUpload = async (file: File) => {
		SetfileList((prevFormData: any) => ({
			...prevFormData,
			video: file,
		}));
	};

	const ErrHandlering = (err: any) => {
		console.log(err);
		SetSnackbarInfo({
			...SnackbarInfo,
			open: true,
			text: `오류가 발생했습니다. ${err.response.data.error}`,
			severity: "warning",
		});
		Setloading({
			...loading,
			is_loading: false,
		});
	};

	const onSubmit = () => {
		Setloading({
			...loading,
			is_loading: true,
		});
		const valid_res = validateData();
		if (valid_res.length !== 0) {
			Setloading({
				...loading,
				is_loading: false,
			});
			SetSnackbarInfo({
				...SnackbarInfo,
				open: true,
				text: "모든 양식을 채워주세요.",
			});
			return;
		} else {
			const ThumbnailformData = new FormData();
			const VideoformData = new FormData();

			let fileUrl = {
				thumbnail: "",
				video: "",
			};

			ThumbnailformData.append(
				"file",
				fileList.thumbnail ? fileList.thumbnail : ""
			);
			VideoformData.append("file", fileList.video ? fileList.video : "");

			fileUpload(ThumbnailformData, (percent: number) => {
				Setloading({
					msg: `이미지 업로드중입니다. ${percent}%`,
					is_loading: true,
				});
			})
				.then((res_thumbnail) => {
					fileUrl.thumbnail = res_thumbnail.data.file;
					fileUpload(VideoformData, (percent: number) => {
						console.log(percent);
						Setloading({
							msg: `동영상 업로드중입니다. ${percent}%`,
							is_loading: true,
						});
					})
						.then((res_video) => {
							fileUrl.video = res_video.data.file;
							Setloading({
								msg: `부스를 만드는중입니다.`,
								is_loading: true,
							});
							makeBooth({
								bid: AdminAuthState.bid,
								name: formData.boothName,
								description: formData.boothDescription,
								video_url: fileUrl.video,
								thumbnail_url: fileUrl.thumbnail,
								part: formData.boothField,
							}).then((res) => {
								dispatch(create());
							});
						})
						.catch((err) => {
							ErrHandlering(err);
						});
				})
				.catch((err) => {
					ErrHandlering(err);
				});
		}
	};

	return (
		<>
			<CustomSnackBar
				{...SnackbarInfo}
				closefn={() => {
					SetSnackbarInfo({
						...SnackbarInfo,
						open: false,
					});
				}}
			></CustomSnackBar>

			{loading.is_loading ? (
				<LoadingPage msg={loading.msg}></LoadingPage>
			) : null}
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
					부스만들기
				</Typography>
				<Typography
					fontWeight={400}
					variant='subtitle1'
					color={"rgb(100, 100, 100)"}
					mt={"10px"}
					ml={"25px"}
				>
					아래 양식을 작성한 후<br />
					제출 버튼을 눌러주세요.
				</Typography>
				<Stack mt={"40px"} px={"20px"} mb={"100px"} gap={"20px"}>
					<CustomInput
						name='boothName'
						text='부스 이름'
						multiline={false}
						value={formData.boothName}
						onChange={handleChange}
					></CustomInput>
					<CustomInput
						name='boothDescription'
						text='필요역량'
						value={formData.boothDescription}
						multiline
						onChange={handleChange}
					></CustomInput>
					<CustomSelect
						name='boothField'
						label='부스 분야'
						options={["메이커", "환경", "STEAM", "AI", "미디어", "창업"]}
						value={formData.boothField}
						onChange={handleChange}
					></CustomSelect>
					<CustomSelect
						name='peopleNumber'
						label='체험 인원수'
						options={["1명", "2명", "3명", "4명", "5명"]}
						value={formData.peopleNumber}
						onChange={handleChange}
					></CustomSelect>
					<CustomFileInput
						name='thumbnail'
						text='썸네일 업로드'
						filetype='image'
						onChange={handleThumbnailFileUpload}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<CustomFileInput
						name='video'
						text='영상 업로드'
						filetype='video'
						onChange={handleVideoFileUpload}
						InputLabelProps={{
							shrink: true,
						}}
					/>
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
						zIndex: 10,
						bottom: "20px",
					}}
				>
					부스만들기
				</Button>
			</Box>
		</>
	);
};

export default MakeBoothPage;
