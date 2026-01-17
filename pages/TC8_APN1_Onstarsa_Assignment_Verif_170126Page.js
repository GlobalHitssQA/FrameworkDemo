class InstantLinkPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.INSTANT_LINK_URL || 'https://instantlink.example.com';
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    this.ratePlanDropdown = '[data-testid="rate-plan-dropdown"]';
    this.ratePlanOption = (plan) => `[data-testid="rate-plan-option-${plan.toLowerCase().replace(/\s+/g, '-')}"]`;
    this.provisionLineButton = '[data-testid="provision-line-button"]';
    this.lineNumberInput = '[data-testid="line-number-input"]';
    this.confirmProvisionButton = '[data-testid="confirm-provision-button"]';
    this.apnAssignedField = '[data-testid="apn-assigned-value"]';
    this.apnModeField = '[data-testid="apn-mode-value"]';
    this.apnClassificationField = '[data-testid="apn-classification-value"]';
    this.apnUsageField = '[data-testid="apn-usage-value"]';
    this.apnStatusField = '[data-testid="apn-status-value"]';
    this.inPoolConfigField = '[data-testid="in-pool-configuration-value"]';
    this.ratePlansTable = '[data-testid="rate-plans-table"]';
    this.apnConfigurationSection = '[data-testid="apn-configuration-section"]';
    this.queryPermissionsIndicator = '[data-testid="query-permissions-indicator"]';
    this.provisioningSection = '[data-testid="provisioning-section"]';
    this.lineDetailsSection = '[data-testid="line-details-section"]';
    this.successMessage = '[data-testid="success-message"]';
    this.errorMessage = '[data-testid="error-message"]';
  }

  async navigateToInstantLink() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyQueryPermissions() {
    await this.page.waitForSelector(this.queryPermissionsIndicator);
    const hasPermissions = await this.page.isVisible(this.queryPermissionsIndicator);
    if (!hasPermissions) {
      throw new Error('User does not have query permissions');
    }
  }

  async verifyRatePlansExist() {
    await this.page.waitForSelector(this.ratePlansTable);
    const ratePlans = ['TESTING', 'MANUFACTURE', 'UNSOLD NOT IN SHOWROOM', 'UNSOLD SHOWROOM', 'SOLD', 'DORMANT', 'PURGED'];
    for (const plan of ratePlans) {
      const planSelector = this.ratePlanOption(plan);
      await this.page.click(this.ratePlanDropdown);
      const planExists = await this.page.isVisible(planSelector);
      await this.page.keyboard.press('Escape');
      if (!planExists) {
        throw new Error(`Rate Plan ${plan} does not exist`);
      }
    }
  }

  async verifyApnConfiguration() {
    await this.page.waitForSelector(this.apnConfigurationSection);
    const apnConfigured = await this.page.isVisible(this.apnConfigurationSection);
    if (!apnConfigured) {
      throw new Error('APN1 Onstarsa is not configured in the network');
    }
  }

  async provisionLine(ratePlan) {
    await this.page.waitForSelector(this.provisioningSection);
    await this.page.click(this.ratePlanDropdown);
    await this.page.click(this.ratePlanOption(ratePlan));
    await this.page.click(this.provisionLineButton);
    await this.page.waitForSelector(this.lineNumberInput);
    const lineNumber = this.generateLineNumber();
    await this.page.fill(this.lineNumberInput, lineNumber);
    await this.page.click(this.confirmProvisionButton);
    await this.page.waitForSelector(this.lineDetailsSection);
  }

  generateLineNumber() {
    return `LINE${Date.now()}`;
  }

  async getAssignedApn() {
    await this.page.waitForSelector(this.lineDetailsSection);
    const apnElement = await this.page.$(this.apnAssignedField);
    if (!apnElement) {
      return null;
    }
    const apnText = await this.page.textContent(this.apnAssignedField);
    if (apnText === 'N/A' || apnText === 'None' || apnText === '') {
      return null;
    }
    return apnText.trim();
  }

  async getApnMode() {
    await this.page.waitForSelector(this.apnModeField);
    const modeText = await this.page.textContent(this.apnModeField);
    return modeText.trim().toLowerCase();
  }

  async getApnClassification() {
    await this.page.waitForSelector(this.apnClassificationField);
    const classificationText = await this.page.textContent(this.apnClassificationField);
    return classificationText.trim().toLowerCase();
  }

  async getApnUsage() {
    await this.page.waitForSelector(this.apnUsageField);
    const usageText = await this.page.textContent(this.apnUsageField);
    return usageText.trim().toLowerCase();
  }

  async getApnStatus() {
    await this.page.waitForSelector(this.apnStatusField);
    const statusText = await this.page.textContent(this.apnStatusField);
    return statusText.trim().toLowerCase();
  }

  async getInPoolConfiguration() {
    await this.page.waitForSelector(this.inPoolConfigField);
    const configText = await this.page.textContent(this.inPoolConfigField);
    return configText.trim().toLowerCase();
  }
}

module.exports = InstantLinkPage;