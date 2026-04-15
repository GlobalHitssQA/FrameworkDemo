const { I } = inject()

class FundPurchasePage {
	private purchaseWidgetButton: string

	private fundSearchInput: string

	private fundResultItem: string

	private accountMXNLabel: string

	private accountUSDLabel: string

	private purchaseFormContainer: string

	constructor() {
		// Locators following priority: data-testid > id > CSS semantic > XPath
		this.purchaseWidgetButton = '[data-testid="purchase-widget-button"]'
		this.fundSearchInput = '[data-testid="fund-search-input"]'
		this.fundResultItem = '[data-testid="fund-item"]'
		this.accountMXNLabel = '[data-testid="account-mxn"]'
		this.accountUSDLabel = '[data-testid="account-usd"]'
		this.purchaseFormContainer = '[data-testid="purchase-form"]'
	}

	async openPurchaseWidget() {
		I.waitForElement(this.purchaseWidgetButton, 30)
		I.click(this.purchaseWidgetButton)
		I.waitForElement(this.purchaseFormContainer, 30)
	}

	async searchFund(fundName: string) {
		I.waitForElement(this.fundSearchInput, 30)
		I.fillField(this.fundSearchInput, fundName)
		I.waitForElement(this.fundResultItem, 30)
	}

	async selectFund(fundName: string) {
		const fundSelector = `${this.fundResultItem}:has-text("${fundName}")`
		I.waitForElement(fundSelector, 30)
		I.click(fundSelector)
	}

	async verifyPurchaseFormIsDisplayed() {
		I.seeElement(this.purchaseFormContainer)
	}

	async getMXNAccountNumber(): Promise<string> {
		I.waitForElement(this.accountMXNLabel, 30)
		return I.grabTextFrom(this.accountMXNLabel)
	}

	async getUSDAccountNumber(): Promise<string> {
		I.waitForElement(this.accountUSDLabel, 30)
		return I.grabTextFrom(this.accountUSDLabel)
	}

	async verifyAccountNumbersAreDisplayed() {
		I.seeElement(this.accountMXNLabel)
		I.seeElement(this.accountUSDLabel)
	}

	async verifyAccountNumberFormat(accountNumber: string, currency: string) {
		// Verify account number is not empty and contains currency indicator
		if (!accountNumber || accountNumber.trim() === '') {
			throw new Error(
				`${currency} account number is empty or not displayed`
			)
		}
		// Verify the account number contains the currency type
		if (!accountNumber.includes(currency)) {
			throw new Error(
				`${currency} account number does not contain currency indicator. Got: ${accountNumber}`
			)
		}
	}
}

export = new FundPurchasePage()
