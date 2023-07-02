import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./app.css";
import Dashboard from "./page/dashboard";
import HomePage from "./page/homepage";
import Header from "./component/header";

const App = (): React.JSX.Element => {
	return (
		<BrowserRouter>
			<header>
				<Header />
			</header>
			<div className="m-4 p-4 text-white">
				<Routes>
					{/* <Route path="*" element={<HomePage />}></Route> */}
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/dashboard" element={<Dashboard />}></Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
