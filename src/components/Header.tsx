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

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

export const Header = () => {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const theme = useTheme();

	return (
		<AppBar position="fixed" elevation={2} color={"inherit"}>
			<Toolbar>
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
						display: "flex",
						alignItems: "center",
					}}
				>
					Hazy Sensors <Box sx={{ width: 5 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						sx={{
							fontFamily: "Quicksand",
							fontWeight: 700,
							display: { xs: "none", md: "flex" },
							color: "inherit",
							textDecoration: "none",
						}}
					>
						Dashboard
					</Typography>
				</Typography>
			</Toolbar>
		</AppBar>
	);
};
