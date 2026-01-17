class ContractValueBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en buenas prácticas y elementos UI testeables
    this._totalContractValueComponent = '[data-testid="total-contract-value-component"]';
    this._breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this._breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this._cashUSDLabel = '[data-testid="breakdown-item-efectivo-usd"]';
    this._cashUSDLabelText = '[data-testid="breakdown-item-efectivo-usd"] [data-testid="item-label"]';
    this._cashUSDValue = '[data-testid="breakdown-item-efectivo-usd"] [data-testid="item-value"]';
    this._contractSearchInput = '[data-testid="contract-search-input"]';
    this._searchButton = '[data-testid="search-button"]';
    this._usdContractOption = '[data-testid="contract-option-usd"]';
    this._breakdownItemsList = '[data-testid="breakdown-items-list"]';
  }

  async navigateToActicenter() {
    // URL base no proporcionada - se debe configurar en el ambiente
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this._totalContractValueComponent, { state: 'visible', timeout: 30000 });
  }

  async selectUSDContract() {
    await this.page.click(this._searchButton);
    await this.page.waitForSelector(this._contractSearchInput, { state: 'visible' });
    await this.page.fill(this._contractSearchInput, 'USD');
    await this.page.waitForSelector(this._usdContractOption, { state: 'visible' });
    await this.page.click(this._usdContractOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isTotalContractValueComponentVisible() {
    return await this.page.isVisible(this._totalContractValueComponent);
  }

  async clickTotalContractValueComponent() {
    await this.page.click(this._totalContractValueComponent);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this._breakdownPopup);
  }

  async isCashUSDLabelVisible() {
    return await this.page.isVisible(this._cashUSDLabel);
  }

  async getCashUSDLabelText() {
    await this.page.waitForSelector(this._cashUSDLabelText, { state: 'visible' });
    return await this.page.textContent(this._cashUSDLabelText);
  }

  async getCashUSDLabelStyles() {
    const element = await this.page.$(this._cashUSDLabelText);
    if (!element) return null;
    
    return await element.evaluate((el) => {
      const computedStyles = window.getComputedStyle(el);
      return {
        fontFamily: computedStyles.fontFamily,
        fontSize: computedStyles.fontSize,
        fontWeight: computedStyles.fontWeight,
        color: computedStyles.color,
        textTransform: computedStyles.textTransform
      };
    });
  }

  async closeBreakdownPopup() {
    await this.page.click(this._breakdownCloseButton);
    await this.page.waitForSelector(this._breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValueBreakdownPage;