import styled from "@emotion/styled";
import {
	Stack,
	Step,
	StepConnector,
	Stepper,
	stepConnectorClasses,
} from "@mui/material";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "rgb(255, 212, 0)",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "rgb(255, 212, 0)",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: "#eaeaf0",
		padding: "0px",
		borderTopWidth: 3,
		borderRadius: "10px",
		transition: "0.3s",
	},
}));

interface CustomizedSteppers {
	maxstep: number;
	now: number;
}

export default function CustomizedSteppers(props: CustomizedSteppers) {
	return (
		<Stepper
			activeStep={props.now}
			connector={<QontoConnector />}
			sx={{
				position: "absolute",
				width: "calc(100% - 50px)",
				left: "25px",
				top: "20px",
				gap: "10px",
			}}
		>
			{Array(props.maxstep)
				.fill(0)
				.map((item, index) => {
					return <Step sx={{ display: "none" }} key={index}></Step>;
				})}
		</Stepper>
	);
}
