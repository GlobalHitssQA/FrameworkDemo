const { I } = inject()

class PurchasePage {
	// Locators for purchase form and fund search
	private purchaseFormContainer: string

	private fundSearchInput: string

	private fundResultItem: string

	private mxnAccountNumber: string

	private usdAccountNumber: string

	private mxnAccountLabel: string

	private usdAccountLabel: string

	private purchasePuppetButton: string

	constructor() {
		// Initialize locators with best practice priority: data-testid > id > CSS semantic
		this.purchaseFormContainer = '[data-testid="purchase-form"]'
		this.fundSearchInput = '[data-testid="fund-search-input"]'
		this.fundResultItem = '[data-testid="fund-result-item"]'
		this.mxnAccountNumber = '[data-testid="mxn-account-number"]'
		this.usdAccountNumber = '[data-testid="usd-account-number"]'
		this.mxnAccountLabel = 'text=MXN'
		this.usdAccountLabel = 'text=USD'
		this.purchasePuppetButton = '[data-testid="purchase-puppet-button"]'
	}

	async openPurchaseForm() {
		await I.waitForElement(this.purchasePuppetButton, 30)
		I.click(this.purchasePuppetButton)
		await I.waitForElement(this.purchaseFormContainer, 30)
	}

	async searchFund(fundName: string) {
		await I.waitForElement(this.fundSearchInput, 30)
		I.fillField(this.fundSearchInput, fundName)
		I.wait(1) // Wait for search results to load
	}

	async selectFund(fundName: string) {
		const fundSelector = `${this.fundResultItem}:has-text("${fundName}")`
		await I.waitForElement(fundSelector, 30)
		I.click(fundSelector)
	}

	async validateAccountNumbersAreDisplayed() {
		await I.waitForElement(this.mxnAccountNumber, 30)
		await I.waitForElement(this.usdAccountNumber, 30)
		I.seeElement(this.mxnAccountNumber)
		I.seeElement(this.usdAccountNumber)
	}

	async validateMXNAccountLabel() {
		I.see('MXN')
	}

	async validateUSDAccountLabel() {
		I.see('USD')
	}

	async getMXNAccountNumber(): Promise<string> {
		return await I.grabTextFrom(this.mxnAccountNumber)
	}

	async getUSDAccountNumber(): Promise<string> {
		return await I.grabTextFrom(this.usdAccountNumber)
	}

	async validateAccountNumberFormat(accountNumber: string) {
		// Validate that account number is not empty and has valid format
		const accountPattern = /^\d+$/
		if (!accountNumber || accountNumber.trim() === '') {
			throw new Error('Account number is empty')
		}
		if (!accountPattern.test(accountNumber.trim())) {
			throw new Error(
				`Account number has invalid format: ${accountNumber}`
			)
		}
	}

	async validateBothAccountsAreDisplayedCorrectly() {
		// Get account numbers
		const mxnAccount = await this.getMXNAccountNumber()
		const usdAccount = await this.getUSDAccountNumber()

		// Validate formats
		await this.validateAccountNumberFormat(mxnAccount)
		await this.validateAccountNumberFormat(usdAccount)

		// Validate labels
		await this.validateMXNAccountLabel()
		await this.validateUSDAccountLabel()

		// Log for verification
		console.log(`MXN Account Number: ${mxnAccount}`)
		console.log(`USD Account Number: ${usdAccount}`)
	}
}

export = new PurchasePage()
