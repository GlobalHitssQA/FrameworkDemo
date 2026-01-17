class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractOption = '[data-testid="contract-option"]';
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.contractValueInfoIcon = '[data-testid="contract-value-info-icon"]';
    this.tooltip = '[data-testid="contract-value-tooltip"]';
    this.tooltipText = '[data-testid="contract-value-tooltip-text"]';
    this.mainContainer = '[data-testid="main-container"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithValidCredentials() {
    const username = process.env.ACTICENTER_USERNAME || 'testuser';
    const password = process.env.ACTICENTER_PASSWORD || 'testpassword';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractOption, { state: 'visible' });
    await this.page.click(this.contractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractValueComponent);
  }

  async hoverOverContractValueInfoIcon() {
    await this.page.waitForSelector(this.contractValueInfoIcon, { state: 'visible' });
    await this.page.hover(this.contractValueInfoIcon);
    await this.page.waitForTimeout(500);
  }

  async isTooltipVisible() {
    try {
      await this.page.waitForSelector(this.tooltip, { state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async getTooltipText() {
    await this.page.waitForSelector(this.tooltipText, { state: 'visible' });
    return await this.page.textContent(this.tooltipText);
  }

  async tooltipContainsDistributionInfo() {
    const text = await this.getTooltipText();
    const distributionKeywords = ['distribución', 'distribution', 'valor', 'value', 'contrato', 'contract', 'composición', 'composition'];
    return distributionKeywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
  }

  async moveMouseAwayFromComponent() {
    await this.page.hover(this.mainContainer, { position: { x: 0, y: 0 } });
    await this.page.waitForTimeout(500);
  }

  async isTooltipHidden() {
    try {
      await this.page.waitForSelector(this.tooltip, { state: 'hidden', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = ContractValuePage;