import path from 'path'

const { I } = inject()

class PitchbookPage {
	locators: {
		// Pantalla de Pitchbook
		pitchbookScreen: string
		pitchbookTitle: string
		// Búsqueda de cliente
		searchClientInput: string
		searchButton: string
		clientResultsPM: string
		selectClientPM: string
		clientResultsPF: string
		selectClientPF: string
		// Generación de Pitchbook
		portfolioContractCB: string
		portfolioContractBCO: string
		generatePitchbookButton: string
		pitchbookGeneratedMessage: string
		// PDF
		pdfPath: string
		downloadPDFButton: string
		folderDownloads: string
		fileName: string
		// Validación de rentabilidad
		rentabilidadUltimoAnioLabel: string
	}

	constructor() {
		this.locators = {
			// Pantalla de Pitchbook
			pitchbookScreen: '[data-testid="pitchbook-screen"]',
			pitchbookTitle: '[data-testid="pitchbook-title"]',
			// Búsqueda de cliente
			searchClientInput: '[data-testid="search-client-input"]',
			searchButton: '[data-testid="search-button"]',
			clientResultsPM: '[data-testid="client-results-pm"]',
			selectClientPM: '[data-testid="select-client-pm"]',
			clientResultsPF: '[data-testid="client-results-pf"]',
			selectClientPF: '[data-testid="select-client-pf"]',
			// Generación de Pitchbook
			portfolioContractCB: '[data-testid="portfolio-contract-cb"]',
			portfolioContractBCO: '[data-testid="portfolio-contract-bco"]',
			generatePitchbookButton: '[data-testid="generate-pitchbook-button"]',
			pitchbookGeneratedMessage: '[data-testid="pitchbook-generated-message"]',
			// PDF
			pdfPath: path.resolve(__dirname, '..', 'output', 'pitchbook_cb.pdf'),
			downloadPDFButton: '[data-testid="download-pitchbook-pdf"]',
			folderDownloads: 'output',
			fileName: 'pitchbook_cb.pdf',
			// Validación de rentabilidad
			rentabilidadUltimoAnioLabel: '[data-testid="rentabilidad-ultimo-anio"]',
		}
	}

	async navegarAPantallaPitchbook() {
		I.amOnPage('/pitchbook')
		I.waitForElement(this.locators.pitchbookScreen, 30)
	}

	async verificarPantallaPitchbookVisible() {
		I.seeElement(this.locators.pitchbookScreen)
		I.seeElement(this.locators.pitchbookTitle)
	}

	async buscarClientePM(clientePM: string) {
		I.fillField(this.locators.searchClientInput, clientePM)
		I.click(this.locators.searchButton)
		I.waitForElement(this.locators.clientResultsPM, 30)
	}

	async verificarResultadosPM() {
		I.seeElement(this.locators.clientResultsPM)
	}

	async seleccionarClientePM() {
		I.click(this.locators.selectClientPM)
	}

	async buscarClientePF(clientePF: string) {
		I.fillField(this.locators.searchClientInput, clientePF)
		I.click(this.locators.searchButton)
		I.waitForElement(this.locators.clientResultsPF, 30)
	}

	async verificarResultadosPF() {
		I.seeElement(this.locators.clientResultsPF)
	}

	async seleccionarClientePF() {
		I.click(this.locators.selectClientPF)
	}

	async seleccionarPortafolioContratoCB() {
		I.waitForElement(this.locators.portfolioContractCB, 30)
		I.click(this.locators.portfolioContractCB)
	}

	async seleccionarPortafolioContratoBCO() {
		I.waitForElement(this.locators.portfolioContractBCO, 30)
		I.click(this.locators.portfolioContractBCO)
	}

	async generarPitchbook() {
		I.click(this.locators.generatePitchbookButton)
		I.waitForElement(this.locators.pitchbookGeneratedMessage, 60)
	}

	async descargarPDFPitchbook() {
		await I.downloadFile({
			pdfPath: this.locators.pdfPath,
			downloadPath: this.locators.folderDownloads,
			fileName: this.locators.fileName,
			downloadPDFButton: this.locators.downloadPDFButton,
		})
	}

	async verificarRentabilidadUltimoAnioEnPDF() {
		const pdfContent = await I.readPdf(this.locators.pdfPath)
		const expectedContent = ['Rentabilidad en el último año', 'Rentabilidad último año']
		let found = false
		for (const text of expectedContent) {
			if (pdfContent.includes(text)) {
				found = true
				break
			}
		}
		if (!found) {
			throw new Error(
				'PDF validation failed: El dato "Rentabilidad último año" no fue encontrado en el PDF de Pitchbook'
			)
		}
	}
}

export = new PitchbookPage()
