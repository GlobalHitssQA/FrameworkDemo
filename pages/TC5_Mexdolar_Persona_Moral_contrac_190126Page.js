class MexdolarContractPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="login-username"]');
    this.passwordInput = page.locator('[data-testid="login-password"]');
    this.loginButton = page.locator('[data-testid="login-submit-btn"]');
    this.userProfileIcon = page.locator('[data-testid="user-profile-icon"]');
    
    this.searchIcon = page.locator('[data-testid="search-client-contract-icon"]');
    this.searchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractTypeFilter = page.locator('[data-testid="contract-type-filter"]');
    this.mexdolarPmOption = page.locator('[data-testid="filter-option-mexdolar-pm"]');
    this.contractResultItem = page.locator('[data-testid="contract-result-item-mexdolar"]');
    
    this.contractContainer = page.locator('[data-testid="contract-detail-container"]');
    this.valueCompositionComponent = page.locator('[data-testid="value-composition-component"]');
    this.breakdownPopup = page.locator('[data-testid="breakdown-popup"]');
    
    this.cashFieldLabel = page.locator('[data-testid="cash-field-label"]');
    this.cashFieldValue = page.locator('[data-testid="cash-field-value-usd"]');
    this.effectivoUsdSection = page.locator('[data-testid="efectivo-usd-section"]');
    
    this.viewOnlyBadge = page.locator('[data-testid="view-only-badge"]');
    this.viewOnlyMessage = page.locator('[data-testid="view-only-message"]');
    this.operationButtonsContainer = page.locator('[data-testid="operation-buttons-container"]');
    
    this.buySellIcon = page.locator('[data-testid="buy-sell-icon"]');
    this.buySellButton = page.locator('[data-testid="buy-sell-button"]');
    this.operationMenu = page.locator('[data-testid="operation-menu"]');
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithMexdolarAccess() {
    const username = process.env.MEXDOLAR_USER || 'test_mexdolar_user';
    const password = process.env.MEXDOLAR_PASSWORD || 'test_password';
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.userProfileIcon.isVisible();
  }

  async openContractSearch() {
    await this.searchIcon.click();
    await this.searchInput.waitFor({ state: 'visible' });
  }

  async searchMexdolarPersonaMoralContract() {
    await this.contractTypeFilter.click();
    await this.mexdolarPmOption.click();
    await this.searchInput.fill('Persona Moral Mexdolar');
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async selectMexdolarContract() {
    await this.contractResultItem.first().click();
    await this.contractContainer.waitFor({ state: 'visible' });
  }

  async isContractDisplayed() {
    return await this.contractContainer.isVisible();
  }

  async clickValueCompositionComponent() {
    await this.valueCompositionComponent.click();
    await this.breakdownPopup.waitFor({ state: 'visible' });
  }

  async isBreakdownPopupVisible() {
    return await this.breakdownPopup.isVisible();
  }

  async getCashFieldLabel() {
    return await this.cashFieldLabel.textContent();
  }

  async verifyCashDisplayedInUSD() {
    const isUsdSectionVisible = await this.effectivoUsdSection.isVisible();
    const valueText = await this.cashFieldValue.textContent();
    const hasUsdFormat = valueText.includes('USD') || valueText.includes('$');
    const hasNoMxnIndicator = !valueText.includes('MXN') && !valueText.includes('pesos');
    return isUsdSectionVisible && hasUsdFormat && hasNoMxnIndicator;
  }

  async isContractInViewOnlyMode() {
    const hasViewOnlyBadge = await this.viewOnlyBadge.isVisible();
    const hasViewOnlyMessage = await this.viewOnlyMessage.isVisible();
    return hasViewOnlyBadge || hasViewOnlyMessage;
  }

  async hasNoOperationOptions() {
    const operationsContainer = await this.operationButtonsContainer.count();
    if (operationsContainer === 0) return true;
    const isHidden = await this.operationButtonsContainer.isHidden();
    return isHidden;
  }

  async isBuySellIconDisabled() {
    const isDisabled = await this.buySellIcon.isDisabled();
    const hasDisabledClass = await this.buySellIcon.evaluate(el => 
      el.classList.contains('disabled') || el.getAttribute('aria-disabled') === 'true'
    );
    return isDisabled || hasDisabledClass;
  }

  async verifyBuySellNotClickable() {
    try {
      await this.buySellButton.click({ timeout: 1000 });
      const isMenuVisible = await this.operationMenu.isVisible({ timeout: 500 });
      return !isMenuVisible;
    } catch (error) {
      return true;
    }
  }

  async hasViewOnlyIndicator() {
    const hasBadge = await this.viewOnlyBadge.isVisible();
    const hasMessage = await this.viewOnlyMessage.isVisible();
    return hasBadge || hasMessage;
  }

  async getViewOnlyMessage() {
    if (await this.viewOnlyMessage.isVisible()) {
      return await this.viewOnlyMessage.textContent();
    }
    if (await this.viewOnlyBadge.isVisible()) {
      return await this.viewOnlyBadge.textContent();
    }
    return null;
  }
}

module.exports = MexdolarContractPage;