import purchasePage from '../pages/purchasePage'

const { I } = inject()

Given(/^I open the purchase form$/, async () => {
	await purchasePage.openPurchaseForm()
})

When(/^I search for a dollarized fund "([^"]*)"$/, async (fundName: string) => {
	await purchasePage.searchFund(fundName)
})

When(/^I select the fund "([^"]*)"$/, async (fundName: string) => {
	await purchasePage.selectFund(fundName)
})

Then(
	/^I should see the MXN and USD account numbers displayed below the fund$/,
	async () => {
		await purchasePage.validateAccountNumbersAreDisplayed()
	}
)

Then(
	/^the account numbers should be displayed with correct format$/,
	async () => {
		await purchasePage.validateBothAccountsAreDisplayedCorrectly()
	}
)
