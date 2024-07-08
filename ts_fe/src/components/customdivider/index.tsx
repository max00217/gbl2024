import { Chip, Divider } from "@mui/material";

interface CustomDivider {
	mt?: number;
	mb?: number;
	label: String;
}

const CustomDivider = ({ mt = 40, mb = 20, label }: CustomDivider) => {
	return (
		<Divider
			sx={{
				width: "calc(100% - 40px)",
				ml: "20px",
				mt: mt + "px",
				mb: mb + "px",
				position: "sticky",
				top: "40px",
			}}
		>
			<Chip label={label} />
		</Divider>
	);
};

export default CustomDivider;
