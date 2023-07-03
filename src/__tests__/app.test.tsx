import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "fetch-mock";
import React from "react";
import IAuftrag from "../interface/auftrag";
import IEigenschaft from "../interface/eigenschaft";
import Dashboard from "../page/dashboard";

describe("App", () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	it("Should load all Orders", async () => {
		const eigenschaft: IEigenschaft = {
			id: 1,
			beschreibung: "Test EigenschaftBeschreibung",
			datentyp: "Konsument",
		};

		const auftrag: IAuftrag = {
			id: 10,
			bezeichnung: "Test Bezeichnung",
			beschreibung: "Test Beschreibung",
			eigenschaften: [eigenschaft],
		};

		fetchMock.get(`${process.env.HOST_URL}/api/auftrag`, [auftrag]);

		render(<Dashboard />);

		await waitFor(async () => {
			// screen.debug();

			const button = screen.getByText("Neuer Auftrag");

			const renderedAuftrag = screen.findByText("Test Beschreibung");

			expect(button).toBeTruthy();
			expect(renderedAuftrag).toBeTruthy();
		});
	});
});
