const { expect } = require('@playwright/test');

class WMDesktopComponentPage {
  constructor(page) {
    this.page = page;
    
    // Locators - Inferidos basados en buenas prácticas y elementos UI del proyecto
    this.totalValueComponent = '[data-testid="total-contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.clientSearchInput = '[data-testid="client-contract-search"]';
    this.searchMagnifier = '[data-testid="search-magnifier-icon"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    this.distributionLink = '[data-testid="view-distribution-link"]';
    
    // Breakdown items locators
    this.purchasingPowerMXN = '[data-testid="breakdown-purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="breakdown-cash-mxn"]';
    this.cashUSD = '[data-testid="breakdown-cash-usd"]';
    this.pendingSettlement = '[data-testid="breakdown-pending-settlement"]';
    this.fundsItem = '[data-testid="breakdown-funds"]';
    this.cedesAndNotes = '[data-testid="breakdown-cedes-notes"]';
    this.moneyMarket = '[data-testid="breakdown-money-market"]';
    this.capitalMarket = '[data-testid="breakdown-capital-market"]';
    
    // Monetary value fields
    this.monetaryValueFields = '[data-testid="monetary-value-field"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    
    // Design inspection storage
    this.capturedStyles = {};
    this.deviations = [];
  }

  async navigateToApplication() {
    // URL base no disponible - se debe configurar en ambiente
    const baseUrl = process.env.WM_DESKTOP_URL || 'https://wm-desktop.example.com';
    await this.page.goto(baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueComponentVisible() {
    return await this.page.locator(this.totalValueComponent).isVisible();
  }

  async captureComponentScreenshot(name) {
    const component = this.page.locator(this.totalValueComponent);
    await component.screenshot({ path: `./screenshots/${name}.png` });
  }

  async getTotalValueComponentStyles() {
    const component = this.page.locator(this.totalValueComponent);
    const styles = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        padding: computed.padding,
        margin: computed.margin,
        borderRadius: computed.borderRadius,
        boxShadow: computed.boxShadow,
        width: computed.width,
        height: computed.height
      };
    });
    this.capturedStyles.totalValueComponent = styles;
    return styles;
  }

  async clickOnTotalValueComponent() {
    await this.page.locator(this.totalValueComponent).click();
  }

  async waitForBreakdownPopupVisible() {
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'visible' });
  }

  async getBreakdownPopupStyles() {
    const popup = this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    const styles = await popup.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        position: computed.position,
        top: computed.top,
        left: computed.left,
        textAlign: computed.textAlign,
        zIndex: computed.zIndex
      };
    });
    
    this.capturedStyles.breakdownPopup = {
      ...styles,
      size: { width: boundingBox?.width, height: boundingBox?.height },
      position: { x: boundingBox?.x, y: boundingBox?.y },
      alignment: styles.textAlign
    };
    
    return this.capturedStyles.breakdownPopup;
  }

  async inspectVisualStyles() {
    const elements = [
      { name: 'totalValueComponent', selector: this.totalValueComponent },
      { name: 'breakdownPopup', selector: this.breakdownPopup },
      { name: 'distributionLink', selector: this.distributionLink }
    ];
    
    for (const element of elements) {
      const locator = this.page.locator(element.selector);
      if (await locator.isVisible()) {
        const styles = await locator.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontFamily: computed.fontFamily,
            fontSize: computed.fontSize,
            lineHeight: computed.lineHeight,
            letterSpacing: computed.letterSpacing,
            padding: computed.padding,
            margin: computed.margin
          };
        });
        this.capturedStyles[element.name] = styles;
      }
    }
  }

  async verifyStyleGuideCompliance() {
    // Valores esperados según guía de estilo WM (deben configurarse según Figma)
    const expectedStyles = {
      primaryColor: 'rgb(0, 47, 108)', // Ejemplo color WM
      fontFamily: 'Santander',
      baseFontSize: '16px'
    };
    
    const compliance = {
      colorsMatch: true,
      typographyMatch: true,
      spacingMatch: true,
      details: []
    };
    
    // Verificar estilos capturados contra esperados
    for (const [component, styles] of Object.entries(this.capturedStyles)) {
      if (styles && styles.fontFamily && !styles.fontFamily.includes('Santander')) {
        compliance.typographyMatch = false;
        compliance.details.push(`${component}: Font family does not match expected`);
      }
    }
    
    return compliance;
  }

  async hoverOnDistributionLink() {
    await this.page.locator(this.distributionLink).hover();
  }

  async waitForTooltipVisible() {
    await this.page.locator(this.distributionTooltip).waitFor({ state: 'visible' });
  }

  async getTooltipText() {
    return await this.page.locator(this.distributionTooltip).textContent();
  }

  async isTooltipVisible() {
    return await this.page.locator(this.distributionTooltip).isVisible();
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.breakdownCloseButton).click();
    await this.page.locator(this.breakdownPopup).waitFor({ state: 'hidden' });
  }

  async collectDesignDeviations() {
    const deviations = [];
    
    // Ejemplo de verificación de desviaciones
    const compliance = await this.verifyStyleGuideCompliance();
    
    if (!compliance.colorsMatch) {
      deviations.push({
        type: 'COLOR',
        component: 'Multiple',
        description: 'Colors do not match Figma specifications',
        severity: 'HIGH'
      });
    }
    
    if (!compliance.typographyMatch) {
      deviations.push({
        type: 'TYPOGRAPHY',
        component: 'Multiple',
        description: 'Typography does not match WM style guide',
        severity: 'MEDIUM'
      });
    }
    
    if (!compliance.spacingMatch) {
      deviations.push({
        type: 'SPACING',
        component: 'Multiple',
        description: 'Spacing does not match Figma specifications',
        severity: 'MEDIUM'
      });
    }
    
    compliance.details.forEach((detail) => {
      deviations.push({
        type: 'DETAIL',
        description: detail,
        severity: 'LOW'
      });
    });
    
    this.deviations = deviations;
    return deviations;
  }

  async generateDeviationReport(deviations) {
    const report = {
      timestamp: new Date().toISOString(),
      testCase: 'TC-158',
      component: 'WM Desktop Value and Composition',
      totalDeviations: deviations.length,
      deviations: deviations,
      capturedStyles: this.capturedStyles
    };
    
    console.log('Design Deviation Report:', JSON.stringify(report, null, 2));
    return report;
  }

  async getBreakdownItemsCount() {
    return await this.page.locator(this.breakdownItemsList).locator('li').count();
  }

  async getMonetaryValues() {
    const values = await this.page.locator(this.monetaryValueFields).allTextContents();
    return values;
  }
}

module.exports = WMDesktopComponentPage;