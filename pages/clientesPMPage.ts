const { I } = inject()

class ClientesPMPage {
	locators: {
		pantallaClientesPM: string
		listadoContratosPM: string
		contratoCB: string
		rentabilidadUltimoAno: string
		contratoBCO: string
	}

	constructor() {
		this.locators = {
			pantallaClientesPM: '[data-testid="pantalla-clientes-pm"]',
			listadoContratosPM: '[data-testid="listado-contratos-pm"]',
			contratoCB: '[data-testid="contrato-cb"]',
			rentabilidadUltimoAno: '[data-testid="rentabilidad-ultimo-ano"]',
			contratoBCO: '[data-testid="contrato-bco"]',
		}
	}

	async ingresarPantallaClientesPM() {
		I.amOnPage('/clientes-pm')
		I.waitForElement(this.locators.pantallaClientesPM, 10)
	}

	async verListadoContratosPM() {
		I.waitForElement(this.locators.listadoContratosPM, 10)
		I.seeElement(this.locators.listadoContratosPM)
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

export = new ClientesPMPage()
