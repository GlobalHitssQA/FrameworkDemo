const { expect } = require('@playwright/test');

class ContractValuationPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.searchIcon = page.locator('[data-testid="search-client-icon"]');
    this.searchInput = page.locator('[data-testid="search-contract-input"]');
    this.contractInfoContainer = page.locator('[data-testid="contract-info-container"]');
    this.totalContractValueComponent = page.locator('[data-testid="total-contract-value"]');
    this.breakdownPopup = page.locator('[data-testid="valuation-breakdown-popup"]');
    this.cedesAndPagaresSection = page.locator('[data-testid="breakdown-item-cedes-pagares"]');
    this.cedesAndPagaresLabel = page.locator('[data-testid="breakdown-item-cedes-pagares"] [data-testid="item-label"]');
    this.cedesAndPagaresValue = page.locator('[data-testid="breakdown-item-cedes-pagares"] [data-testid="item-value"]');
    this.breakdownItemsList = page.locator('[data-testid="breakdown-items-list"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async authenticateUser() {
    const username = process.env.ACTICENTER_USERNAME || 'test_user';
    const password = process.env.ACTICENTER_PASSWORD || 'test_password';
    
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchAndSelectContractWithCedesAndPagares() {
    const contractNumber = process.env.CONTRACT_WITH_CEDES_PAGARES || 'CONTRACT_CEDES_001';
    
    await this.searchIcon.click();
    await this.searchInput.fill(contractNumber);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async isContractInformationDisplayed() {
    return await this.contractInfoContainer.isVisible();
  }

  async clickTotalContractValueComponent() {
    await this.totalContractValueComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async isCedesAndPagaresSectionVisible() {
    return await this.cedesAndPagaresSection.isVisible();
  }

  async isCedesAndPagaresLabelAlignedLeft() {
    const labelBox = await this.cedesAndPagaresLabel.boundingBox();
    const sectionBox = await this.cedesAndPagaresSection.boundingBox();
    
    if (!labelBox || !sectionBox) return false;
    
    const labelRelativePosition = labelBox.x - sectionBox.x;
    const sectionWidth = sectionBox.width;
    
    return labelRelativePosition < sectionWidth / 2;
  }

  async isCedesAndPagaresValueAlignedRight() {
    const valueBox = await this.cedesAndPagaresValue.boundingBox();
    const sectionBox = await this.cedesAndPagaresSection.boundingBox();
    
    if (!valueBox || !sectionBox) return false;
    
    const valueRightEdge = valueBox.x + valueBox.width;
    const sectionRightEdge = sectionBox.x + sectionBox.width;
    
    return Math.abs(valueRightEdge - sectionRightEdge) < 50;
  }

  async isCedesAndPagaresSectionVerticallyAligned() {
    const allItems = await this.breakdownItemsList.locator('[data-testid^="breakdown-item-"]').all();
    
    if (allItems.length < 2) return true;
    
    const cedesBox = await this.cedesAndPagaresSection.boundingBox();
    if (!cedesBox) return false;
    
    for (const item of allItems) {
      const itemBox = await item.boundingBox();
      if (itemBox && Math.abs(itemBox.x - cedesBox.x) > 5) {
        return false;
      }
    }
    
    return true;
  }
}

module.exports = ContractValuationPage;