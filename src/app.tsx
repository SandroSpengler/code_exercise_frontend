import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./app.css";
import Dashboard from "./page/dashboard";
import HomePage from "./page/homepage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* <Route path="*" element={<HomePage />}></Route> */}
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
