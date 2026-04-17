import pitchbookPage from '../pages/pitchbookPage'

const { I } = inject()

Given(/^ingreso a la pantalla de Pitchbook$/, async () => {
	await pitchbookPage.navigateToPitchbookScreen()
})

When(/^busco un cliente PF$/, async () => {
	await pitchbookPage.searchClientPF('Cliente PF Test')
})

When(/^genero pitchbook con portafolio de contrato BCO$/, async () => {
	await pitchbookPage.selectContractBCO()
	await pitchbookPage.generatePitchbook()
	await pitchbookPage.downloadPitchbookPDF()
})

Then(/^se genera el dato "([^"]*)" en el pdf de pitchbook de contrato BCO$/, async (expectedText: string) => {
	await pitchbookPage.validateRentabilidadUltimoAnioInPDF()
})
