const { expect } = require('@playwright/test');

class ContractValuationPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    this.searchInput = '[data-testid="client-contract-search"]';
    this.searchButton = '[data-testid="search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    this.contractWithDebtFunds = '[data-testid="contract-item-debt-funds"]';
    this.totalContractValueComponent = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="valuation-breakdown-popup"]';
    this.debtFundsSection = '[data-testid="debt-funds-section"]';
    this.debtFundsLabel = '[data-testid="debt-funds-label"]';
    this.debtFundsValue = '[data-testid="debt-funds-value"]';
    this.closePopupButton = '[data-testid="close-breakdown-popup"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMainScreenIsDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
  }

  async selectContractWithDebtFunds() {
    const contractSelector = this.contractWithDebtFunds;
    const contractExists = await this.page.locator(contractSelector).first().isVisible().catch(() => false);
    
    if (contractExists) {
      await this.page.locator(contractSelector).first().click();
    } else {
      await this.page.locator(this.contractListItem).first().click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTotalValueComponentIsDisplayed() {
    await this.page.waitForSelector(this.totalContractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async clickTotalContractValueComponent() {
    await this.page.locator(this.totalContractValueComponent).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible();
  }

  async isDebtFundsSectionVisible() {
    return await this.page.locator(this.debtFundsSection).isVisible();
  }

  async getDebtFundsMonetaryValue() {
    await this.page.waitForSelector(this.debtFundsValue, { state: 'visible', timeout: 5000 });
    return await this.page.locator(this.debtFundsValue).textContent();
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.closePopupButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
};

module.exports = ContractValuationPage;