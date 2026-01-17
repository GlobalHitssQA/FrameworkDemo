const { expect } = require('@playwright/test');

class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en buenas prácticas y elementos UI descritos
    this.searchMagnifyingGlassIcon = page.locator('[data-testid="search-magnifying-glass"]');
    this.clientGeneralScreen = page.locator('[data-testid="client-general-screen"]');
    this.contractsList = page.locator('[data-testid="contracts-list"]');
    this.contractListItems = page.locator('[data-testid="contract-list-item"]');
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.totalValueDisplay = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopupTrigger = page.locator('[data-testid="breakdown-popup-trigger"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.closeBreakdownButton = page.locator('[data-testid="close-breakdown-button"]');
    this.operationButtons = page.locator('[data-testid="operation-buttons"]');
    this.consultButton = page.locator('[data-testid="consult-contract-button"]');
    this.operateButton = page.locator('[data-testid="operate-contract-button"]');
    this.userAuthIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.multipleContractsIndicator = page.locator('[data-testid="multiple-contracts-badge"]');
  }

  async navigateToActicenter() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userAuthIndicator).toBeVisible({ timeout: 10000 });
  }

  async verifyClientHasMultipleContracts() {
    const contractCount = await this.contractListItems.count();
    return contractCount > 1;
  }

  async clickSearchMagnifyingGlass() {
    await this.searchMagnifyingGlassIcon.waitFor({ state: 'visible' });
    await this.searchMagnifyingGlassIcon.click();
  }

  async isClientGeneralScreenDisplayed() {
    await this.clientGeneralScreen.waitFor({ state: 'visible', timeout: 10000 });
    return await this.clientGeneralScreen.isVisible();
  }

  async viewContractsList() {
    await this.contractsList.waitFor({ state: 'visible' });
  }

  async areAllContractsVisible() {
    const isListVisible = await this.contractsList.isVisible();
    const contractCount = await this.contractListItems.count();
    return isListVisible && contractCount > 0;
  }

  async selectFirstAvailableContract() {
    await this.contractListItems.first().waitFor({ state: 'visible' });
    await this.contractListItems.first().click();
  }

  async isContractValueComponentDisplayed() {
    await this.contractValueComponent.waitFor({ state: 'visible', timeout: 10000 });
    return await this.contractValueComponent.isVisible();
  }

  async isTotalValueDisplayed() {
    await this.totalValueDisplay.waitFor({ state: 'visible' });
    const text = await this.totalValueDisplay.textContent();
    return text !== null && text.length > 0;
  }

  async isBreakdownAccessible() {
    await this.breakdownPopupTrigger.waitFor({ state: 'visible' });
    await this.breakdownPopupTrigger.click();
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    const isVisible = await this.breakdownPopup.isVisible();
    await this.closeBreakdownButton.click();
    return isVisible;
  }

  async areOperationFunctionsEnabled() {
    await this.operationButtons.waitFor({ state: 'visible' });
    const consultEnabled = await this.consultButton.isEnabled();
    const operateVisible = await this.operateButton.isVisible();
    return consultEnabled || operateVisible;
  }
}

module.exports = ActicenterContractPage;