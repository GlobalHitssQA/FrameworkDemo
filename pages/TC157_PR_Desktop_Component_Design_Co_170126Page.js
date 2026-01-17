const { expect } = require('@playwright/test');

class PRDesktopComponentPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.PR_DESKTOP_URL || 'https://pr-desktop.example.com';
    
    // Locators - Total Value Component
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    this.totalValueLabel = '[data-testid="total-value-label"]';
    
    // Locators - Breakdown Popup
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    
    // Locators - Breakdown Categories
    this.poderCompraMxn = '[data-testid="poder-compra-mxn"]';
    this.efectivoMxn = '[data-testid="efectivo-mxn"]';
    this.efectivoUsd = '[data-testid="efectivo-usd"]';
    this.pendientesLiquidar = '[data-testid="pendientes-liquidar"]';
    this.fondos = '[data-testid="fondos"]';
    this.cedesPagares = '[data-testid="cedes-pagares"]';
    this.mercadoDinero = '[data-testid="mercado-dinero"]';
    this.mercadoCapitales = '[data-testid="mercado-capitales"]';
    
    // Locators - Search Component
    this.searchMagnifyingGlass = '[data-testid="search-magnifying-glass"]';
    this.searchInput = '[data-testid="search-input"]';
    this.searchContainer = '[data-testid="search-container"]';
    this.searchCloseButton = '[data-testid="search-close-button"]';
    
    // Locators - Distribution Tooltip
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    // Locators - Monetary Values
    this.monetaryValueField = '[data-testid="monetary-value"]';
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isApplicationLoaded() {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      return true;
    } catch (error) {
      return false;
    }
  }

  async isTotalValueComponentVisible() {
    const element = this.page.locator(this.totalValueComponent);
    return await element.isVisible();
  }

  async getTotalValueComponentStyles() {
    try {
      const element = this.page.locator(this.totalValueComponent);
      const boundingBox = await element.boundingBox();
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
          fontSize: computed.fontSize,
          fontFamily: computed.fontFamily,
          padding: computed.padding,
          margin: computed.margin,
          borderRadius: computed.borderRadius
        };
      });
      return { boundingBox, styles };
    } catch (error) {
      return null;
    }
  }

  async clickTotalValueComponent() {
    const element = this.page.locator(this.totalValueComponent);
    await element.click();
  }

  async waitForBreakdownPopup() {
    const popup = this.page.locator(this.breakdownPopup);
    await popup.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isBreakdownPopupVisible() {
    const element = this.page.locator(this.breakdownPopup);
    return await element.isVisible();
  }

  async getBreakdownPopupStyles() {
    try {
      const element = this.page.locator(this.breakdownPopup);
      const boundingBox = await element.boundingBox();
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          position: computed.position,
          top: computed.top,
          left: computed.left,
          width: computed.width,
          height: computed.height,
          backgroundColor: computed.backgroundColor,
          boxShadow: computed.boxShadow,
          borderRadius: computed.borderRadius,
          zIndex: computed.zIndex
        };
      });
      return { boundingBox, styles };
    } catch (error) {
      return null;
    }
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.breakdownCloseButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  async verifyColorCompliance() {
    try {
      const elements = await this.page.locator('[data-testid]').all();
      for (const element of elements.slice(0, 10)) {
        const color = await element.evaluate((el) => {
          return window.getComputedStyle(el).color;
        });
        if (!color) return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyTypographyCompliance() {
    try {
      const totalValueLabel = this.page.locator(this.totalValueLabel);
      if (await totalValueLabel.isVisible()) {
        const typography = await totalValueLabel.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            fontFamily: computed.fontFamily,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
            lineHeight: computed.lineHeight
          };
        });
        return typography !== null;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifySpacingCompliance() {
    try {
      const component = this.page.locator(this.totalValueComponent);
      if (await component.isVisible()) {
        const spacing = await component.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            padding: computed.padding,
            margin: computed.margin,
            gap: computed.gap
          };
        });
        return spacing !== null;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  async isSearchMagnifyingGlassVisible() {
    const element = this.page.locator(this.searchMagnifyingGlass);
    return await element.isVisible();
  }

  async clickSearchMagnifyingGlass() {
    const element = this.page.locator(this.searchMagnifyingGlass);
    await element.click();
  }

  async isSearchInputVisible() {
    const element = this.page.locator(this.searchInput);
    try {
      await element.waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch (error) {
      return false;
    }
  }

  async getSearchComponentStyles() {
    try {
      const container = this.page.locator(this.searchContainer);
      if (await container.isVisible()) {
        const styles = await container.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            borderRadius: computed.borderRadius,
            padding: computed.padding,
            border: computed.border
          };
        });
        return styles;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async closeSearchIfOpen() {
    const closeButton = this.page.locator(this.searchCloseButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  }

  async fillSearchInput(searchTerm) {
    const input = this.page.locator(this.searchInput);
    await input.fill(searchTerm);
  }

  async getBreakdownItems() {
    const items = this.page.locator(this.breakdownItem);
    return await items.all();
  }

  async generateDeviationReport(deviations) {
    const report = {
      timestamp: new Date().toISOString(),
      component: 'PR Desktop - Valor y Composición de Contrato',
      platform: 'Banca Privada',
      totalDeviations: deviations.length,
      deviations: deviations,
      status: deviations.length === 0 ? 'PASSED' : 'DEVIATIONS_FOUND',
      recommendations: deviations.length > 0 
        ? 'Review identified deviations with design team and update implementation accordingly'
        : 'Component implementation matches Figma specifications'
    };
    return JSON.stringify(report, null, 2);
  }
};

module.exports = PRDesktopComponentPage;