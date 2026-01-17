const { expect } = require('@playwright/test');

class ValueCompositionPage {
  constructor(page) {
    this.page = page;
    this.consoleMessages = [];
    
    // Locators - Inferidos basados en mejores prácticas
    this.usernameInput = '[data-testid="login-username"]';
    this.passwordInput = '[data-testid="login-password"]';
    this.loginButton = '[data-testid="login-submit-button"]';
    this.searchIcon = '[data-testid="search-client-contract"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.casaBolsaPersonaMoralOption = '[data-testid="contract-casa-bolsa-persona-moral"]';
    this.valueCompositionComponent = '[data-testid="value-composition-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.poderCompraMXN = '[data-testid="poder-compra-mxn"]';
    this.efectivoUSD = '[data-testid="efectivo-usd"]';
    this.efectivoMXN = '[data-testid="efectivo-mxn"]';
    this.interactiveElement = '[data-testid="interactive-element"]';
    this.tooltip = '[data-testid="tooltip"]';
    this.mainContainer = '[data-testid="main-container"]';
    this.overlay = '[data-testid="overlay-backdrop"]';
  }

  async initializeBrowser() {
    this.page.on('console', (msg) => {
      const type = msg.type();
      if (type === 'error' || type === 'warning') {
        this.consoleMessages.push({ type, text: msg.text() });
      }
    });
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectCasaBolsaPersonaMoralContract() {
    await this.page.click(this.searchIcon);
    await this.page.waitForSelector(this.contractSearchInput);
    await this.page.click(this.casaBolsaPersonaMoralOption);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueCompositionComponentVisible() {
    await this.page.waitForSelector(this.valueCompositionComponent, { state: 'visible', timeout: 10000 });
    return await this.page.isVisible(this.valueCompositionComponent);
  }

  async clickValueCompositionComponent() {
    await this.page.click(this.valueCompositionComponent);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async isPoderCompraMXNDisplayed() {
    await this.page.waitForSelector(this.poderCompraMXN, { state: 'visible' });
    const text = await this.page.textContent(this.poderCompraMXN);
    return text !== null && text.trim().length > 0;
  }

  async isEfectivoUSDDisplayed() {
    await this.page.waitForSelector(this.efectivoUSD, { state: 'visible' });
    const text = await this.page.textContent(this.efectivoUSD);
    return text !== null && text.trim().length > 0;
  }

  async hoverOverInteractiveElement() {
    await this.page.hover(this.interactiveElement);
  }

  async isTooltipVisible() {
    await this.page.waitForSelector(this.tooltip, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.tooltip);
  }

  async clickOutsideComponent() {
    await this.page.click(this.overlay, { force: true });
  }

  async isBreakdownPopupClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async getConsoleErrorsAndWarnings() {
    return this.consoleMessages;
  }
}

module.exports = ValueCompositionPage;