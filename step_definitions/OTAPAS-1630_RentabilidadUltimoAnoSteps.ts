import clientesPMPage from '../pages/clientesPMPage'

Given(/^el usuario ingresa a la pantalla de clientes de PM$/, async () => {
	await clientesPMPage.ingresarPantallaClientesPM()
})

Then(/^se muestra el listado de contratos de la PM$/, async () => {
	await clientesPMPage.verListadoContratosPM()
})

When(/^el usuario selecciona un contrato de CB$/, async () => {
	await clientesPMPage.seleccionarContratoCB()
})

Then(/^se muestra el dato de Rentabilidad del ultimo ano en la pantalla$/, async () => {
	await clientesPMPage.verRentabilidadUltimoAno()
})
