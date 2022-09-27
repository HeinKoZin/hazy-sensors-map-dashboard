import { Header } from "@components/Header";
import { SideBar } from "@components/SideBar";
import { Box, colors, styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

interface MainLayoutProps {
	children: React.ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
	return (
		<Box sx={{ width: "100%", height: "100%" }}>
			<Header />
			<Offset />
			<Box
				sx={{
					width: "100%",
					height: "calc(100% - 64px)",
					backgroundColor: colors.grey[200],
					display: "flex",
				}}
			>
				<SideBar />
				<Outlet />
			</Box>
		</Box>
	);
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
