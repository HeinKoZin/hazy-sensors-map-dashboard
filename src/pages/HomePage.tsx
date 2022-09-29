import { useAllSensors } from "@apis/useAllSensor";
import {
	Box,
	Button,
	colors,
	Modal,
	Paper,
	styled,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import moment from "moment";
import React, { useRef } from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

export const HomePage = () => {
	const { data: sensors, mutate: refreshSensors } = useAllSensors();

	const deleteSensor = async (id: string) => {
		const data = await fetch(
			import.meta.env.VITE_API_URL + `sensors/delete/${id}`,
			{
				method: "delete",
				headers: new Headers({
					Accept: "application/json",
					"Content-Type": "application/json",
				}),
			}
		).then(
			(res) => res.body as unknown as { message: string; success: boolean }
		);

		if (data.success) {
			console.log(data.message);
			refreshSensors();
		}
	};

	const exportData = () => {
		const data = document.querySelector("#table") as HTMLElement;
		html2canvas(data).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new JsPDF();
			pdf.addImage(imgData, "PNG", 0, 0);
			// pdf.output('dataurlnewwindow');
			pdf.save("download.pdf");
		});
	};

	return (
		<Box sx={{ p: 2 }}>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "end",
					py: 2,
					gap: 2,
				}}
			>
				<AddSensorModal />

				<Button
					sx={{ textTransform: "capitalize" }}
					onClick={() => exportData()}
				>
					Export
				</Button>
			</Box>
			<TableContainer component={Paper} id={"table"}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Device ID</StyledTableCell>
							<StyledTableCell>PM2.5</StyledTableCell>
							<StyledTableCell>Longitude</StyledTableCell>
							<StyledTableCell>Latitude</StyledTableCell>
							<StyledTableCell align="center">Updated At</StyledTableCell>
							<StyledTableCell align="center">Action</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sensors?.data?.map((row) => (
							<StyledTableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<StyledTableCell component="th" scope="row">
									{row.device_id}
								</StyledTableCell>
								<StyledTableCell>{row.pmValue}</StyledTableCell>
								<StyledTableCell>{row.lng}</StyledTableCell>
								<StyledTableCell>{row.lat}</StyledTableCell>
								<StyledTableCell align="center">
									{moment(row.updatedAt).startOf("millisecond").fromNow()}
								</StyledTableCell>
								<StyledTableCell
									sx={{ display: "flex", gap: 1, justifyContent: "center" }}
								>
									<Button
										variant="contained"
										sx={{ backgroundColor: colors.red[600] }}
										onClick={() => deleteSensor(row.id)}
									>
										Delete
									</Button>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: colors.blue[700],
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	"&:nth-of-type(odd)": {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	"&:last-child td, &:last-child th": {
		border: 0,
	},
}));

const AddSensorModal = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const deviceIdRef = useRef<HTMLInputElement>(null);
	const pmValueRef = useRef<HTMLInputElement>(null);
	const longitudeRef = useRef<HTMLInputElement>(null);
	const latitudeRef = useRef<HTMLInputElement>(null);

	const createSensor = async () => {
		const deviceId = deviceIdRef.current?.value;
		const pmValue = pmValueRef.current?.value;
		const longitude = longitudeRef.current?.value;
		const latitude = latitudeRef.current?.value;

		if (deviceId && pmValue && longitude && longitude) {
			const data = await fetch(
				import.meta.env.VITE_API_URL + `sensors/create`,
				{
					method: "post",
					headers: new Headers({
						Accept: "application/json",
						"Content-Type": "application/json",
					}),
					body: JSON.stringify({
						device_id: deviceId,
						lat: latitude,
						lng: longitude,
						pmValue: pmValue,
					}),
				}
			).then(
				(res) => res.body as unknown as { message: string; success: boolean }
			);

			if (data.success) {
				console.log(data.message);
				handleClose();
			}
		}
	};

	return (
		<div>
			<Button onClick={handleOpen} variant="contained">
				Add Sensor
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						borderRadius: 2,
						position: "absolute" as "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: 400,
						bgcolor: "background.paper",
						p: 4,
						gap: 2,
						display: "flex",
						flexDirection: "column",
					}}
				>
					<Typography variant="h6">Add New Sensor</Typography>
					<TextField
						id="outlined-basic"
						label="Device ID"
						variant="outlined"
						inputRef={deviceIdRef}
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						label="PM2.5 Value"
						variant="outlined"
						inputRef={pmValueRef}
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						label="Longitude"
						variant="outlined"
						inputRef={longitudeRef}
						fullWidth
					/>
					<TextField
						id="outlined-basic"
						label="Latitude"
						variant="outlined"
						inputRef={latitudeRef}
						fullWidth
					/>
					<Box sx={{ display: "flex", gap: 2 }}>
						<Button
							color="error"
							variant="contained"
							fullWidth
							onClick={() => handleClose()}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							onClick={() => createSensor()}
							fullWidth
						>
							Create
						</Button>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};
