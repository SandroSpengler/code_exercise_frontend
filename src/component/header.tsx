import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="flex justify-between p-4 bg-blue-800 text-white">
			<h1 className="font-bold text-lg">
				<Link to="/">Code Exercise</Link>
			</h1>
			<h2 className="font-semibold">
				<Link to="dashboard"> Dashboard</Link>
			</h2>
		</div>
	);
};

export default Header;
