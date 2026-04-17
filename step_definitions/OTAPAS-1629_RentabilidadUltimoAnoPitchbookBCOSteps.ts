import pitchbookPage from '../pages/pitchbookPage'

const { I } = inject()

Given(/^el usuario ingresa a la pantalla de Pitchbook$/, async () => {
	await pitchbookPage.navigateToPitchbookScreen()
})

Then(/^se muestra la pantalla de generacion de Pitchbook$/, async () => {
	I.seeElement(pitchbookPage.locators.pitchbookScreen)
})

When(/^el usuario busca un cliente PM$/, async () => {
	await pitchbookPage.searchClientPM('Cliente PM')
})

Then(/^se muestran resultados de PM$/, async () => {
	I.seeElement(pitchbookPage.locators.clientResultsPM)
})

When(/^el usuario genera pitchbook con portafolio de contrato BCO$/, async () => {
	await pitchbookPage.selectContractBCO()
	await pitchbookPage.generatePitchbook()
	await pitchbookPage.downloadPitchbookPDF()
})

Then(/^se genera el dato "Rentabilidad en el último año" en el pdf de pitchbook de contrato BCO$/, async () => {
	await pitchbookPage.validateRentabilidadUltimoAnioInPDF()
})
