class ProductConfigurationPage {
  constructor(page) {
    this.page = page;
    
    // Locators
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
    this.loginButton = '[data-testid="login-button"]';
    this.mainMenu = '[data-testid="main-menu"]';
    this.paymentsModuleLink = '[data-testid="payments-module-link"]';
    this.productConfigurationLink = '[data-testid="product-configuration-link"]';
    this.moduleDropdown = '[data-testid="module-dropdown"]';
    this.moduleDropdownOptions = '[data-testid="module-dropdown-option"]';
    this.productConfigurationSection = '[data-testid="product-configuration-section"]';
    this.createParameterButton = '[data-testid="create-parameter-button"]';
    this.productConfigurationForm = '[data-testid="product-configuration-form"]';
  }

  async loginAsAdministrator() {
    await this.page.fill(this.usernameInput, 'admin_pase');
    await this.page.fill(this.passwordInput, 'admin_password');
    await this.page.click(this.loginButton);
    await this.page.waitForSelector(this.mainMenu, { state: 'visible' });
  }

  async navigateToPaymentsModule() {
    await this.page.click(this.paymentsModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async accessProductConfigurationScreen() {
    await this.page.click(this.productConfigurationLink);
    await this.page.waitForSelector(this.moduleDropdown, { state: 'visible' });
  }

  async isModuleDropdownVisible() {
    return await this.page.isVisible(this.moduleDropdown);
  }

  async isProductConfigurationSectionDisabled() {
    const section = this.page.locator(this.productConfigurationSection);
    const isDisabled = await section.getAttribute('aria-disabled');
    const hasDisabledClass = await section.evaluate(el => 
      el.classList.contains('disabled') || el.classList.contains('is-disabled')
    );
    const pointerEvents = await section.evaluate(el => 
      window.getComputedStyle(el).pointerEvents
    );
    return isDisabled === 'true' || hasDisabledClass || pointerEvents === 'none';
  }

  async attemptProductConfigurationWithoutModule() {
    const createButton = this.page.locator(this.createParameterButton);
    if (await createButton.isVisible()) {
      await createButton.click({ force: true }).catch(() => {});
    }
  }

  async isProductConfigurationPrevented() {
    const section = this.page.locator(this.productConfigurationSection);
    const isDisabled = await this.isProductConfigurationSectionDisabled();
    const formVisible = await this.page.isVisible(this.productConfigurationForm);
    return isDisabled || !formVisible;
  }

  async selectFirstAvailableModule() {
    await this.page.click(this.moduleDropdown);
    await this.page.waitForSelector(this.moduleDropdownOptions, { state: 'visible' });
    const firstOption = this.page.locator(this.moduleDropdownOptions).first();
    await firstOption.click();
  }

  async isModuleSelected() {
    const dropdown = this.page.locator(this.moduleDropdown);
    const selectedValue = await dropdown.inputValue().catch(() => null) ||
                          await dropdown.textContent();
    return selectedValue !== null && selectedValue.trim() !== '' && selectedValue !== 'Seleccionar módulo';
  }

  async isProductConfigurationSectionEnabled() {
    const section = this.page.locator(this.productConfigurationSection);
    const isDisabled = await section.getAttribute('aria-disabled');
    const hasDisabledClass = await section.evaluate(el => 
      el.classList.contains('disabled') || el.classList.contains('is-disabled')
    );
    const pointerEvents = await section.evaluate(el => 
      window.getComputedStyle(el).pointerEvents
    );
    return isDisabled !== 'true' && !hasDisabledClass && pointerEvents !== 'none';
  }
}

module.exports = ProductConfigurationPage;