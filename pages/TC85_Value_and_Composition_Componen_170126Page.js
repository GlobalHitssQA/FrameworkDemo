class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    
    this.valueComponentContainer = '[data-testid="value-composition-component"]';
    this.totalContractValue = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupTrigger = '[data-testid="breakdown-popup-trigger"]';
    this.closePopupButton = '[data-testid="close-popup-button"]';
    this.popupOverlay = '[data-testid="popup-overlay"]';
    
    this.searchButton = '[data-testid="contract-search-button"]';
    this.searchInput = '[data-testid="contract-search-input"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarket = '[data-testid="money-market"]';
    this.capitalMarket = '[data-testid="capital-market"]';
    this.pendingSettlements = '[data-testid="pending-settlements"]';
    
    this.operationsNavLink = '[data-testid="nav-operations"]';
    this.consultationsNavLink = '[data-testid="nav-consultations"]';
    this.valueComponentNavLink = '[data-testid="nav-value-component"]';
    this.operationsSection = '[data-testid="operations-section"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.valueComponentContainer, { state: 'visible', timeout: 30000 });
  }

  async openContractSearch() {
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
  }

  async selectFirstAvailableContract() {
    await this.page.waitForSelector(this.contractListItem, { state: 'visible' });
    await this.page.click(`${this.contractListItem}:first-child`);
  }

  async waitForValueComponentToLoad() {
    await this.page.waitForSelector(this.valueComponentContainer, { state: 'visible' });
    await this.page.waitForSelector(this.totalContractValue, { state: 'visible' });
  }

  async isValueComponentVisible() {
    return await this.page.isVisible(this.valueComponentContainer);
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalContractValue);
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownPopupTrigger);
  }

  async waitForPopupToLoad() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async closeBreakdownPopup() {
    const closeButtonVisible = await this.page.isVisible(this.closePopupButton);
    if (closeButtonVisible) {
      await this.page.click(this.closePopupButton);
    } else {
      await this.page.click(this.popupOverlay);
    }
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }

  async isPurchasingPowerMXNVisible() {
    return await this.page.isVisible(this.purchasingPowerMXN);
  }

  async isCashMXNVisible() {
    return await this.page.isVisible(this.cashMXN);
  }

  async isCashUSDVisible() {
    return await this.page.isVisible(this.cashUSD);
  }

  async isFundsListVisible() {
    return await this.page.isVisible(this.fundsList);
  }

  async isPendingSettlementsVisible() {
    return await this.page.isVisible(this.pendingSettlements);
  }

  async getAllBreakdownValues() {
    const values = {};
    
    if (await this.page.isVisible(this.purchasingPowerMXN)) {
      values.purchasingPowerMXN = await this.page.textContent(this.purchasingPowerMXN);
    }
    if (await this.page.isVisible(this.cashMXN)) {
      values.cashMXN = await this.page.textContent(this.cashMXN);
    }
    if (await this.page.isVisible(this.cashUSD)) {
      values.cashUSD = await this.page.textContent(this.cashUSD);
    }
    if (await this.page.isVisible(this.debtFunds)) {
      values.debtFunds = await this.page.textContent(this.debtFunds);
    }
    if (await this.page.isVisible(this.hedgeFunds)) {
      values.hedgeFunds = await this.page.textContent(this.hedgeFunds);
    }
    if (await this.page.isVisible(this.equityFunds)) {
      values.equityFunds = await this.page.textContent(this.equityFunds);
    }
    if (await this.page.isVisible(this.moneyMarket)) {
      values.moneyMarket = await this.page.textContent(this.moneyMarket);
    }
    if (await this.page.isVisible(this.capitalMarket)) {
      values.capitalMarket = await this.page.textContent(this.capitalMarket);
    }
    if (await this.page.isVisible(this.pendingSettlements)) {
      values.pendingSettlements = await this.page.textContent(this.pendingSettlements);
    }
    
    return values;
  }

  async navigateToOperationsSection() {
    await this.page.click(this.operationsNavLink);
    await this.page.waitForSelector(this.operationsSection, { state: 'visible' });
  }

  async isOperationsSectionVisible() {
    return await this.page.isVisible(this.operationsSection);
  }

  async navigateBackToValueComponent() {
    await this.page.click(this.valueComponentNavLink);
  }
};

module.exports = ValueCompositionPage;