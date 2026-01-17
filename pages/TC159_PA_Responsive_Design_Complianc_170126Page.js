const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://ota-acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-contract-value"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.closeBreakdownButton = '[data-testid="close-breakdown-button"]';
    this.clientSearchIcon = '[data-testid="client-search-icon"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    this.poderCompraMxn = '[data-testid="rubro-poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="rubro-efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="rubro-efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="rubro-pendientes-liquidar"]';
    this.fondos = '[data-testid="rubro-fondos"]';
    this.cedesPagares = '[data-testid="rubro-cedes-pagares"]';
    this.mercadoDinero = '[data-testid="rubro-mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="rubro-mercado-capitales"]';
    
    this.deviationsLog = [];
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async setViewportLandscape(width) {
    const height = Math.round(width * 0.5625);
    await this.page.setViewportSize({ width: width, height: height });
    await this.page.waitForTimeout(500);
  }

  async setViewportPortrait(width) {
    const height = Math.round(width * 1.78);
    await this.page.setViewportSize({ width: width, height: height });
    await this.page.waitForTimeout(500);
  }

  async isContractValueComponentVisible() {
    try {
      await this.page.waitForSelector(this.contractValueComponent, { timeout: 5000 });
      return await this.page.isVisible(this.contractValueComponent);
    } catch (error) {
      this.logDeviation('Contract value component not visible');
      return false;
    }
  }

  async verifyLandscapeLayout() {
    try {
      const component = await this.page.locator(this.contractValueComponent);
      const boundingBox = await component.boundingBox();
      
      if (boundingBox && boundingBox.width > boundingBox.height) {
        return true;
      }
      this.logDeviation('Component does not adapt to landscape layout correctly');
      return false;
    } catch (error) {
      this.logDeviation('Error verifying landscape layout: ' + error.message);
      return false;
    }
  }

  async verifyPortraitLayout() {
    try {
      const component = await this.page.locator(this.contractValueComponent);
      const isVisible = await component.isVisible();
      
      if (isVisible) {
        return true;
      }
      this.logDeviation('Component does not adapt to portrait layout correctly');
      return false;
    } catch (error) {
      this.logDeviation('Error verifying portrait layout: ' + error.message);
      return false;
    }
  }

  async tapContractValueComponent() {
    await this.page.locator(this.contractValueComponent).tap();
    await this.page.waitForTimeout(300);
  }

  async isBreakdownPopupVisible() {
    try {
      await this.page.waitForSelector(this.breakdownPopup, { timeout: 5000 });
      return await this.page.isVisible(this.breakdownPopup);
    } catch (error) {
      this.logDeviation('Breakdown popup not visible after tap');
      return false;
    }
  }

  async verifyPopupLandscapeLayout() {
    try {
      const popup = await this.page.locator(this.breakdownPopup);
      const isVisible = await popup.isVisible();
      return isVisible;
    } catch (error) {
      this.logDeviation('Popup does not adapt to landscape orientation');
      return false;
    }
  }

  async verifyPopupPortraitLayout() {
    try {
      const popup = await this.page.locator(this.breakdownPopup);
      const isVisible = await popup.isVisible();
      return isVisible;
    } catch (error) {
      this.logDeviation('Popup does not adapt to portrait orientation');
      return false;
    }
  }

  async captureCurrentBreakpointState() {
    const viewport = this.page.viewportSize();
    this.currentBreakpointState = {
      width: viewport.width,
      height: viewport.height,
      timestamp: new Date().toISOString()
    };
  }

  async verifyBreakpoint(breakpoint) {
    try {
      await this.page.setViewportSize({ width: breakpoint, height: 1024 });
      await this.page.waitForTimeout(500);
      
      const isComponentVisible = await this.isContractValueComponentVisible();
      
      if (!isComponentVisible) {
        this.logDeviation('Component not rendering correctly at breakpoint ' + breakpoint + 'px');
        return false;
      }
      return true;
    } catch (error) {
      this.logDeviation('Error at breakpoint ' + breakpoint + 'px: ' + error.message);
      return false;
    }
  }

  async tapCloseBreakdownPopup() {
    try {
      await this.page.locator(this.closeBreakdownButton).tap();
      await this.page.waitForTimeout(300);
    } catch (error) {
      await this.page.locator(this.breakdownPopup).press('Escape');
    }
  }

  async isBreakdownPopupClosed() {
    try {
      await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 3000 });
      return true;
    } catch (error) {
      this.logDeviation('Breakdown popup did not close properly');
      return false;
    }
  }

  logDeviation(message) {
    this.deviationsLog.push({
      timestamp: new Date().toISOString(),
      deviation: message,
      viewport: this.page.viewportSize()
    });
  }

  async documentDesignDeviations() {
    return {
      testCaseId: 159,
      testDescription: 'PA Responsive Design Compliance Verification',
      deviationsFound: this.deviationsLog.length,
      deviations: this.deviationsLog,
      testedBreakpoints: [768, 1024],
      testedOrientations: ['landscape', 'portrait'],
      executionDate: new Date().toISOString()
    };
  }

  async getContractTotalValue() {
    return await this.page.locator(this.totalValueDisplay).textContent();
  }

  async getBreakdownItems() {
    const items = await this.page.locator(this.breakdownItemsList + ' > *').all();
    const itemTexts = [];
    for (const item of items) {
      itemTexts.push(await item.textContent());
    }
    return itemTexts;
  }

  async isDistributionTooltipVisible() {
    return await this.page.isVisible(this.distributionTooltip);
  }

  async searchClient(searchTerm) {
    await this.page.locator(this.clientSearchIcon).click();
    await this.page.fill('[data-testid="search-input"]', searchTerm);
    await this.page.press('[data-testid="search-input"]', 'Enter');
  }
};

module.exports = ContractValuePage;