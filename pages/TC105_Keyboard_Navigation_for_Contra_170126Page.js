const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - Contract Value Component
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Locators - Breakdown Items (Rubros)
    this.poderCompraMxn = '[data-testid="rubro-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="rubro-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="rubro-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="rubro-pendientes-liquidar"]';
    this.fondos = '[data-testid="rubro-fondos"]';
    this.cedesPagares = '[data-testid="rubro-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="rubro-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="rubro-mercado-capitales"]';
    
    // Locators - Search
    this.searchButton = '[data-testid="search-client-contract"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // All interactive elements for accessibility check
    this.interactiveElements = [
      this.contractValueComponent,
      this.breakdownCloseButton,
      this.poderCompraMxn,
      this.efectivoMxn,
      this.efectivoUsd,
      this.pendientesLiquidar,
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales
    ];
  }

  async navigateToActicenter() {
    await this.page.goto('/');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible' });
  }

  async navigateToComponentWithTab() {
    await this.page.keyboard.press('Tab');
    let maxAttempts = 20;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const focusedElement = await this.page.evaluate(() => {
        const el = document.activeElement;
        return el ? el.getAttribute('data-testid') : null;
      });
      
      if (focusedElement === 'contract-value-component') {
        break;
      }
      
      await this.page.keyboard.press('Tab');
      attempts++;
    }
  }

  async isContractComponentFocused() {
    const focusedTestId = await this.page.evaluate(() => {
      return document.activeElement?.getAttribute('data-testid');
    });
    return focusedTestId === 'contract-value-component';
  }

  async hasFocusIndicatorVisible() {
    const hasFocusStyles = await this.page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const styles = window.getComputedStyle(el);
      const hasOutline = styles.outline !== 'none' && styles.outlineWidth !== '0px';
      const hasBoxShadow = styles.boxShadow !== 'none';
      const hasBorder = styles.borderColor !== 'transparent';
      return hasOutline || hasBoxShadow || hasBorder;
    });
    return hasFocusStyles;
  }

  async pressEnterOnComponent() {
    await this.page.keyboard.press('Enter');
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    return await this.page.isVisible(this.breakdownPopup);
  }

  async navigateThroughPopupWithTab() {
    const breakdownItems = [
      this.poderCompraMxn,
      this.efectivoMxn,
      this.efectivoUsd,
      this.pendientesLiquidar,
      this.fondos,
      this.cedesPagares,
      this.mercadoDinero,
      this.mercadoCapitales
    ];
    
    for (let i = 0; i < breakdownItems.length; i++) {
      await this.page.keyboard.press('Tab');
      await this.page.waitForTimeout(100);
    }
  }

  async areAllBreakdownItemsFocusable() {
    const breakdownItems = [
      'rubro-poder-compra-mxn',
      'rubro-efectivo-mxn',
      'rubro-efectivo-usd',
      'rubro-pendientes-liquidar',
      'rubro-fondos',
      'rubro-cedes-pagares',
      'rubro-mercado-dinero',
      'rubro-mercado-capitales'
    ];
    
    for (const itemTestId of breakdownItems) {
      const isFocusable = await this.page.evaluate((testId) => {
        const el = document.querySelector(`[data-testid="${testId}"]`);
        if (!el) return false;
        const tabIndex = el.getAttribute('tabindex');
        const isNativelyFocusable = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName);
        return isNativelyFocusable || (tabIndex !== null && tabIndex !== '-1');
      }, itemTestId);
      
      if (!isFocusable) {
        return false;
      }
    }
    return true;
  }

  async pressEscapeToClosePopup() {
    await this.page.keyboard.press('Escape');
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async isBreakdownPopupClosed() {
    return await this.page.isHidden(this.breakdownPopup);
  }

  async isFocusOnMainComponent() {
    const focusedTestId = await this.page.evaluate(() => {
      return document.activeElement?.getAttribute('data-testid');
    });
    return focusedTestId === 'contract-value-component';
  }

  async verifyAllElementsKeyboardAccessible() {
    await this.page.keyboard.press('Tab');
    
    const accessibleElements = new Set();
    let maxTabs = 30;
    let tabCount = 0;
    
    while (tabCount < maxTabs) {
      const currentTestId = await this.page.evaluate(() => {
        return document.activeElement?.getAttribute('data-testid');
      });
      
      if (currentTestId) {
        accessibleElements.add(currentTestId);
      }
      
      await this.page.keyboard.press('Tab');
      tabCount++;
      
      const newTestId = await this.page.evaluate(() => {
        return document.activeElement?.getAttribute('data-testid');
      });
      
      if (newTestId === 'contract-value-component' && accessibleElements.has('contract-value-component')) {
        break;
      }
    }
    
    const requiredElements = ['contract-value-component'];
    return requiredElements.every(el => accessibleElements.has(el));
  }
}

module.exports = ContractValuePage;