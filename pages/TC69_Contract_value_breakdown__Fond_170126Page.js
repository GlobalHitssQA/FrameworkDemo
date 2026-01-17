const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.breakdownList = page.locator('[data-testid="breakdown-list"]');
    this.fondosDeDeudaItem = page.locator('[data-testid="breakdown-item-fondos-de-deuda"]');
    this.fondosDeDeudaLabel = page.locator('[data-testid="breakdown-item-fondos-de-deuda"] [data-testid="item-label"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.operationScreen = page.locator('[data-testid="operation-screen"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector('[data-testid="authenticated-user-indicator"]', { state: 'visible', timeout: 10000 });
  }

  async selectContractWithDebtFunds() {
    await this.contractListItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async waitForOperationScreen() {
    await this.operationScreen.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isTotalContractValueComponentVisible() {
    return await this.totalContractValueComponent.isVisible();
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async isFondosDeDeudaItemVisible() {
    return await this.fondosDeDeudaItem.isVisible();
  }

  async getFondosDeDeudaItemText() {
    return await this.fondosDeDeudaLabel.textContent();
  }

  async verifyFondosDeDeudaStyling() {
    const element = this.fondosDeDeudaLabel;
    const isVisible = await element.isVisible();
    
    if (!isVisible) return false;
    
    const fontFamily = await element.evaluate(el => window.getComputedStyle(el).fontFamily);
    const fontSize = await element.evaluate(el => window.getComputedStyle(el).fontSize);
    const fontWeight = await element.evaluate(el => window.getComputedStyle(el).fontWeight);
    
    const hasFontFamily = fontFamily && fontFamily.length > 0;
    const hasFontSize = fontSize && parseFloat(fontSize) > 0;
    const hasFontWeight = fontWeight && fontWeight.length > 0;
    
    return hasFontFamily && hasFontSize && hasFontWeight;
  }

  async closeBreakdownPopup() {
    await this.closeBreakdownButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
};

module.exports = ContractValuePage;