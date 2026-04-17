import path from 'path'

const { I } = inject()

class PitchbookPage {
	locators: {
		// Pantalla Pitchbook
		pitchbookScreen: string
		pitchbookTitle: string
		// Búsqueda de cliente
		searchClientInput: string
		searchButton: string
		clientResultsPM: string
		clientResultsPF: string
		// Generación de Pitchbook
		contractCBSelector: string
		contractBCOSelector: string
		generatePitchbookButton: string
		// PDF Pitchbook
		pdfDownloadButton: string
		rentabilidadUltimoAnioLabel: string
		// Paths
		pdfPath: string
		folderDownloads: string
		fileName: string
	}

	constructor() {
		this.locators = {
			// Pantalla Pitchbook
			pitchbookScreen: '[data-testid="pitchbook-screen"]',
			pitchbookTitle: '[data-testid="pitchbook-title"]',
			// Búsqueda de cliente
			searchClientInput: '[data-testid="search-client-input"]',
			searchButton: '[data-testid="search-button"]',
			clientResultsPM: '[data-testid="client-results-pm"]',
			clientResultsPF: '[data-testid="client-results-pf"]',
			// Generación de Pitchbook
			contractCBSelector: '[data-testid="contract-cb-selector"]',
			contractBCOSelector: '[data-testid="contract-bco-selector"]',
			generatePitchbookButton: '[data-testid="generate-pitchbook-button"]',
			// PDF Pitchbook
			pdfDownloadButton: '[data-testid="pdf-download-button"]',
			rentabilidadUltimoAnioLabel: '[data-testid="rentabilidad-ultimo-anio"]',
			// Paths
			pdfPath: path.resolve(
				__dirname,
				'..',
				'output',
				'pitchbook_cb.pdf'
			),
			folderDownloads: 'output',
			fileName: 'pitchbook_cb.pdf',
		}
	}

	async navigateToPitchbookScreen() {
		I.amOnPage('/pitchbook')
		I.waitForElement(this.locators.pitchbookScreen, 30)
		I.seeElement(this.locators.pitchbookTitle)
	}

	async searchClientPM(clientName: string) {
		I.fillField(this.locators.searchClientInput, clientName)
		I.click(this.locators.searchButton)
		I.waitForElement(this.locators.clientResultsPM, 30)
	}

	async searchClientPF(clientName: string) {
		I.fillField(this.locators.searchClientInput, clientName)
		I.click(this.locators.searchButton)
		I.waitForElement(this.locators.clientResultsPF, 30)
	}

	async selectContractCB() {
		I.click(this.locators.contractCBSelector)
	}

	async selectContractBCO() {
		I.click(this.locators.contractBCOSelector)
	}

	async generatePitchbook() {
		I.click(this.locators.generatePitchbookButton)
		I.waitForElement(this.locators.pdfDownloadButton, 60)
	}

	async downloadPitchbookPDF() {
		await I.downloadFile({
			pdfPath: this.locators.pdfPath,
			downloadPath: this.locators.folderDownloads,
			fileName: this.locators.fileName,
			downloadPDFButton: this.locators.pdfDownloadButton,
		})
	}

	async validateRentabilidadUltimoAnioInPDF() {
		const pdfContent = await I.readPdf(this.locators.pdfPath)
		const expectedText = 'Rentabilidad en el último año'

		if (!pdfContent.includes(expectedText)) {
			throw new Error(
				`PDF validation failed: Expected text "${expectedText}" not found in Pitchbook PDF`
			)
		}
	}
}

export = new PitchbookPage()
