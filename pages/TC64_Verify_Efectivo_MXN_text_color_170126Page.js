class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators - inferidos usando buenas prácticas
    this.authenticatedUserIndicator = '[data-testid="user-authenticated-indicator"]';
    this.bankContractSelector = '[data-testid="bank-contract-item"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.efectivoMxnField = '[data-testid="breakdown-field-efectivo-mxn"]';
    this.efectivoMxnText = '[data-testid="breakdown-field-efectivo-mxn"] .field-label';
    this.closeBreakdownButton = '[data-testid="breakdown-popup-close-button"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupaButton = '[data-testid="search-lupa-button"]';
    
    // Expected color from Figma L&F specifications
    this.expectedFigmaHexColor = '#1A1A1A';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.authenticatedUserIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyBankContractAvailable() {
    await this.page.waitForSelector(this.bankContractSelector, { state: 'visible', timeout: 10000 });
  }

  async selectBankContract() {
    await this.page.click(this.bankContractSelector);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this.totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isEfectivoMxnFieldVisible() {
    return await this.page.isVisible(this.efectivoMxnField);
  }

  async getEfectivoMxnTextColor() {
    const element = await this.page.locator(this.efectivoMxnText);
    const color = await element.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return computedStyle.color;
    });
    return this.rgbToHex(color);
  }

  rgbToHex(rgb) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      return rgb;
    }
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
  }

  async getExpectedFigmaColor() {
    return this.expectedFigmaHexColor;
  }

  async verifyColorCompliance(actualColor) {
    const normalizedActual = actualColor.toUpperCase();
    const normalizedExpected = this.expectedFigmaHexColor.toUpperCase();
    return normalizedActual === normalizedExpected;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
};

module.exports = ContractBreakdownPage;