class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
    this.baseUrl = '/';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
  }

  async enterUsername(username) {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }

  async isDashboardVisible() {
    return await this.page.isVisible(this.dashboardContainer);
  }

  async getErrorMessage() {
    return await this.page.textContent('[data-testid="error-message"]');
  }
}

module.exports = LoginPage;