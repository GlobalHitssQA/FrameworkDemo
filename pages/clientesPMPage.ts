const { I } = inject()

class ClientesPMPage {
	locators: {
		pantallaClientesPM: string
		listadoContratos: string
		contratoCB: string
		contratoBCO: string
		rentabilidadUltimoAnio: string
	}

	constructor() {
		this.locators = {
			pantallaClientesPM: '[data-testid="pantalla-clientes-pm"]',
			listadoContratos: '[data-testid="listado-contratos"]',
			contratoCB: '[data-testid="contrato-cb"]',
			contratoBCO: '[data-testid="contrato-bco"]',
			rentabilidadUltimoAnio: '[data-testid="rentabilidad-ultimo-anio"]',
		}
	}

	async ingresarPantallaClientesPM() {
		I.amOnPage('/clientes-pm')
		I.waitForElement(this.locators.pantallaClientesPM, 10)
	}

	async verificarListadoContratos() {
		I.waitForElement(this.locators.listadoContratos, 10)
		I.seeElement(this.locators.listadoContratos)
	}

	async seleccionarContratoCB() {
		I.waitForElement(this.locators.contratoCB, 10)
		I.click(this.locators.contratoCB)
	}

	async verificarRentabilidadUltimoAnio() {
		I.waitForElement(this.locators.rentabilidadUltimoAnio, 10)
		I.seeElement(this.locators.rentabilidadUltimoAnio)
	}

	async seleccionarContratoBCO() {
		I.waitForElement(this.locators.contratoBCO, 10)
		I.click(this.locators.contratoBCO)
	}
}

export = new ClientesPMPage()
