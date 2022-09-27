import {
	alpha,
	Button,
	colors,
	Drawer,
	IconButton,
	styled,
	Toolbar,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useMatch } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

export const SideBar = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	return (
		<Drawer
			variant={"permanent"}
			open={true}
			sx={{ position: "relative", zIndex: 1 }}
		>
			<Toolbar></Toolbar>
			<Box
				sx={{
					width: "256px",
					height: `calc(100% - ${isMobile ? "56px" : "64px"})`,
					backgroundColor: "#fff",
					color: "#000",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					boxSizing: "border-box",
					py: theme.spacing(2),
					px: theme.spacing(2),
					gap: theme.spacing(2),
					top: isMobile ? "56px" : "64px",
				}}
			>
				{[
					{ title: "Home", path: "/" },
					{ title: "Map", path: "/map" },
				].map((item) => (
					<MenuItem title={item.title} path={item.path} />
				))}
			</Box>
		</Drawer>
	);
};

interface MenuItemProps {
	title: string;
	path: string;
}

const MenuItem = (props: MenuItemProps) => {
	return (
		<StyledButton path={props.path} startIcon={<HomeIcon />}>
			{props.title}
		</StyledButton>
	);
};

const StyledButton = styled(Button)<{ path: string }>(({ theme, path }) => ({
	backgroundColor: useMatch(path)?.pathname
		? alpha(colors.blue[700], 0.2)
		: "transparent",
	color: useMatch(path)?.pathname ? colors.blue[700] : colors.grey[700],
	borderRadius: theme.spacing(2),
	width: "100%",
	":hover": {
		backgroundColor: useMatch(path)?.pathname
			? alpha(colors.blue[700], 0.3)
			: alpha(theme.palette.common.black, 0.06),
	},
	justifyContent: "start",
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	paddingLeft: theme.spacing(3),
	textTransform: "capitalize",
}));
