import React, { ChangeEvent, useEffect, useState } from "react";
import { getAllAufträge, postAuftrag } from "../service/httpService";
import IAuftrag from "../interface/auftrag";
import Summary from "../component/summary";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";

const Dashboard = (): React.JSX.Element => {
	const [aufträge, setAufträge] = useState<IAuftrag[]>([]);
	const [aufträgeMitSelectedTenantId, setAufträgeMitSelectedTenantId] = useState<IAuftrag[]>([]);
	const [aufträgeOhneTenantId, setAufträgeOhneTenantId] = useState<IAuftrag[]>([]);

	const [error, setError] = useState<string>("");
	const [selectedTenant, setSelectedTenant] = useState<number>();

	const [isModelVisible, setIsModalVisible] = useState<boolean>(false);

	const schema = z.object({
		idInput: number().min(1),
		bezeichnung: string().min(1),
		beschreibung: string().min(1),
		tenantId: number().min(1),
	});
	const { register, handleSubmit, formState, reset, clearErrors } = useForm({
		defaultValues: { idInput: 0, bezeichnung: "", beschreibung: "", tenantId: 0 },
		resolver: zodResolver(schema),
	});

	const { errors } = formState;

	useEffect(() => {
		(async () => {
			try {
				const fetchedAufträge = await getAllAufträge();

				setAufträge(fetchedAufträge);

				splitAufträgeByTenant(fetchedAufträge, 0);
			} catch (error: any) {
				setError(`HTTP-Error: ${error.message}`);
			}
		})();
	}, []);

	const filterUniqueTenants = (aufträge: IAuftrag[]): number[] => {
		const uniqueTenants: Set<number> = new Set();

		for (const auftrag of aufträge) {
			if (auftrag.tenantId === undefined) {
				continue;
			}

			uniqueTenants.add(auftrag.tenantId);
		}

		return Array.from(uniqueTenants);
	};

	const onTenantSelected = (e: ChangeEvent<HTMLSelectElement>) => {
		e.preventDefault();

		setSelectedTenant(Number(e.target.value));

		splitAufträgeByTenant(aufträge, Number(e.target.value));
	};

	const splitAufträgeByTenant = (aufträge: IAuftrag[], tenantId: Number) => {
		const auftragOhne = [];
		const auftragMit = [];

		for (const auftrag of aufträge) {
			if (auftrag.tenantId === undefined || tenantId === 0) {
				auftragOhne.push(auftrag);

				continue;
			}

			if (auftrag.tenantId !== tenantId) {
				auftragOhne.push(auftrag);

				continue;
			}

			auftragMit.push(auftrag);
		}

		setAufträgeMitSelectedTenantId(auftragMit);
		setAufträgeOhneTenantId(auftragOhne);
	};

	const displayAufträge = () => {
		return (
			<React.Fragment>
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-6 bg-blue-800 p-2 mt-4">
						<h3 className="text-gray-400">
							{selectedTenant === undefined
								? "Alle Auträge mit TenantId"
								: `Tenant: ${selectedTenant}`}
						</h3>
						<Summary aufträge={aufträgeMitSelectedTenantId} />
					</div>
					<div className="col-span-6 bg-blue-800 p-2 mt-4">
						<h3 className="text-gray-400">Mit unterschiedlicher TenantId</h3>
						<Summary aufträge={aufträgeOhneTenantId} />
					</div>
				</div>
			</React.Fragment>
		);
	};

	const submitAuftrag = async (formValues: any) => {
		const { idInput, bezeichnung, beschreibung, tenantId } = formValues;

		const auftrag: IAuftrag = {
			id: idInput,
			bezeichnung: bezeichnung,
			beschreibung: beschreibung,
			tenantId: tenantId,
			eigenschaften: [{ id: 1, beschreibung: "Beschreibung", datentyp: "Käufer" }],
		};

		await postAuftrag(auftrag);

		const fetchedAufträge = await getAllAufträge();

		setAufträge(fetchedAufträge);

		splitAufträgeByTenant(fetchedAufträge, tenantId);

		setIsModalVisible(false);
	};

	const createNewAufrag = (): React.JSX.Element => {
		if (!isModelVisible) {
			return <div></div>;
		}

		return (
			<div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
				<div className=" bg-blue-800 text-xl">
					<div>
						<form
							onSubmit={handleSubmit(submitAuftrag)}
							className="grid gap-4 grid-cols-12 py-4 px-8 w-[600px]"
						>
							<div className="col-span-6">
								<h3 className="text-gray-400">Id</h3>
								<input
									id="idInput"
									type="number"
									{...register("idInput", { valueAsNumber: true })}
									className="bg-blue-950 p-2"
								/>
								{errors.idInput?.message === undefined ? (
									<React.Fragment></React.Fragment>
								) : (
									<div className="bg-red-900 px-3 py-1 mt-2">{errors.tenantId?.message}</div>
								)}
							</div>
							<div className="col-span-6">
								<div>
									<h3 className="text-gray-400">Bezeichnung</h3>
									<input
										id="bezeichnungInput"
										type="text"
										className="bg-blue-950 p-2"
										{...register("bezeichnung")}
									/>
								</div>
								{errors.beschreibung?.message === undefined ? (
									<React.Fragment></React.Fragment>
								) : (
									<div className="bg-red-900 px-3 py-1 mt-2">{errors.bezeichnung?.message}</div>
								)}
							</div>
							<div className="col-span-6">
								<h3 className="text-gray-400">Beschreibung</h3>
								<input
									id="beschreibungInput"
									type="text"
									className="bg-blue-950 p-2"
									{...register("beschreibung")}
								/>
								{errors.beschreibung?.message === undefined ? (
									<React.Fragment></React.Fragment>
								) : (
									<div className="bg-red-900 px-3 py-1 mt-2">{errors.tenantId?.message}</div>
								)}
							</div>
							<div className="col-span-6">
								<h3 className="text-gray-400">TenantId</h3>
								<input
									id="tenantIdInput"
									type="number"
									className="bg-blue-950 p-2"
									{...register("tenantId", { valueAsNumber: true })}
								/>
								{errors.tenantId?.message === undefined ? (
									<React.Fragment></React.Fragment>
								) : (
									<div className="bg-red-900 px-3 py-1 mt-2">{errors.tenantId?.message}</div>
								)}
							</div>
							<button
								className="col-span-6 bg-red-700 rounded-xl p-2 mt-4"
								onClick={() => {
									setIsModalVisible(false);
									// reset();
									clearErrors();
								}}
							>
								cancel
							</button>
							<button className="col-span-6 bg-green-700 rounded-xl p-2 ml-2 mt-4" type="submit">
								confirm
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	};

	const displayError = (error: string) => {
		if (error === "") {
			return;
		}

		return <div className="absolute bottom-3">{error}</div>;
	};

	return (
		<React.Fragment>
			<div>
				<div className="flex justify-between">
					<div>
						<label className="text-gray-200 text-sm">Tenant Id</label>
						<br></br>
						<select className="bg-blue-900 w-32" onChange={onTenantSelected}>
							{filterUniqueTenants(aufträge).map((tenantId) => {
								return (
									<option key={tenantId} value={tenantId}>
										{tenantId}
									</option>
								);
							})}
						</select>
					</div>
					<button
						name="BtnNeuerAuftrag"
						className="bg-blue-600 p-4 rounded-md"
						onClick={() => setIsModalVisible(!isModelVisible)}
					>
						Neuer Auftrag
					</button>
				</div>

				<div>{displayAufträge()}</div>

				{displayError(error)}

				{createNewAufrag()}
			</div>
		</React.Fragment>
	);
};

export default Dashboard;
