class TotalValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractOption = '[data-testid="contract-option"]';
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueTooltip = '[data-testid="total-value-tooltip"]';
    this.tooltipText = '[data-testid="tooltip-text"]';
    this.mainContent = '[data-testid="main-content"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    await this.page.click(this.contractSelector);
    await this.page.click(this.contractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalValueComponentVisible() {
    return await this.page.isVisible(this.totalValueComponent);
  }

  async hoverOverTotalValueComponent() {
    await this.page.hover(this.totalValueComponent);
    await this.page.waitForTimeout(500);
  }

  async isTooltipVisible() {
    return await this.page.isVisible(this.totalValueTooltip);
  }

  async getTooltipText() {
    await this.page.waitForSelector(this.totalValueTooltip, { state: 'visible' });
    return await this.page.textContent(this.totalValueTooltip);
  }

  async tooltipContainsDistributionInfo() {
    const text = await this.getTooltipText();
    const relevantKeywords = ['distribución', 'valor', 'contrato', 'distribution', 'value'];
    return relevantKeywords.some(keyword => text.toLowerCase().includes(keyword));
  }

  async moveMouseAwayFromComponent() {
    await this.page.hover(this.mainContent);
    await this.page.waitForTimeout(500);
  }

  async isTooltipHidden() {
    return await this.page.isHidden(this.totalValueTooltip);
  }
}

module.exports = TotalValuePage;