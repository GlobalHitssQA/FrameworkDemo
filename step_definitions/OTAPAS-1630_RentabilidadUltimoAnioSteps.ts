import clientesPMPage from '../pages/clientesPMPage'

const { I } = inject()

Given(/^el usuario ingresa a la pantalla de clientes de PM$/, async () => {
	await clientesPMPage.ingresarPantallaClientesPM()
})

Then(/^se muestra el listado de contratos de la PM$/, async () => {
	await clientesPMPage.verificarListadoContratos()
})

When(/^el usuario selecciona un contrato de CB$/, async () => {
	await clientesPMPage.seleccionarContratoCB()
})

Then(/^se muestra el dato de Rentabilidad del último año en la pantalla$/, async () => {
	await clientesPMPage.verificarRentabilidadUltimoAnio()
})

When(/^el usuario selecciona un contrato de BCO$/, async () => {
	await clientesPMPage.seleccionarContratoBCO()
})
