class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.dropdownButton = '[data-testid="contract-breakdown-button"]';
    this.breakdownPopup = '[data-testid="contract-breakdown-popup"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    this.closeButton = '[data-testid="breakdown-close-button"]';
    
    this.dropdownButtonAlt = '#btn-contract-breakdown';
    this.breakdownPopupAlt = '#contract-breakdown-modal';
    this.closeButtonAlt = '#btn-close-breakdown';
  }

  async navigateToContractView() {
    await this.page.goto('/acticenter/contratos');
  }

  async waitForComponentToLoad() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async locateContractValueComponent() {
    return await this.page.locator(this.contractValueComponent);
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async hasDropdownButtonAriaLabel() {
    const ariaLabel = await this.page.locator(this.dropdownButton).getAttribute('aria-label');
    return ariaLabel !== null && ariaLabel.trim().length > 0;
  }

  async hasDropdownButtonAriaLabelledBy() {
    const ariaLabelledBy = await this.page.locator(this.dropdownButton).getAttribute('aria-labelledby');
    return ariaLabelledBy !== null && ariaLabelledBy.trim().length > 0;
  }

  async getDropdownButtonAriaLabel() {
    return await this.page.locator(this.dropdownButton).getAttribute('aria-label');
  }

  async openBreakdownPopup() {
    await this.page.locator(this.dropdownButton).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async hasPopupDialogRole() {
    const role = await this.page.locator(this.breakdownPopup).getAttribute('role');
    return role === 'dialog';
  }

  async hasPopupAriaModalTrue() {
    const ariaModal = await this.page.locator(this.breakdownPopup).getAttribute('aria-modal');
    return ariaModal === 'true';
  }

  async allBreakdownItemsHaveAriaDescribedBy() {
    const items = await this.page.locator(this.breakdownItems).all();
    
    if (items.length === 0) {
      return false;
    }
    
    for (const item of items) {
      const ariaDescribedBy = await item.getAttribute('aria-describedby');
      if (ariaDescribedBy === null || ariaDescribedBy.trim().length === 0) {
        return false;
      }
    }
    
    return true;
  }

  async hasCloseButtonAriaLabel() {
    const ariaLabel = await this.page.locator(this.closeButton).getAttribute('aria-label');
    return ariaLabel !== null && ariaLabel.trim().length > 0;
  }

  async getCloseButtonAriaLabel() {
    return await this.page.locator(this.closeButton).getAttribute('aria-label');
  }

  async closeBreakdownPopup() {
    await this.page.locator(this.closeButton).click();
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }
}

module.exports = ContractValuePage;