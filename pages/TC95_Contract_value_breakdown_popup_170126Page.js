const { expect } = require('@playwright/test');

class ContractValuePopupPage {
  constructor(page) {
    this.page = page;
    
    this.userAuthenticatedIndicator = page.locator('[data-testid="user-authenticated-indicator"]');
    this.contractSelector = page.locator('[data-testid="contract-selector"]');
    this.contractWithValueOption = page.locator('[data-testid="contract-option-with-value"]');
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value-component"]');
    this.breakdownPopup = page.locator('[data-testid="contract-value-breakdown-popup"]');
    this.popupTitle = page.locator('[data-testid="breakdown-popup-title"]');
    this.popupMonetaryValues = page.locator('[data-testid="breakdown-monetary-value"]');
    this.popupContainer = page.locator('[data-testid="breakdown-popup-container"]');
    this.popupHeader = page.locator('[data-testid="breakdown-popup-header"]');
    this.popupContent = page.locator('[data-testid="breakdown-popup-content"]');
    this.popupFooter = page.locator('[data-testid="breakdown-popup-footer"]');
    this.purchasingPowerMXN = page.locator('[data-testid="purchasing-power-mxn"]');
    this.cashMXN = page.locator('[data-testid="cash-mxn"]');
    this.cashUSD = page.locator('[data-testid="cash-usd"]');
    this.debtFundsList = page.locator('[data-testid="debt-funds-list"]');
    this.hedgeFundsList = page.locator('[data-testid="hedge-funds-list"]');
    this.equityFundsList = page.locator('[data-testid="equity-funds-list"]');
    this.moneyMarketSection = page.locator('[data-testid="money-market-section"]');
    this.capitalMarketSection = page.locator('[data-testid="capital-market-section"]');
    this.pendingSettlementSection = page.locator('[data-testid="pending-settlement-section"]');
  }

  async navigateToApplication() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await expect(this.userAuthenticatedIndicator).toBeVisible({ timeout: 10000 });
  }

  async selectContractWithValueData() {
    await this.contractSelector.click();
    await this.contractWithValueOption.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
    await this.page.waitForTimeout(500);
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async verifyPopupLayoutStructure() {
    const hasHeader = await this.popupHeader.isVisible();
    const hasContent = await this.popupContent.isVisible();
    return hasHeader && hasContent;
  }

  async verifyPopupTypography() {
    const titleElement = this.popupTitle;
    if (await titleElement.isVisible()) {
      const fontFamily = await titleElement.evaluate(el => window.getComputedStyle(el).fontFamily);
      const fontSize = await titleElement.evaluate(el => window.getComputedStyle(el).fontSize);
      const fontWeight = await titleElement.evaluate(el => window.getComputedStyle(el).fontWeight);
      return fontFamily !== '' && fontSize !== '' && fontWeight !== '';
    }
    return false;
  }

  async verifyPopupColorScheme() {
    const popupElement = this.breakdownPopup;
    if (await popupElement.isVisible()) {
      const backgroundColor = await popupElement.evaluate(el => window.getComputedStyle(el).backgroundColor);
      const color = await popupElement.evaluate(el => window.getComputedStyle(el).color);
      return backgroundColor !== '' && color !== '';
    }
    return false;
  }

  async verifyPopupTitleExists() {
    return await this.popupTitle.isVisible();
  }

  async verifyMonetaryValuesDisplayed() {
    const monetaryValuesCount = await this.popupMonetaryValues.count();
    return monetaryValuesCount > 0;
  }

  async verifyVisualStructureElements() {
    const hasPurchasingPower = await this.purchasingPowerMXN.isVisible().catch(() => false);
    const hasCashMXN = await this.cashMXN.isVisible().catch(() => false);
    const hasCashUSD = await this.cashUSD.isVisible().catch(() => false);
    return hasPurchasingPower || hasCashMXN || hasCashUSD;
  }

  async verifyPopupBorderRadius() {
    const popupElement = this.breakdownPopup;
    if (await popupElement.isVisible()) {
      const borderRadius = await popupElement.evaluate(el => window.getComputedStyle(el).borderRadius);
      return borderRadius !== '0px' && borderRadius !== '';
    }
    return false;
  }

  async verifyPopupBoxShadow() {
    const popupElement = this.breakdownPopup;
    if (await popupElement.isVisible()) {
      const boxShadow = await popupElement.evaluate(el => window.getComputedStyle(el).boxShadow);
      return boxShadow !== 'none' && boxShadow !== '';
    }
    return false;
  }

  async verifyPopupSpacing() {
    const popupElement = this.popupContent;
    if (await popupElement.isVisible()) {
      const padding = await popupElement.evaluate(el => window.getComputedStyle(el).padding);
      const margin = await popupElement.evaluate(el => window.getComputedStyle(el).margin);
      return padding !== '' || margin !== '';
    }
    return false;
  }

  async closePopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForTimeout(300);
  }
}

module.exports = ContractValuePopupPage;