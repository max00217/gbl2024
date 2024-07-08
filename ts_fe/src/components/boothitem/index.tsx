import { Box, Chip } from "@mui/material";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import GetMaxLineProperty from "@/utils/linelimit";

const BoothItem = ({ item }: { item: any }) => {
	const router = useRouter();
	return (
		<Box
			component={"div"}
			onClick={() => {
				router.push(`/booth/${item.bid}`);
			}}
			position={"relative"}
			width={"calc(100% - 40px)"}
			height={"160px"}
			bgcolor={"rgb(240, 240, 240)"}
			ml={"20px"}
			mb={"30px"}
			borderRadius={"20px"}
			display={"flex"}
			overflow={"hidden"}
		>
			<Box position={"relative"} bgcolor={"white"}>
				<Image
					src={`/getfile/${item.thumbnail_url}`}
					width={300}
					height={160}
					style={{ objectFit: "cover", height: "160px", width: "150px" }}
					alt='Image'
				/>
			</Box>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				px={"13px"}
				gap={"10px"}
			>
				<Typography
					variant='subtitle1'
					fontSize={"15px"}
					sx={{ lineHeight: "10px !important" }}
					color={"rgb(150, 150, 150)"}
				>
					분야 : {item.part}
				</Typography>
				<div style={GetMaxLineProperty(2)}>
					<Typography
						variant='h6'
						fontSize={"20px"}
						fontWeight={800}
						width={"100%"}
						sx={{ lineHeight: "30px !important", color: "rgb(30, 30, 30)" }}
					>
						{item.name}
					</Typography>
				</div>
				<div style={GetMaxLineProperty(2)}>
					<Typography
						variant='subtitle1'
						fontSize={"15px"}
						sx={{ lineHeight: "20px !important" }}
						color={"rgb(150, 150, 150)"}
					>
						{item.description}
					</Typography>
				</div>
			</Box>
			<Chip
				sx={{ position: "absolute", left: "10px", top: "10px" }}
				variant='filled'
				size='medium'
				color={item.complexity ? "warning" : "default"}
				label={item.complexity ? "진행중" : "체험가능"}
			/>
		</Box>
	);
};

export default BoothItem;
