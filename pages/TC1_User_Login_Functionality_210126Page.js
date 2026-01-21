class LoginPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://example.com';
    
    // Locators using best practices priority: data-testid > id > CSS
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.welcomeMessage = '[data-testid="welcome-message"]';
    this.dashboardContainer = '[data-testid="dashboard-container"]';
  }

  async navigate() {
    await this.page.goto(`${this.baseUrl}/login`);
    await this.page.waitForLoadState('networkidle');
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

  async waitForDashboard() {
    await this.page.waitForSelector(this.dashboardContainer, { state: 'visible' });
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async isWelcomeMessageVisible() {
    return await this.page.isVisible(this.welcomeMessage);
  }

  async getWelcomeMessageText() {
    return await this.page.textContent(this.welcomeMessage);
  }
};

module.exports = LoginPage;