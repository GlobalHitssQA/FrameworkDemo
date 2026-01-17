const { expect } = require('@playwright/test');

class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Main application locators
    this.appContainer = page.locator('[data-testid="acticenter-app"]');
    this.mainContent = page.locator('[data-testid="main-content"]');
    
    // Contract search and selection locators
    this.searchIcon = page.locator('[data-testid="search-client-contract"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractList = page.locator('[data-testid="contract-list"]');
    this.contractItem = page.locator('[data-testid="contract-item"]');
    
    // Contract value component locators
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.totalContractValue = page.locator('[data-testid="total-contract-value"]');
    
    // Breakdown popup locators
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    this.breakdownCloseButton = page.locator('[data-testid="breakdown-close-button"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
    
    // Breakdown items locators
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.pendingSettlement = page.locator('[data-testid="pending-settlement"]');
    this.funds = page.locator('[data-testid="funds"]');
    this.cedesAndPromissoryNotes = page.locator('[data-testid="cedes-promissory-notes"]');
    this.moneyMarket = page.locator('[data-testid="money-market"]');
    this.capitalMarket = page.locator('[data-testid="capital-market"]');
    
    // Monetary value elements
    this.monetaryValues = page.locator('[data-testid="monetary-value"]');
    
    // Distribution tooltip
    this.distributionTooltip = page.locator('[data-testid="distribution-tooltip"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyApplicationLoaded() {
    await expect(this.appContainer).toBeVisible({ timeout: 10000 });
    await expect(this.mainContent).toBeVisible();
  }

  async selectRegisteredContract() {
    await this.searchIcon.click();
    await this.contractSearchInput.waitFor({ state: 'visible' });
    await this.contractItem.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible();
  }

  async clickContractValueComponent() {
    await this.contractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async verifyAllBreakdownItemsDisplayed() {
    const items = [
      this.purchasingPowerMXN,
      this.cashMXN,
      this.cashUSD,
      this.pendingSettlement,
      this.funds,
      this.cedesAndPromissoryNotes,
      this.moneyMarket,
      this.capitalMarket
    ];
    
    for (const item of items) {
      if (!(await item.isVisible())) {
        return false;
      }
    }
    return true;
  }

  async verifyElementsAlignment() {
    const breakdownBox = await this.breakdownItemsList.boundingBox();
    if (!breakdownBox) return false;
    
    const items = await this.breakdownItemsList.locator('[data-testid*="-"]').all();
    
    for (const item of items) {
      const itemBox = await item.boundingBox();
      if (!itemBox) continue;
      
      const isWithinContainer = itemBox.x >= breakdownBox.x && 
                                 itemBox.x + itemBox.width <= breakdownBox.x + breakdownBox.width;
      if (!isWithinContainer) return false;
    }
    
    return true;
  }

  async verifyMonetaryValuesFormatting() {
    const monetaryElements = await this.monetaryValues.all();
    
    for (const element of monetaryElements) {
      const text = await element.textContent();
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          textAlign: computed.textAlign
        };
      });
      
      const hasMonetaryFormat = /^\$?[\d,]+(\.\d{2})?\s?(MXN|USD)?$/.test(text.trim());
      const isRightAligned = styles.textAlign === 'right' || styles.textAlign === 'end';
      
      if (!hasMonetaryFormat || !isRightAligned) {
        return false;
      }
    }
    
    return true;
  }

  async closeBreakdownPopup() {
    await this.breakdownCloseButton.click();
    await this.breakdownPopup.waitFor({ state: 'hidden' });
  }
}

module.exports = ContractValuePage;