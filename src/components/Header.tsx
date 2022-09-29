import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SensorsIcon from "@mui/icons-material/Sensors";
import { colors, useTheme } from "@mui/material";
import { ThemeContext } from "@emotion/react";

export const Header = () => {
	const theme = useTheme();

	return (
		<AppBar position="fixed" elevation={2} color={"inherit"}>
			<Toolbar>
				{/* <IconButton sx={{ mr: 1.5 }}>
					<MenuIcon />
				</IconButton> */}
				<SensorsIcon
					sx={{
						fontSize: 30,
						mr: 1,
						backgroundColor: colors.blue[800],
						color: "#fff",
						padding: theme.spacing(0.5),
						borderRadius: theme.spacing(0.5),
					}}
				/>
				<Typography
					variant="h6"
					noWrap
					component="a"
					href="/"
					sx={{
						mr: 2,
						fontFamily: "Quicksand",
						fontWeight: 700,
						color: "inherit",
						textDecoration: "none",
						alignItems: "center",
						display: { xs: "none", md: "flex" },
						"&:hover": {
							color: "inherit",
						},
					}}
				>
					Hazy Sensors Dashboard
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
