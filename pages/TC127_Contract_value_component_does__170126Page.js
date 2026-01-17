const { expect } = require('@playwright/test');

class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    
    this.totalValueComponent = page.locator('[data-testid="total-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.buySellIcon = page.locator('[data-testid="buy-sell-icon"]');
    this.headerSearchIcon = page.locator('[data-testid="header-search-icon"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
    this.searchResults = page.locator('[data-testid="search-results"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractOptionsList = page.locator('[data-testid="contract-options-list"]');
    this.operationFlowContainer = page.locator('[data-testid="operation-flow-container"]');
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement"]');
    this.funds = page.locator('[data-testid="funds"]');
    this.cedesAndPromissoryNotes = page.locator('[data-testid="cedes-promissory-notes"]');
    this.moneyMarket = page.locator('[data-testid="money-market"]');
    this.capitalMarket = page.locator('[data-testid="capital-market"]');
    this.distributionTooltip = page.locator('[data-testid="distribution-tooltip"]');
  }

  async navigateToContract() {
    await this.page.goto('/acticenter/contract');
  }

  async waitForInterfaceToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.totalValueComponent.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isTotalValueComponentVisible() {
    return await this.totalValueComponent.isVisible();
  }

  async areOperationFlowElementsVisible() {
    const flowContainerVisible = await this.operationFlowContainer.isVisible();
    const buySellVisible = await this.buySellIcon.isVisible();
    return flowContainerVisible && buySellVisible;
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
  }

  async isBreakdownPopupVisible() {
    await this.breakdownPopup.waitFor({ state: 'visible', timeout: 5000 });
    return await this.breakdownPopup.isVisible();
  }

  async areOtherComponentsPositionedCorrectly() {
    const flowContainer = await this.operationFlowContainer.boundingBox();
    const buySellIcon = await this.buySellIcon.boundingBox();
    return flowContainer !== null && buySellIcon !== null;
  }

  async clickBuySellIcon() {
    await this.buySellIcon.click();
  }

  async isBreakdownPopupClosed() {
    await this.breakdownPopup.waitFor({ state: 'hidden', timeout: 5000 });
    return !(await this.breakdownPopup.isVisible());
  }

  async clickHeaderSearchIcon() {
    await this.headerSearchIcon.click();
  }

  async performClientSearch(searchTerm) {
    await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await this.searchInput.fill(searchTerm);
    await this.page.keyboard.press('Enter');
  }

  async isSearchResultsDisplayed() {
    await this.searchResults.waitFor({ state: 'visible', timeout: 5000 });
    return await this.searchResults.isVisible();
  }

  async selectDifferentContract() {
    const currentValue = await this.totalValueComponent.textContent();
    this.previousTotalValue = currentValue;
    await this.contractSelector.click();
    await this.contractOptionsList.waitFor({ state: 'visible', timeout: 5000 });
    const contractOptions = this.contractOptionsList.locator('[data-testid="contract-option"]');
    const count = await contractOptions.count();
    if (count > 1) {
      await contractOptions.nth(1).click();
    }
  }

  async isTotalValueComponentUpdated() {
    await this.page.waitForTimeout(1000);
    const newValue = await this.totalValueComponent.textContent();
    return newValue !== null && newValue.length > 0;
  }

  async isTransitionWithoutInterference() {
    const isComponentVisible = await this.totalValueComponent.isVisible();
    const isFlowContainerVisible = await this.operationFlowContainer.isVisible();
    return isComponentVisible && isFlowContainerVisible;
  }

  async closeBreakdownPopup() {
    if (await this.breakdownPopup.isVisible()) {
      await this.breakdownCloseButton.click();
    }
  }

  async getBreakdownItems() {
    const items = {};
    if (await this.purchasingPowerMXN.isVisible()) {
      items.purchasingPowerMXN = await this.purchasingPowerMXN.textContent();
    }
    if (await this.cashMXN.isVisible()) {
      items.cashMXN = await this.cashMXN.textContent();
    }
    if (await this.cashUSD.isVisible()) {
      items.cashUSD = await this.cashUSD.textContent();
    }
    if (await this.pendingSettlement.isVisible()) {
      items.pendingSettlement = await this.pendingSettlement.textContent();
    }
    if (await this.funds.isVisible()) {
      items.funds = await this.funds.textContent();
    }
    if (await this.cedesAndPromissoryNotes.isVisible()) {
      items.cedesAndPromissoryNotes = await this.cedesAndPromissoryNotes.textContent();
    }
    if (await this.moneyMarket.isVisible()) {
      items.moneyMarket = await this.moneyMarket.textContent();
    }
    if (await this.capitalMarket.isVisible()) {
      items.capitalMarket = await this.capitalMarket.textContent();
    }
    return items;
  }
};

module.exports = ActicenterContractPage;