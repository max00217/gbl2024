import {
	Box,
	circularProgressClasses,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function CustomCircularProgress({ sx }: { sx?: any }) {
	return (
		<Box sx={{ position: "relative", ...sx }}>
			<CircularProgress
				variant='determinate'
				sx={{
					color: (theme) =>
						theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
				}}
				size={40}
				thickness={4}
				value={100}
			/>
			<CircularProgress
				variant='indeterminate'
				disableShrink
				sx={{
					color: "rgb(0, 100, 255)",
                    animationDuration: "550ms",
					position: "absolute",
					left: 0,
					[`& .${circularProgressClasses.circle}`]: {
						strokeLinecap: "round",
					},
				}}
				size={40}
				thickness={4}
			/>
		</Box>
	);
}

export default CustomCircularProgress;
