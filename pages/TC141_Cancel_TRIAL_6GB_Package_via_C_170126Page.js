class CancelProductPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://lifecycle-gm.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.userSessionIndicator = '[data-testid="user-session-active"]';
    
    // Line and Package locators
    this.lineSearchInput = '[data-testid="line-search-input"]';
    this.searchButton = '[data-testid="search-button"]';
    this.lineStatusBadge = '[data-testid="line-status-badge"]';
    this.planTypeLabel = '[data-testid="plan-type-sold"]';
    this.packageTrial6gbBadge = '[data-testid="package-trial-6gb"]';
    this.packageStatusIndicator = '[data-testid="package-status-indicator"]';
    
    // API Section locators
    this.apiEndpointSection = '[data-testid="api-cancel-product-section"]';
    this.apiStatusIndicator = '[data-testid="api-status-indicator"]';
    this.invokeCancelApiButton = '[data-testid="invoke-cancel-product-api"]';
    this.apiResponseContainer = '[data-testid="api-response-container"]';
    this.apiResponseCode = '[data-testid="api-response-code"]';
    
    // BSCS7 locators
    this.bscs7NavigationLink = '[data-testid="nav-bscs7"]';
    this.bscs7PackageTable = '[data-testid="bscs7-package-table"]';
    this.bscs7PackageStatusCell = '[data-testid="bscs7-package-status"]';
    this.bscs7PackageActiveIndicator = '[data-testid="bscs7-package-active"]';
    
    // SIAC Unico locators
    this.siacUnicoNavigationLink = '[data-testid="nav-siac-unico"]';
    this.siacTransactionTable = '[data-testid="siac-transaction-table"]';
    this.siacTransactionDateCell = '[data-testid="siac-transaction-date"]';
    this.siacTransactionTimeCell = '[data-testid="siac-transaction-time"]';
    this.siacTransactionUserCell = '[data-testid="siac-transaction-user"]';
    this.siacPackageTypeCell = '[data-testid="siac-package-type"]';
  }

  async navigateToSystem() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.userSessionIndicator, { state: 'visible' });
  }

  async verifyActiveLineWithPackage() {
    await this.page.waitForSelector(this.lineStatusBadge, { state: 'visible' });
    const lineStatus = await this.page.textContent(this.lineStatusBadge);
    const planType = await this.page.textContent(this.planTypeLabel);
    const hasPackage = await this.page.isVisible(this.packageTrial6gbBadge);
    return lineStatus === 'active' && planType === 'SOLD' && hasPackage;
  }

  async checkCancelProductApiAvailability() {
    await this.page.click(this.apiEndpointSection);
    await this.page.waitForSelector(this.apiStatusIndicator, { state: 'visible' });
    const status = await this.page.textContent(this.apiStatusIndicator);
    return status === 'available' || status === 'online';
  }

  async invokeCancelProductApi() {
    await this.page.click(this.invokeCancelApiButton);
    await this.page.waitForSelector(this.apiResponseContainer, { state: 'visible' });
    const responseCode = await this.page.textContent(this.apiResponseCode);
    const responseBody = await this.page.textContent(this.apiResponseContainer);
    return { code: responseCode, body: responseBody };
  }

  async verifyApiSuccessResponse(response) {
    const successCodes = ['200', '201', '204'];
    return successCodes.includes(response.code);
  }

  async navigateToBSCS7() {
    await this.page.click(this.bscs7NavigationLink);
    await this.page.waitForSelector(this.bscs7PackageTable, { state: 'visible' });
  }

  async getPackageStatusInBSCS7() {
    await this.page.waitForSelector(this.bscs7PackageStatusCell, { state: 'visible' });
    const status = await this.page.textContent(this.bscs7PackageStatusCell);
    return status.toLowerCase().trim();
  }

  async isPackageActiveForLine() {
    const isVisible = await this.page.isVisible(this.bscs7PackageActiveIndicator);
    if (!isVisible) return false;
    const activeStatus = await this.page.textContent(this.bscs7PackageActiveIndicator);
    return activeStatus.toLowerCase() === 'active';
  }

  async navigateToSIACUnico() {
    await this.page.click(this.siacUnicoNavigationLink);
    await this.page.waitForSelector(this.siacTransactionTable, { state: 'visible' });
  }

  async getCancellationTransactionDetails() {
    await this.page.waitForSelector(this.siacTransactionDateCell, { state: 'visible' });
    const date = await this.page.textContent(this.siacTransactionDateCell);
    const time = await this.page.textContent(this.siacTransactionTimeCell);
    const user = await this.page.textContent(this.siacTransactionUserCell);
    return { date: date.trim(), time: time.trim(), user: user.trim() };
  }
}

module.exports = CancelProductPage;