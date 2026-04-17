import clientesPMPage from '../pages/clientesPMPage'

When(/^el usuario selecciona un contrato de BCO$/, async () => {
	await clientesPMPage.seleccionarContratoBCO()
})
