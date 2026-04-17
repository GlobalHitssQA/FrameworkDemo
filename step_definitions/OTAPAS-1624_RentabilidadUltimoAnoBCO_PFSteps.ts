import clientesPFPage from '../pages/clientesPFPage'

When(/^el usuario selecciona un contrato de BCO de PF$/, async () => {
	await clientesPFPage.seleccionarContratoBCO()
})
