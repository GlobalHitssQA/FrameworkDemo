class InPoolBillingPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    
    // Lines configuration locators
    this.linesTable = '[data-testid="lines-table"]';
    this.lineRowSelector = '[data-testid="line-row"]';
    this.planTypeColumn = '[data-testid="plan-type-column"]';
    this.inPoolPackageSelect = '[data-testid="in-pool-package-select"]';
    this.sharedPoolCapacityDisplay = '[data-testid="shared-pool-capacity"]';
    
    // Telemetry consumption locators
    this.consumptionRegisterSection = '[data-testid="consumption-register-section"]';
    this.apnSelector = '[data-testid="apn-selector"]';
    this.consumptionAmountInput = '[data-testid="consumption-amount-input"]';
    this.registerConsumptionButton = '[data-testid="register-consumption-button"]';
    
    // Shell execution locators
    this.shellExecutionSection = '[data-testid="shell-execution-section"]';
    this.executeShellButton = '[data-testid="execute-in-pool-shell-button"]';
    this.shellResultDisplay = '[data-testid="shell-result-display"]';
    this.excessIndicator = '[data-testid="excess-indicator"]';
    
    // OCC and billing locators
    this.occSection = '[data-testid="occ-section"]';
    this.occInPoolServiceRow = '[data-testid="occ-in-pool-service-row"]';
    this.occAmountColumn = '[data-testid="occ-amount-column"]';
    
    // Invoice locators
    this.invoiceSection = '[data-testid="invoice-section"]';
    this.inPoolServicesSection = '[data-testid="in-pool-services-section"]';
    this.inPoolServicesAmount = '[data-testid="in-pool-services-amount"]';
    this.inPoolServicesAmountWithIGV = '[data-testid="in-pool-services-amount-igv"]';
    this.invoiceNavigationLink = '[data-testid="invoice-navigation-link"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
    this.planFieldInTrafficDetail = '[data-testid="plan-field-traffic-detail"]';
  }

  async navigateToSystem() {
    await this.page.goto(process.env.BASE_URL || 'https://lifecycle-gm.example.com');
  }

  async login() {
    await this.page.fill(this.usernameInput, process.env.TEST_USERNAME || 'test_user');
    await this.page.fill(this.passwordInput, process.env.TEST_PASSWORD || 'test_password');
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveLinesWithSOLDPlan(numberOfLines) {
    await this.page.waitForSelector(this.linesTable);
    const lines = await this.page.locator(`${this.lineRowSelector}:has(${this.planTypeColumn}:text("SOLD"))`);
    const count = await lines.count();
    if (count < numberOfLines) {
      throw new Error(`Expected ${numberOfLines} lines with SOLD plan, found ${count}`);
    }
  }

  async configureInPoolPackageForLines(numberOfLines, mbPerLine) {
    for (let i = 0; i < numberOfLines; i++) {
      const lineRow = this.page.locator(this.lineRowSelector).nth(i);
      await lineRow.locator(this.inPoolPackageSelect).selectOption({ label: `${mbPerLine}MB In Pool` });
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifySharedPoolCapacity(expectedCapacityMB) {
    const capacityText = await this.page.textContent(this.sharedPoolCapacityDisplay);
    const capacity = parseInt(capacityText.replace(/[^0-9]/g, ''));
    if (capacity !== expectedCapacityMB) {
      throw new Error(`Expected shared pool capacity of ${expectedCapacityMB}MB, found ${capacity}MB`);
    }
  }

  async registerTelemetryConsumption(totalMB, apnList) {
    await this.page.waitForSelector(this.consumptionRegisterSection);
    for (const apn of apnList) {
      await this.page.click(this.apnSelector);
      await this.page.selectOption(this.apnSelector, { label: apn });
    }
    await this.page.fill(this.consumptionAmountInput, totalMB.toString());
    await this.page.click(this.registerConsumptionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async executeInPoolCalculationShell() {
    await this.page.waitForSelector(this.shellExecutionSection);
    await this.page.click(this.executeShellButton);
    await this.page.waitForSelector(this.shellResultDisplay);
  }

  async verifyNoExcessConsumption() {
    const excessIndicator = await this.page.locator(this.excessIndicator);
    const hasExcess = await excessIndicator.textContent();
    if (hasExcess && hasExcess.toLowerCase().includes('excedente')) {
      throw new Error('Unexpected excess consumption detected');
    }
  }

  async getOCCInPoolServiceAmount() {
    await this.page.waitForSelector(this.occSection);
    const amountText = await this.page.locator(this.occInPoolServiceRow).locator(this.occAmountColumn).textContent();
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }

  async navigateToInvoice() {
    await this.page.click(this.invoiceNavigationLink);
    await this.page.waitForSelector(this.invoiceSection);
  }

  async getInPoolServicesAmountFromInvoice() {
    await this.page.waitForSelector(this.inPoolServicesSection);
    const amountText = await this.page.textContent(this.inPoolServicesAmount);
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }

  async getInPoolServicesAmountWithIGV() {
    const amountText = await this.page.textContent(this.inPoolServicesAmountWithIGV);
    return parseFloat(amountText.replace(/[^0-9.]/g, ''));
  }
}

module.exports = InPoolBillingPage;