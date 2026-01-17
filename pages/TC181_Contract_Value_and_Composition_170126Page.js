class ContractComponentPage {
  constructor(page) {
    this.page = page;
    
    // Login locators
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.userProfileIcon = page.locator('[data-testid="user-profile-icon"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');
    
    // Navigation locators
    this.fundsOperationMenu = page.locator('[data-testid="funds-operation-menu"]');
    this.contractSearchInput = page.locator('[data-testid="contract-search-input"]');
    this.contractSearchButton = page.locator('[data-testid="contract-search-button"]');
    this.contractListItem = page.locator('[data-testid="contract-list-item"]').first();
    
    // Contract value component locators
    this.contractValueComponent = page.locator('[data-testid="contract-value-component"]');
    this.contractCompositionPopup = page.locator('[data-testid="contract-composition-popup"]');
    this.accessRestrictionMessage = page.locator('[data-testid="access-restriction-message"]');
    
    // Test credentials
    this.authorizedUserCredentials = {
      username: 'AUTHORIZED_USER',
      password: 'AUTHORIZED_PASSWORD'
    };
    this.unauthorizedUserCredentials = {
      username: 'UNAUTHORIZED_USER',
      password: 'UNAUTHORIZED_PASSWORD'
    };
  }

  async navigateToLoginPage() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithAuthorizedUser() {
    await this.usernameInput.fill(this.authorizedUserCredentials.username);
    await this.passwordInput.fill(this.authorizedUserCredentials.password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async loginWithUnauthorizedUser() {
    await this.usernameInput.fill(this.unauthorizedUserCredentials.username);
    await this.passwordInput.fill(this.unauthorizedUserCredentials.password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    return await this.userProfileIcon.isVisible();
  }

  async navigateToFundsOperationFlow() {
    await this.fundsOperationMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectValidContract() {
    await this.contractSearchButton.click();
    await this.contractListItem.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.contractValueComponent.isVisible();
  }

  async logout() {
    await this.userProfileIcon.click();
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isComponentHiddenOrRestricted() {
    const isComponentHidden = !(await this.contractValueComponent.isVisible());
    const isRestrictionMessageVisible = await this.accessRestrictionMessage.isVisible();
    return isComponentHidden || isRestrictionMessageVisible;
  }
}

module.exports = ContractComponentPage;