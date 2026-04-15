import fundPurchasePage from '../pages/fundPurchasePage'

const { I } = inject()

Given(/^I open the purchase widget$/, async () => {
	await fundPurchasePage.openPurchaseWidget()
})

Given(/^I verify the purchase form is displayed$/, async () => {
	await fundPurchasePage.verifyPurchaseFormIsDisplayed()
})

When(/^I search for a fund "([^"]*)"$/, async (fundName: string) => {
	await fundPurchasePage.searchFund(fundName)
})

When(/^I select the fund "([^"]*)"$/, async (fundName: string) => {
	await fundPurchasePage.selectFund(fundName)
})

Then(/^I should see the MXN and USD account numbers displayed$/, async () => {
	await fundPurchasePage.verifyAccountNumbersAreDisplayed()
})

Then(
	/^I should see the account number for MXN and USD with correct format$/,
	async () => {
		const mxnAccount = await fundPurchasePage.getMXNAccountNumber()
		const usdAccount = await fundPurchasePage.getUSDAccountNumber()

		await fundPurchasePage.verifyAccountNumberFormat(mxnAccount, 'MXN')
		await fundPurchasePage.verifyAccountNumberFormat(usdAccount, 'USD')
	}
)
