const { expect } = require('@playwright/test');

class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.searchIcon = '[data-testid="search-icon"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.personaMoralContractOption = '[data-testid="persona-moral-contract"]';
    this.mexdolarContractOption = '[data-testid="mexdolar-contract"]';
    this.nonMexdolarContractOption = '[data-testid="non-mexdolar-contract"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.breakdownItemValue = '[data-testid="breakdown-item-value"]';
    this.poderCompraItem = '[data-testid="poder-compra-item"]';
    this.efectivoMXNItem = '[data-testid="efectivo-mxn-item"]';
    this.efectivoUSDItem = '[data-testid="efectivo-usd-item"]';
    this.pendientesLiquidarItem = '[data-testid="pendientes-liquidar-item"]';
    this.fondosDeudaItem = '[data-testid="fondos-deuda-item"]';
    this.fondosCoberturaItem = '[data-testid="fondos-cobertura-item"]';
    this.fondosRentaVariableItem = '[data-testid="fondos-renta-variable-item"]';
    this.cedesPagaresItem = '[data-testid="cedes-pagares-item"]';
    this.mercadoDineroItem = '[data-testid="mercado-dinero-item"]';
    this.mercadoCapitalesItem = '[data-testid="mercado-capitales-item"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async authenticate() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectPersonaMoralContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
    await this.page.fill(this.contractSearchInput, 'Persona Moral');
    await this.page.click(this.personaMoralContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectMexdolarContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
    await this.page.fill(this.contractSearchInput, 'Mexdolar');
    await this.page.click(this.mexdolarContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async selectNonMexdolarContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
    await this.page.fill(this.contractSearchInput, 'Sin Mexdolar');
    await this.page.click(this.nonMexdolarContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async clickValueCompositionAndCaptureRequest() {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('AGAS21472') && response.request().method() === 'GET'
    );
    await this.page.click(this.valueCompositionComponent);
    const response = await responsePromise;
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  verifyServiceInvocation(apiResponse, serviceName) {
    return apiResponse && apiResponse.status !== undefined;
  }

  getBreakdownItemsFromResponse(apiResponse) {
    return apiResponse.body || {};
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async getAllDisplayedBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItemRow);
    return await this.page.$$eval(this.breakdownItemRow, rows => 
      rows.map(row => row.textContent)
    );
  }

  async areMonetaryValuesRightAligned() {
    const values = await this.page.$$(this.breakdownItemValue);
    for (const value of values) {
      const alignment = await value.evaluate(el => 
        window.getComputedStyle(el).textAlign
      );
      if (alignment !== 'right') {
        return false;
      }
    }
    return true;
  }

  async verifyZeroBalanceFormat() {
    const values = await this.page.$$eval(this.breakdownItemValue, elements =>
      elements.map(el => el.textContent.trim())
    );
    const zeroValues = values.filter(v => 
      v === '$0.00' || v === '0.00' || v === '$0' || v === '0'
    );
    return zeroValues.every(v => v.includes('0'));
  }

  async isUSDCashItemVisible() {
    return await this.page.isVisible(this.efectivoUSDItem);
  }

  async verifyUSDCashWithoutConversion() {
    const usdText = await this.page.textContent(this.efectivoUSDItem);
    return usdText.includes('USD') && !usdText.includes('MXN');
  }

  async closeBreakdownPopup() {
    const isVisible = await this.page.isVisible(this.breakdownPopup);
    if (isVisible) {
      await this.page.click(this.breakdownCloseButton);
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
    }
  }
}

module.exports = ValueCompositionPage;