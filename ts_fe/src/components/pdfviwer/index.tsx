import * as React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin, ToolbarSlot } from "@react-pdf-viewer/toolbar";
import { fullScreenPlugin } from "@react-pdf-viewer/full-screen";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import "@react-pdf-viewer/full-screen/lib/styles/index.css";

interface ToolbarSlotsExampleProps {
	fileUrl: string;
}

const ToolbarSlotsExample: React.FC<ToolbarSlotsExampleProps> = ({
	fileUrl,
}) => {
	const toolbarPluginInstance = toolbarPlugin();
	const fullScreenPluginInstance = fullScreenPlugin();

	const { Toolbar } = toolbarPluginInstance;

	return (
		<div
			className='rpv-core__viewer'
			style={{
				display: "flex",
				width: "calc(100% - 40px)",
				marginLeft: "20px",
				// justifyContent: "center",
				flexDirection: "column",
				height: "calc(100% - 250px)",
				backgroundColor: "rgb(250, 250, 250)",
				borderRadius: "10px",
			}}
		>
			<div
				style={{
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: "#eeeeee",
					display: "flex",
					padding: "4px",
					width: "200px",
					position: "absolute",
					bottom: "100px",
					zIndex: 1001,
					left: "calc(50% - 100px)",
					borderRadius: "10px",
				}}
			>
				<Toolbar>
					{(props: ToolbarSlot) => {
						const { EnterFullScreen, Zoom, ZoomIn, ZoomOut } = props;
						return (
							<>
								<div style={{ padding: "0px 2px" }}>
									<ZoomOut />
								</div>
								<div style={{ padding: "0px 2px" }}>
									<Zoom />
								</div>
								<div style={{ padding: "0px 2px" }}>
									<ZoomIn />
								</div>

								<div style={{ padding: "0px 2px", marginLeft: "10px" }}>
									<EnterFullScreen />
								</div>
							</>
						);
					}}
				</Toolbar>
			</div>
			<div
				style={{
					flex: 1,
					overflow: "hidden",
				}}
			>
				<Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'></Worker>
				<Viewer
					fileUrl={fileUrl}
					plugins={[toolbarPluginInstance, fullScreenPluginInstance]}
				/>
			</div>
		</div>
	);
};

export default ToolbarSlotsExample;
