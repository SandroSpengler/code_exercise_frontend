import React from "react";

const HomePage = (): React.JSX.Element => {
	return (
		<React.Fragment>
			<div className="mx-auto grid grid-cols-12 w-10/12">
				<h2 className="col-span-full">Ein einfaches Frontend für die Coding Aufgabe</h2>
				<h2 className="col-span-full">Erstellt wurde das Frontend mit React</h2>
			</div>
		</React.Fragment>
	);
};

export default HomePage;
