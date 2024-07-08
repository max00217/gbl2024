import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, Slide } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";

interface CustomSnackbar {
	open: boolean;
	closefn: any;
	text: string;
	severity: any;
}

export default function CustomSnackbar({
	open,
	closefn,
	text,
	severity,
}: CustomSnackbar) {
	const handleClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		closefn();
	};
	return (
		<Slide direction='down' in={open}>
			<Snackbar
				open={open}
				autoHideDuration={8000}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
			>
				<Alert
					onClose={handleClose}
					severity={severity ? severity : "info"}
					sx={{
						width: "100%",
						ml: "15px",
						mr: "15px",
						mt: "20px",
						borderRadius: "20px",
					}}
				>
					<AlertTitle>정보</AlertTitle>
					{text}
				</Alert>
			</Snackbar>
		</Slide>
	);
}
