class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractWithCapitalMarket = '[data-testid="contract-capital-market"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.capitalMarketSection = '[data-testid="breakdown-capital-market"]';
    this.capitalMarketText = '[data-testid="capital-market-text"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    
    // Expected Look and Feel specifications
    this.expectedTextColors = [
      'rgb(51, 51, 51)',
      'rgb(0, 0, 0)',
      '#333333',
      '#000000',
      'rgb(33, 37, 41)'
    ];
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithCapitalMarketInvestments() {
    await this.page.waitForSelector(this.contractSelector, { state: 'visible' });
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractWithCapitalMarket, { state: 'visible' });
    await this.page.click(this.contractWithCapitalMarket);
  }

  async verifyTotalContractValueComponentIsVisible() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this.totalContractValueComponent);
  }

  async isBreakdownPopupVisible() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getCapitalMarketTextColor() {
    await this.page.waitForSelector(this.capitalMarketText, { state: 'visible' });
    const color = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        return window.getComputedStyle(element).color;
      }
      return null;
    }, this.capitalMarketText);
    return color;
  }

  validateLookAndFeelColor(actualColor) {
    if (!actualColor) {
      return false;
    }
    const normalizedActual = actualColor.toLowerCase().trim();
    return this.expectedTextColors.some(expectedColor => {
      const normalizedExpected = expectedColor.toLowerCase().trim();
      return normalizedActual === normalizedExpected || 
             this.convertToRgb(normalizedExpected) === normalizedActual;
    });
  }

  convertToRgb(hexColor) {
    if (hexColor.startsWith('rgb')) {
      return hexColor;
    }
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ActicenterPage;