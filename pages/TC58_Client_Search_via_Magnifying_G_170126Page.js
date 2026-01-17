const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.mainDashboard = page.locator('[data-testid="main-dashboard"]');
  }

  async navigate() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.mainDashboard).toBeVisible({ timeout: 10000 });
  }
}

class ClientSearchPage {
  constructor(page) {
    this.page = page;
    this.magnifyingGlassIcon = page.locator('[data-testid="search-icon-magnifier"]');
    this.clientGeneralScreen = page.locator('[data-testid="client-general-screen"]');
    this.contractsList = page.locator('[data-testid="contracts-list"]');
    this.contractItems = page.locator('[data-testid="contract-item"]');
    this.bpList = page.locator('[data-testid="business-partners-list"]');
  }

  async clickMagnifyingGlassIcon() {
    await this.magnifyingGlassIcon.click();
    await this.clientGeneralScreen.waitFor({ state: 'visible', timeout: 5000 });
  }

  async isClientGeneralScreenVisible() {
    return await this.clientGeneralScreen.isVisible();
  }

  async hasAvailableContracts() {
    const contractsVisible = await this.contractsList.isVisible();
    const bpVisible = await this.bpList.isVisible();
    if (contractsVisible || bpVisible) {
      const contractCount = await this.contractItems.count();
      return contractCount > 0;
    }
    return false;
  }

  async areContractsSelectable() {
    const firstContract = this.contractItems.first();
    const isClickable = await firstContract.isVisible();
    if (isClickable) {
      const isEnabled = await firstContract.isEnabled();
      return isEnabled;
    }
    return false;
  }

  async selectContract(index = 0) {
    const contract = this.contractItems.nth(index);
    await contract.click();
  }
}

module.exports = { LoginPage, ClientSearchPage };