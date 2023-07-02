import React, { useEffect, useState } from "react";
import IAuftrag from "../interface/auftrag";
import Detail from "./detail";

const Summary = (props: { aufträge: IAuftrag[] }) => {
	const [aufträge, setAufträge] = useState<IAuftrag[]>([]);

	useEffect(() => {
		setAufträge(props.aufträge);
	});

	const displayAufträge = () => {
		return (
			<div>
				{aufträge.map((auftrag) => {
					return <Detail auftrag={auftrag} />;
				})}
			</div>
		);
	};

	return <div>{displayAufträge()}</div>;
};

export default Summary;
