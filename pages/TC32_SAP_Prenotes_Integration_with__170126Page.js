const { expect } = require('@playwright/test');

class ActicenterContractPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    // Authentication locators
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-btn"]';
    this.mainScreen = '[data-testid="acticenter-main-screen"]';
    
    // Search and contract locators
    this.searchInput = '[data-testid="search-client-contract"]';
    this.searchButton = '[data-testid="search-magnifier-btn"]';
    this.contractTypeFilter = '[data-testid="filter-contract-type"]';
    this.bankContractOption = '[data-testid="contract-type-banco"]';
    this.contractResultsList = '[data-testid="contract-results-list"]';
    this.contractResultItem = '[data-testid="contract-result-item"]';
    this.contractInfoContainer = '[data-testid="contract-info-container"]';
    
    // Value and composition locators
    this.valueCompositionComponent = '[data-testid="valor-total-contrato"]';
    this.breakdownPopup = '[data-testid="desglose-composicion-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownCloseButton = '[data-testid="desglose-close-btn"]';
    
    // Specific breakdown items locators
    this.cashInTransitItem = '[data-testid="rubro-efectivo-transito"]';
    this.cashInTransitValue = '[data-testid="efectivo-transito-valor"]';
    this.buyingPowerMXN = '[data-testid="rubro-poder-compra-mxn"]';
    this.cashMXN = '[data-testid="rubro-efectivo-mxn"]';
    this.cashUSD = '[data-testid="rubro-efectivo-usd"]';
    this.pendingSettlement = '[data-testid="rubro-pendientes-liquidar"]';
    this.fundsItem = '[data-testid="rubro-fondos"]';
    this.cedesPayments = '[data-testid="rubro-cedes-pagares"]';
    this.moneyMarket = '[data-testid="rubro-mercado-dinero"]';
    this.capitalMarket = '[data-testid="rubro-mercado-capitales"]';
    
    // Distribution tooltip
    this.distributionTooltip = '[data-testid="tooltip-distribucion"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithAdvisorCredentials() {
    const username = process.env.ADVISOR_USERNAME || 'test_advisor';
    const password = process.env.ADVISOR_PASSWORD || 'test_password';
    
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isMainScreenDisplayed() {
    await this.page.waitForSelector(this.mainScreen, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.mainScreen);
  }

  async searchBankContractWithSAPPrenotes() {
    const contractNumber = process.env.BANK_CONTRACT_WITH_PRENOTES || 'BANCO-TEST-001';
    
    await this.page.click(this.searchButton);
    await this.page.waitForSelector(this.searchInput, { state: 'visible' });
    await this.page.fill(this.searchInput, contractNumber);
    
    if (await this.page.isVisible(this.contractTypeFilter)) {
      await this.page.click(this.contractTypeFilter);
      await this.page.click(this.bankContractOption);
    }
    
    await this.page.press(this.searchInput, 'Enter');
    await this.page.waitForSelector(this.contractResultsList, { state: 'visible' });
  }

  async selectContractFromResults() {
    await this.page.waitForSelector(this.contractResultItem, { state: 'visible' });
    await this.page.click(`${this.contractResultItem}:first-child`);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationLoaded() {
    await this.page.waitForSelector(this.contractInfoContainer, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.contractInfoContainer);
  }

  async clickValueCompositionComponent() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible' });
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupDisplayed() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async hasApplicableBreakdownItems() {
    const itemsCount = await this.page.locator(`${this.breakdownItemsList} > *`).count();
    return itemsCount > 0;
  }

  async getCashInTransitValue() {
    await this.page.waitForSelector(this.cashInTransitValue, { state: 'visible' });
    const valueText = await this.page.textContent(this.cashInTransitValue);
    return valueText ? valueText.trim() : null;
  }

  async getSAPPrenotesExpectedValue() {
    const sapExpectedValue = process.env.SAP_PRENOTES_EXPECTED_VALUE || '$0.00';
    return sapExpectedValue;
  }

  normalizeMonetaryValue(value) {
    if (!value) return 0;
    const cleanValue = value.replace(/[$,\s]/g, '');
    return parseFloat(cleanValue) || 0;
  }

  async closeBreakdownPopup() {
    if (await this.page.isVisible(this.breakdownCloseButton)) {
      await this.page.click(this.breakdownCloseButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }

  async getBreakdownItemValue(itemSelector) {
    if (await this.page.isVisible(itemSelector)) {
      return await this.page.textContent(itemSelector);
    }
    return null;
  }

  async getAllBreakdownValues() {
    return {
      buyingPowerMXN: await this.getBreakdownItemValue(this.buyingPowerMXN),
      cashMXN: await this.getBreakdownItemValue(this.cashMXN),
      cashUSD: await this.getBreakdownItemValue(this.cashUSD),
      cashInTransit: await this.getCashInTransitValue(),
      pendingSettlement: await this.getBreakdownItemValue(this.pendingSettlement),
      funds: await this.getBreakdownItemValue(this.fundsItem),
      cedesPayments: await this.getBreakdownItemValue(this.cedesPayments),
      moneyMarket: await this.getBreakdownItemValue(this.moneyMarket),
      capitalMarket: await this.getBreakdownItemValue(this.capitalMarket)
    };
  }
}

module.exports = ActicenterContractPage;