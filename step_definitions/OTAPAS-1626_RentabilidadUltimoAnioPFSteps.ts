import clientesPFPage from '../pages/clientesPFPage'

const { I } = inject()

Given(/^el usuario ingresa a la pantalla de clientes de PF$/, async () => {
	await clientesPFPage.ingresarPantallaClientesPF()
})

Then(/^se muestra el listado de contratos de la PF$/, async () => {
	await clientesPFPage.verificarListadoContratos()
})

When(/^el usuario selecciona un contrato de CB de PF$/, async () => {
	await clientesPFPage.seleccionarContratoCB()
})

Then(/^se muestra el dato de Rentabilidad del último año en la pantalla de PF$/, async () => {
	await clientesPFPage.verificarRentabilidadUltimoAnio()
})
