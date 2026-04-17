const { I } = inject()

class ClientesPFPage {
	locators: {
		pantallaClientesPF: string
		listadoContratos: string
		contratoCB: string
		rentabilidadUltimoAnio: string
		contratoBCO: string
		rentabilidadUltimoAnioBCO: string
	}

	constructor() {
		this.locators = {
			pantallaClientesPF: '[data-testid="pantalla-clientes-pf"]',
			listadoContratos: '[data-testid="listado-contratos-pf"]',
			contratoCB: '[data-testid="contrato-cb-pf"]',
			rentabilidadUltimoAnio: '[data-testid="rentabilidad-ultimo-anio-pf"]',
			contratoBCO: '[data-testid="contrato-bco-pf"]',
			rentabilidadUltimoAnioBCO: '[data-testid="rentabilidad-ultimo-anio-bco-pf"]',
		}
	}

	async ingresarPantallaClientesPF() {
		I.amOnPage('/clientes-pf')
		I.waitForElement(this.locators.pantallaClientesPF, 10)
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

	async verificarRentabilidadUltimoAnioBCO() {
		I.waitForElement(this.locators.rentabilidadUltimoAnioBCO, 10)
		I.seeElement(this.locators.rentabilidadUltimoAnioBCO)
	}
}

export = new ClientesPFPage()
