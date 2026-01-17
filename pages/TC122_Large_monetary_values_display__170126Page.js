const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.totalValueComponent = page.locator('[data-testid="contract-total-value"]');
    this.breakdownPopup = page.locator('[data-testid="contract-breakdown-popup"]');
    this.closePopupButton = page.locator('[data-testid="breakdown-popup-close"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.breakdownItem = page.locator('[data-testid="breakdown-item"]');
    this.itemValue = page.locator('[data-testid="item-monetary-value"]');
    this.totalCalculatedValue = page.locator('[data-testid="total-calculated-value"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile"]');
    this.poderCompraMXN = page.locator('[data-testid="rubro-poder-compra-mxn"]');
    this.efectivoMXN = page.locator('[data-testid="rubro-efectivo-mxn"]');
    this.efectivoUSD = page.locator('[data-testid="rubro-efectivo-usd"]');
    this.pendientesLiquidar = page.locator('[data-testid="rubro-pendientes-liquidar"]');
    this.fondos = page.locator('[data-testid="rubro-fondos"]');
    this.cedesPagares = page.locator('[data-testid="rubro-cedes-pagares"]');
    this.mercadoDinero = page.locator('[data-testid="rubro-mercado-dinero"]');
    this.mercadoCapitales = page.locator('[data-testid="rubro-mercado-capitales"]');
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userProfileIndicator).toBeVisible({ timeout: 10000 });
  }

  async verifyLargeValueContractIsAvailable() {
    await this.searchButton.waitFor({ state: 'visible' });
  }

  async selectContractWithLargeValues(minValue) {
    await this.contractSearchInput.fill('LARGE_VALUE_CONTRACT');
    await this.searchButton.click();
    await this.contractListItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractLoadedSuccessfully() {
    await this.page.waitForLoadState('networkidle');
    const errorMessages = this.page.locator('[data-testid="error-message"]');
    await expect(errorMessages).toHaveCount(0);
  }

  async verifyTotalValueComponentIsVisible() {
    await expect(this.totalValueComponent).toBeVisible({ timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.page.waitForTimeout(500);
  }

  async verifyBreakdownPopupIsVisible() {
    await expect(this.breakdownPopup).toBeVisible({ timeout: 5000 });
  }

  async verifyAllContractItemsAreDisplayed() {
    await expect(this.breakdownItemsList).toBeVisible();
    const itemCount = await this.breakdownItem.count();
    expect(itemCount).toBeGreaterThan(0);
  }

  async verifyLargeValuesHaveCorrectFormat() {
    const currencyFormatRegex = /^\$[0-9]{1,3}(,[0-9]{3})*\.[0-9]{2}$/;
    const values = await this.itemValue.all();
    
    for (const value of values) {
      const text = await value.textContent();
      const cleanText = text.trim();
      if (!currencyFormatRegex.test(cleanText)) {
        return false;
      }
    }
    return true;
  }

  async verifyValuesDoNotOverflow() {
    const values = await this.itemValue.all();
    
    for (const value of values) {
      const boundingBox = await value.boundingBox();
      const parentElement = await value.locator('..');
      const parentBox = await parentElement.boundingBox();
      
      if (boundingBox && parentBox) {
        const overflowX = boundingBox.x + boundingBox.width > parentBox.x + parentBox.width;
        const overflowY = boundingBox.y + boundingBox.height > parentBox.y + parentBox.height;
        
        if (overflowX || overflowY) {
          return false;
        }
      }
      
      const overflowStyle = await value.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          overflow: style.overflow,
          textOverflow: style.textOverflow
        };
      });
      
      const scrollWidth = await value.evaluate(el => el.scrollWidth);
      const clientWidth = await value.evaluate(el => el.clientWidth);
      
      if (scrollWidth > clientWidth && overflowStyle.textOverflow !== 'ellipsis') {
        return false;
      }
    }
    return true;
  }

  async verifyTotalValueCalculation() {
    const values = await this.itemValue.all();
    let calculatedSum = 0;
    
    for (const value of values) {
      const text = await value.textContent();
      const numericValue = parseFloat(text.replace(/[$,]/g, ''));
      if (!isNaN(numericValue)) {
        calculatedSum += numericValue;
      }
    }
    
    const displayedTotal = await this.totalCalculatedValue.textContent();
    const displayedNumeric = parseFloat(displayedTotal.replace(/[$,]/g, ''));
    
    const tolerance = 0.01;
    return Math.abs(calculatedSum - displayedNumeric) <= tolerance;
  }

  async closeBreakdownPopup() {
    await this.closePopupButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ContractValuePage;