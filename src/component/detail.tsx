import React, { useState } from "react";
import IAuftrag from "../interface/auftrag";

const Detail = (props: { auftrag: IAuftrag }) => {
	const [shouldDisplayDetails, setShouldDisplayDetails] = useState<boolean>(false);

	const displayAuftragBeschreibung = () => {
		if (!shouldDisplayDetails) {
			return;
		}

		return (
			<div className="my-4 p-4 bg-purple-700 rounded-xl">
				<div>
					{props.auftrag.eigenschaften.map((eigenschaft) => {
						return (
							<div className="m-4 p-4 bg-purple-950 rounded-xl">
								<h3 className="font-semibold text-lg">{eigenschaft.beschreibung}</h3>
							</div>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<div>
			<div
				className="my-4 p-4 bg-purple-900 rounded-xl"
				onClick={() => setShouldDisplayDetails(!shouldDisplayDetails)}
			>
				<div id={props.auftrag.id.toString() + Math.random()}>
					<div className="grid grid-cols-12">
						<div className="col-span-12 ">
							<h3 className="font-bold">
								Nr. {props.auftrag.id} - TenantId{" "}
								{props.auftrag.tenantId === undefined ? "n/a" : props.auftrag.tenantId}
							</h3>
						</div>
						<div className="col-span-12 text-gray-400 mt-2">
							<h3>Typ</h3>
						</div>
						<div className="col-span-12 ">
							<h3 className="font-semibold text-lg">{props.auftrag.bezeichnung}</h3>
						</div>
						<div className="col-span-12 text-gray-400 mt-2">
							<h3>Beschreibung</h3>
						</div>
						<div className="col-span-12">
							<h3 className="text-lg">{props.auftrag.beschreibung}</h3>
						</div>
						<div className="col-span-12 mx-auto mt-2 bg-red-400 rounded-full text-3xl aspect-square text-center">
							<h3>↓</h3>
						</div>
					</div>
				</div>
			</div>

			{displayAuftragBeschreibung()}
		</div>
	);
};

export default Detail;
