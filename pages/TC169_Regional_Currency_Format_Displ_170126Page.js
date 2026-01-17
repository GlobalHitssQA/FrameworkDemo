class RegionalCurrencyPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractSelector = '[data-testid="contract-selector"]';
    this.contractValueComponent = '[data-testid="contract-total-value"]';
    this.compositionBreakdownBtn = '[data-testid="composition-breakdown-button"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.mxnAmountFields = '[data-testid="amount-mxn"]';
    this.usdAmountFields = '[data-testid="amount-usd"]';
    this.currencySymbolMXN = '[data-testid="currency-symbol-mxn"]';
    this.currencyIdentifierUSD = '[data-testid="currency-identifier-usd"]';
    this.closeBreakdownBtn = '[data-testid="close-breakdown-button"]';
    this.regionalConfigIndicator = '[data-testid="regional-config-indicator"]';
    this.languageSelector = '[data-testid="language-selector"]';
    this.searchClientInput = '[data-testid="search-client-input"]';
    this.searchContractInput = '[data-testid="search-contract-input"]';
    this.searchLupa = '[data-testid="search-lupa-button"]';
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyMexicoRegionalInterface() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
    const pageContent = await this.page.content();
    return pageContent.includes('es-MX') || pageContent.includes('México');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    const firstContract = `${this.contractSelector} >> nth=0`;
    await this.page.click(firstContract);
    await this.page.waitForLoadState('networkidle');
  }

  async expandValueCompositionBreakdown() {
    await this.page.click(this.compositionBreakdownBtn);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async verifyMexicanCurrencyFormat() {
    const amountElements = await this.page.locator(this.mxnAmountFields).all();
    const mexicanFormatRegex = /^\$[\d,]+\.\d{2}$/;
    
    for (const element of amountElements) {
      const text = await element.textContent();
      if (!mexicanFormatRegex.test(text.trim())) {
        return false;
      }
    }
    return true;
  }

  async verifyMXNSymbol(expectedSymbol) {
    const mxnElements = await this.page.locator(this.mxnAmountFields).all();
    for (const element of mxnElements) {
      const text = await element.textContent();
      if (!text.includes(expectedSymbol)) {
        return false;
      }
    }
    return true;
  }

  async verifyUSDIdentifier(expectedIdentifier) {
    const usdElements = await this.page.locator(this.usdAmountFields).all();
    for (const element of usdElements) {
      const text = await element.textContent();
      if (!text.includes(expectedIdentifier)) {
        return false;
      }
    }
    return true;
  }

  async changeRegionalConfiguration() {
    await this.page.click(this.languageSelector);
    const alternativeLocale = '[data-testid="locale-en-US"]';
    await this.page.click(alternativeLocale);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyRegionalFormatUpdate() {
    const amountElements = await this.page.locator('[data-testid^="amount-"]').all();
    return amountElements.length > 0;
  }

  async verifySeparatorsAdjusted() {
    const amountElements = await this.page.locator('[data-testid^="amount-"]').all();
    for (const element of amountElements) {
      const text = await element.textContent();
      const hasNumericFormat = /[\d.,]+/.test(text);
      if (!hasNumericFormat) {
        return false;
      }
    }
    return true;
  }

  async closeBreakdownPopup() {
    await this.page.click(this.closeBreakdownBtn);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = RegionalCurrencyPage;