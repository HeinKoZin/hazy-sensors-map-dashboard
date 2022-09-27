import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { MainLayout } from "@layouts/MainLayout";
import { useRoutes } from "react-router-dom";
import { HomePage } from "@pages/HomePage";

function App() {
	let element = useRoutes([
		{
			path: "/",
			element: <MainLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
			],
		},
	]);
	return element;
}

export default App;
