const { expect } = require('@playwright/test');

class ActicenterPage {
  constructor(page) {
    this.page = page;
    
    // Authentication locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    // Search locators
    this.searchIcon = page.locator('[data-testid="search-icon"], .search-icon, [aria-label="Buscar cliente"]');
    this.searchInput = page.locator('[data-testid="search-contract-input"]');
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.contractItem = page.locator('[data-testid="contract-item"]');
    
    // Contract value component locators
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.totalContractValue = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItems = page.locator('[data-testid="breakdown-item"]');
    
    // Breakdown item locators
    this.purchasingPowerMXN = page.locator('[data-testid="poder-compra-mxn"]');
    this.mxnCash = page.locator('[data-testid="efectivo-mxn"]');
    this.usdCash = page.locator('[data-testid="efectivo-usd"]');
    this.pendingSettlements = page.locator('[data-testid="pendientes-liquidar"]');
    this.debtFunds = page.locator('[data-testid="fondos-deuda"]');
    this.hedgeFunds = page.locator('[data-testid="fondos-cobertura"]');
    this.equityFunds = page.locator('[data-testid="fondos-renta-variable"]');
    this.cashInTransit = page.locator('[data-testid="efectivo-transito"]');
    this.cedesPagares = page.locator('[data-testid="cedes-pagares"]');
    this.moneyMarket = page.locator('[data-testid="mercado-dinero"]');
    this.capitalMarket = page.locator('[data-testid="mercado-capitales"]');
    
    // Widget locators
    this.buySellWidget = page.locator('[data-testid="buy-sell-widget"]');
    
    // Client screen locators
    this.clientScreen = page.locator('[data-testid="client-screen"]');
    
    // Contract type selectors
    this.casaBolsaContract = page.locator('[data-testid="contract-casa-bolsa"]');
    this.bankContract = page.locator('[data-testid="contract-banco"]');
    this.bankPersonaMoralMexdolar = page.locator('[data-testid="contract-banco-moral-mexdolar"]');
    this.mexdolarPersonaMoral = page.locator('[data-testid="contract-mexdolar-moral"]');
    
    // Overlay for clicking outside
    this.overlay = page.locator('[data-testid="overlay"], .overlay, .backdrop');
  }

  async navigateToActicenter() {
    await this.page.goto('/acticenter');
    await this.page.waitForLoadState('networkidle');
  }

  async loginAsAdvisor() {
    await this.usernameInput.fill(process.env.ADVISOR_USERNAME || 'advisor_test');
    await this.passwordInput.fill(process.env.ADVISOR_PASSWORD || 'password_test');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchContract() {
    await this.searchIcon.click();
    await this.searchInput.waitFor({ state: 'visible' });
    await this.searchInput.fill('test-contract');
    await this.page.waitForTimeout(500);
  }

  async selectFirstContract() {
    await this.contractItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible();
  }

  async getTotalContractValue() {
    return await this.totalContractValue.textContent();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isBreakdownPopupHidden() {
    return await this.breakdownPopup.isHidden();
  }

  async hasBreakdownItems() {
    const count = await this.breakdownItems.count();
    return count > 0;
  }

  async getZeroValueItems() {
    const items = await this.breakdownItems.all();
    const zeroItems = [];
    for (const item of items) {
      const text = await item.textContent();
      if (text.includes('$0.00')) {
        zeroItems.push(text);
      }
    }
    return zeroItems;
  }

  async selectCasaDeBolsaContract() {
    await this.searchIcon.click();
    await this.casaBolsaContract.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBankContract() {
    await this.searchIcon.click();
    await this.bankContract.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectBankPersonaMoralMexdolarContract() {
    await this.searchIcon.click();
    await this.bankPersonaMoralMexdolar.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectMexdolarPersonaMoralContract() {
    await this.searchIcon.click();
    await this.mexdolarPersonaMoral.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isPurchasingPowerMXNVisible() {
    return await this.purchasingPowerMXN.isVisible();
  }

  async getPurchasingPowerMXNValue() {
    const text = await this.purchasingPowerMXN.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async isMXNCashVisible() {
    return await this.mxnCash.isVisible();
  }

  async getMXNCashValue() {
    const text = await this.mxnCash.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getUSDCashValue() {
    const text = await this.usdCash.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getCasaBolsaUSDCashValue() {
    return await this.getUSDCashValue();
  }

  async isCashInTransitVisible() {
    return await this.cashInTransit.isVisible();
  }

  async getPendingSettlementsValue() {
    const text = await this.pendingSettlements.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getDebtFundsValue() {
    const text = await this.debtFunds.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getHedgeFundsValue() {
    const text = await this.hedgeFunds.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getEquityFundsValue() {
    const text = await this.equityFunds.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getCedesPagaresValue() {
    const text = await this.cedesPagares.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getMoneyMarketValue() {
    const text = await this.moneyMarket.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async getCapitalMarketValue() {
    const text = await this.capitalMarket.textContent();
    const match = text.match(/\$[\d,]+\.\d{2}/);
    return match ? match[0] : null;
  }

  async clickOutsideBreakdown() {
    await this.page.mouse.click(10, 10);
    await this.page.waitForTimeout(300);
  }

  async isSearchIconVisible() {
    return await this.searchIcon.isVisible();
  }

  async clickSearchIcon() {
    await this.searchIcon.click();
    await this.clientScreen.waitFor({ state: 'visible' });
  }

  async isClientScreenVisible() {
    return await this.clientScreen.isVisible();
  }

  async isUSDCashReadOnly() {
    const element = this.usdCash;
    const isDisabled = await element.getAttribute('disabled');
    const isReadOnly = await element.getAttribute('readonly');
    const ariaReadOnly = await element.getAttribute('aria-readonly');
    return isDisabled !== null || isReadOnly !== null || ariaReadOnly === 'true';
  }

  async isBuySellWidgetDisabled() {
    const isDisabled = await this.buySellWidget.getAttribute('disabled');
    const ariaDisabled = await this.buySellWidget.getAttribute('aria-disabled');
    const hasDisabledClass = await this.buySellWidget.evaluate(el => el.classList.contains('disabled'));
    return isDisabled !== null || ariaDisabled === 'true' || hasDisabledClass;
  }

  async validateResponsiveViews() {
    // This method prepares for responsive validation
    await this.page.waitForLoadState('networkidle');
  }

  async validateDesktopView() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.waitForTimeout(500);
    return await this.isContractValueComponentVisible() && await this.isSearchIconVisible();
  }

  async validateLandscapeView() {
    await this.page.setViewportSize({ width: 1024, height: 768 });
    await this.page.waitForTimeout(500);
    return await this.isContractValueComponentVisible() && await this.isSearchIconVisible();
  }

  async validatePortraitView() {
    await this.page.setViewportSize({ width: 375, height: 812 });
    await this.page.waitForTimeout(500);
    return await this.isContractValueComponentVisible() && await this.isSearchIconVisible();
  }
}

module.exports = ActicenterPage;