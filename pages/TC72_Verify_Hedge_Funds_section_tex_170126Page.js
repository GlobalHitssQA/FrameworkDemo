class ActicenterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Locators
    this.mainScreenContainer = '[data-testid="acticenter-main-screen"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractWithHedgeFunds = '[data-testid="contract-hedge-funds"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.hedgeFundsSection = '[data-testid="hedge-funds-section"]';
    this.hedgeFundsText = '[data-testid="hedge-funds-text"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    
    // Expected Look and Feel specifications
    this.expectedTextColors = {
      primary: 'rgb(51, 51, 51)',
      secondary: 'rgb(102, 102, 102)',
      hedgeFunds: 'rgb(0, 102, 153)',
      accent: 'rgb(0, 123, 255)'
    };
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreenContainer, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithHedgeFunds() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.contractWithHedgeFunds, { state: 'visible' });
    await this.page.click(this.contractWithHedgeFunds);
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

  async getHedgeFundsSectionTextColor() {
    await this.page.waitForSelector(this.hedgeFundsSection, { state: 'visible' });
    const textElement = await this.page.locator(this.hedgeFundsText);
    const color = await textElement.evaluate((el) => {
      return window.getComputedStyle(el).color;
    });
    return color;
  }

  async validateTextColorCompliance(actualColor) {
    const validColors = Object.values(this.expectedTextColors);
    const isCompliant = validColors.includes(actualColor) || 
                        actualColor === this.expectedTextColors.hedgeFunds;
    return isCompliant;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownButton);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
};

module.exports = ActicenterPage;