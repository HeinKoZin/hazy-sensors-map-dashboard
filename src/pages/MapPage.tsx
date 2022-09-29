import Voronoi from "@components/Voronoi";
import { Box, Button, Typography } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAllSensors } from "@apis/useAllSensor";

const generatePDF = () => {
	const data = document.querySelector("#report") as HTMLElement;
	html2canvas(data).then((canvas) => {
		const imgData = canvas.toDataURL("image/png");
		const pdf = new JsPDF();
		pdf.addImage(imgData, "PNG", 0, 0);
		// pdf.output('dataurlnewwindow');
		pdf.save("download.pdf");
	});
};

const MapPage = () => {
	return (
		<Box
			sx={{
				p: 4,
			}}
		>
			<Box
				sx={{
					width: "100%",
					height: "100%",
				}}
			>
				<div
					style={{
						position: "relative",
						width: "100%",
					}}
					id={"report"}
				>
					<Box
						sx={{
							width: 600,
							height: 600,
							position: "relative",
						}}
					>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.0308636868076!2d96.07702741534915!3d16.8743677218381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1951a22ab3f19%3A0x4ee3872256ed81a!2sAsxox%20Online%20Shopping!5e0!3m2!1sen!2smm!4v1664385998101!5m2!1sen!2smm"
							loading="lazy"
							width={"100%"}
							height={"100%"}
							style={{ border: 0, position: "absolute" }}
						></iframe>
					</Box>
					<Box sx={{ position: "absolute", left: 0, top: 0 }}>
						<Voronoi width={600} height={700} />
					</Box>
				</div>
			</Box>
			<Button variant="contained" sx={{ mt: 5 }} onClick={() => generatePDF()}>
				Export
			</Button>
		</Box>
	);
};

export default MapPage;
