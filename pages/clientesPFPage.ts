const { I } = inject()

class ClientesPFPage {
	locators: {
		pantallaClientesPF: string
		listadoContratosPF: string
		contratoCB: string
		rentabilidadUltimoAno: string
		contratoBCO: string
	}

	constructor() {
		this.locators = {
			pantallaClientesPF: '[data-testid="pantalla-clientes-pf"]',
			listadoContratosPF: '[data-testid="listado-contratos-pf"]',
			contratoCB: '[data-testid="contrato-cb"]',
			rentabilidadUltimoAno: '[data-testid="rentabilidad-ultimo-ano"]',
			contratoBCO: '[data-testid="contrato-bco"]',
		}
	}

	async ingresarPantallaClientesPF() {
		I.amOnPage('/clientes-pf')
		I.waitForElement(this.locators.pantallaClientesPF, 10)
	}

	async verListadoContratosPF() {
		I.waitForElement(this.locators.listadoContratosPF, 10)
		I.seeElement(this.locators.listadoContratosPF)
	}

	async seleccionarContratoCB() {
		I.waitForElement(this.locators.contratoCB, 10)
		I.click(this.locators.contratoCB)
	}

	async verRentabilidadUltimoAno() {
		I.waitForElement(this.locators.rentabilidadUltimoAno, 10)
		I.seeElement(this.locators.rentabilidadUltimoAno)
	}

	async seleccionarContratoBCO() {
		I.waitForElement(this.locators.contratoBCO, 10)
		I.click(this.locators.contratoBCO)
	}
}

export = new ClientesPFPage()
