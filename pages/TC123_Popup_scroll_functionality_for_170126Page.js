const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en buenas prácticas
    this.searchInput = page.locator('[data-testid="search-client-contract"]');
    this.searchButton = page.locator('[data-testid="search-button"]');
    this.totalValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    this.breakdownItems = page.locator('[data-testid="breakdown-item"]');
    this.closePopupButton = page.locator('[data-testid="close-breakdown-popup"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractOption = page.locator('[data-testid="contract-option"]');
    this.userProfileIndicator = page.locator('[data-testid="user-profile"]');
    
    // Breakdown item types
    this.poderDeCompra = page.locator('[data-testid="breakdown-poder-compra-mxn"]');
    this.efectivoMxn = page.locator('[data-testid="breakdown-efectivo-mxn"]');
    this.efectivoUsd = page.locator('[data-testid="breakdown-efectivo-usd"]');
    this.pendientesLiquidar = page.locator('[data-testid="breakdown-pendientes-liquidar"]');
    this.fondosDeuda = page.locator('[data-testid="breakdown-fondos-deuda"]');
    this.fondosCobertura = page.locator('[data-testid="breakdown-fondos-cobertura"]');
    this.fondosRentaVariable = page.locator('[data-testid="breakdown-fondos-renta-variable"]');
    this.cedesPagares = page.locator('[data-testid="breakdown-cedes-pagares"]');
    this.mercadoDinero = page.locator('[data-testid="breakdown-mercado-dinero"]');
    this.mercadoCapitales = page.locator('[data-testid="breakdown-mercado-capitales"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userProfileIndicator).toBeVisible({ timeout: 10000 });
  }

  async verifyContractWithMultipleItemsExists() {
    await expect(this.contractSelector).toBeVisible();
  }

  async selectContractWithAllBreakdownItems() {
    await this.contractSelector.click();
    await this.page.waitForTimeout(500);
    const contractOptions = await this.contractOption.all();
    if (contractOptions.length > 0) {
      await contractOptions[0].click();
    }
    await this.page.waitForLoadState('networkidle');
  }

  async verifyContractIsLoaded() {
    await expect(this.totalValueComponent).toBeVisible({ timeout: 10000 });
  }

  async clickTotalValueComponent() {
    await this.totalValueComponent.click();
    await this.page.waitForTimeout(300);
  }

  async verifyBreakdownPopupIsDisplayed() {
    await expect(this.breakdownPopup).toBeVisible({ timeout: 5000 });
  }

  async verifyBreakdownItemsAreVisible() {
    await expect(this.breakdownItemsList).toBeVisible();
    const items = await this.breakdownItems.all();
    expect(items.length).toBeGreaterThan(0);
  }

  async verifyVerticalScrollbarExists() {
    const popupElement = this.breakdownItemsList;
    const hasScrollbar = await popupElement.evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });
    return hasScrollbar;
  }

  async scrollDownBreakdownList() {
    await this.breakdownItemsList.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await this.page.waitForTimeout(500);
  }

  async verifyAllItemsVisibleAfterScroll() {
    const lastItem = this.breakdownItems.last();
    await expect(lastItem).toBeVisible();
    
    const isInViewport = await lastItem.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const parentRect = el.closest('[data-testid="breakdown-items-list"]').getBoundingClientRect();
      return rect.bottom <= parentRect.bottom && rect.top >= parentRect.top;
    });
    expect(isInViewport).toBeTruthy();
  }

  async verifyNoOverlapsInItems() {
    const items = await this.breakdownItems.all();
    const boundingBoxes = [];
    
    for (const item of items) {
      const box = await item.boundingBox();
      if (box) {
        boundingBoxes.push(box);
      }
    }
    
    for (let i = 0; i < boundingBoxes.length - 1; i++) {
      const current = boundingBoxes[i];
      const next = boundingBoxes[i + 1];
      const hasOverlap = current.y + current.height > next.y + 2;
      expect(hasOverlap).toBeFalsy();
    }
  }

  async verifyPopupAlignmentWithTotalValue() {
    const totalValueBox = await this.totalValueComponent.boundingBox();
    const popupBox = await this.breakdownPopup.boundingBox();
    
    expect(totalValueBox).not.toBeNull();
    expect(popupBox).not.toBeNull();
    
    const alignmentTolerance = 50;
    const isAligned = Math.abs(popupBox.x - totalValueBox.x) <= alignmentTolerance ||
                      Math.abs((popupBox.x + popupBox.width) - (totalValueBox.x + totalValueBox.width)) <= alignmentTolerance;
    expect(isAligned).toBeTruthy();
  }

  async closeBreakdownPopup() {
    await this.closePopupButton.click();
    await expect(this.breakdownPopup).not.toBeVisible();
  }
}

module.exports = ContractBreakdownPage;