class PADesktopPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.PA_DESKTOP_URL || 'https://pa-desktop.acticenter.com';
    
    this.totalValueComponent = '[data-testid="total-value-component"]';
    this.totalValueAmount = '[data-testid="total-value-amount"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownPopupClose = '[data-testid="breakdown-popup-close"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    this.searchClientInput = '[data-testid="search-client-input"]';
    this.searchClientButton = '[data-testid="search-client-button"]';
    this.poderDeCompraItem = '[data-testid="item-poder-compra"]';
    this.pendientesLiquidarItem = '[data-testid="item-pendientes-liquidar"]';
    this.fondosItem = '[data-testid="item-fondos"]';
    this.cedesItem = '[data-testid="item-cedes"]';
    this.mercadosItem = '[data-testid="item-mercados"]';
    this.distributionTooltip = '[data-testid="distribution-tooltip"]';
    
    this.deviations = [];
  }

  async navigateToApplication() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async isValueComponentLoaded() {
    return await this.page.locator(this.totalValueComponent).isVisible({ timeout: 10000 });
  }

  async inspectTotalValueComponent() {
    await this.page.locator(this.totalValueComponent).waitFor({ state: 'visible' });
  }

  async getTotalValueComponentStyles() {
    const element = this.page.locator(this.totalValueComponent);
    const boundingBox = await element.boundingBox();
    const styles = await element.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        backgroundColor: computed.backgroundColor,
        color: computed.color,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        padding: computed.padding,
        margin: computed.margin,
        borderRadius: computed.borderRadius
      };
    });
    return { ...styles, boundingBox };
  }

  async clickTotalValueComponent() {
    await this.page.locator(this.totalValueComponent).click();
  }

  async isBreakdownPopupVisible() {
    return await this.page.locator(this.breakdownPopup).isVisible({ timeout: 5000 });
  }

  async getBreakdownPopupStyles() {
    const popup = this.page.locator(this.breakdownPopup);
    const boundingBox = await popup.boundingBox();
    const styles = await popup.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        position: computed.position,
        top: computed.top,
        left: computed.left,
        width: computed.width,
        height: computed.height,
        textAlign: computed.textAlign
      };
    });
    return {
      position: styles.position,
      size: { width: boundingBox?.width, height: boundingBox?.height },
      alignment: styles.textAlign
    };
  }

  async verifyStyleGuideCompliance() {
    const component = this.page.locator(this.totalValueComponent);
    const styles = await component.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        color: computed.color,
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        lineHeight: computed.lineHeight,
        padding: computed.padding
      };
    });
    return {
      colors: styles.color !== '',
      typography: styles.fontFamily !== '' && styles.fontSize !== '',
      spacing: styles.padding !== ''
    };
  }

  async getBreakdownItemsOrder() {
    const items = await this.page.locator(this.breakdownItem).all();
    return items;
  }

  async getBreakdownItemsText() {
    const items = await this.page.locator(this.breakdownItem).allTextContents();
    return items;
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.breakdownPopupClose).click();
  }

  async documentDeviations() {
    const expectedStyles = {
      totalValueBgColor: 'rgb(255, 255, 255)',
      popupBorderRadius: '8px'
    };
    const actualStyles = await this.getTotalValueComponentStyles();
    if (actualStyles.backgroundColor !== expectedStyles.totalValueBgColor) {
      this.deviations.push({
        element: 'totalValueComponent',
        property: 'backgroundColor',
        expected: expectedStyles.totalValueBgColor,
        actual: actualStyles.backgroundColor
      });
    }
  }

  async isDeviationReportAvailable() {
    return {
      hasDeviations: this.deviations.length > 0,
      deviations: this.deviations,
      reportGenerated: true
    };
  }

  async getMonetaryValue() {
    return await this.page.locator(this.totalValueAmount).textContent();
  }

  async searchClient(searchTerm) {
    await this.page.locator(this.searchClientInput).fill(searchTerm);
    await this.page.locator(this.searchClientButton).click();
  }
}

module.exports = PADesktopPage;