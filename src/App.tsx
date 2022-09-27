import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { MainLayout } from "@layouts/MainLayout";

function App() {
	const [count, setCount] = useState(0);

	return (
		<MainLayout>
			<h1>test</h1>
		</MainLayout>
	);
}

export default App;
