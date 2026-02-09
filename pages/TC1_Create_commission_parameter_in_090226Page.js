class ProductConfigurationPage {
  constructor(page) {
    this.page = page;
    
    this.modulesDropdown = '[data-testid="modules-dropdown"]';
    this.createParameterButton = '[data-testid="create-parameter-button"]';
    this.newParameterModal = '[data-testid="new-parameter-modal"]';
    this.modalTitle = '[data-testid="modal-title"]';
    this.commissionTypeDropdown = '[data-testid="commission-type-dropdown"]';
    this.commissionTypeOption = '[data-testid="commission-type-option"]';
    this.chargeTypeDropdown = '[data-testid="charge-type-dropdown"]';
    this.chargeTypeOption = '[data-testid="charge-type-option"]';
    this.valueField = '[data-testid="value-field"]';
    this.commissionStartDateField = '[data-testid="commission-start-date"]';
    this.calendarDatePicker = '[data-testid="calendar-date-picker"]';
    this.calendarDayAvailable = '[data-testid="calendar-day-available"]';
    this.acceptButton = '[data-testid="accept-button"]';
    this.closeModalButton = '[data-testid="close-modal-button"]';
    this.commissionParametersTable = '[data-testid="commission-parameters-table"]';
    this.commissionParametersSection = '[data-testid="commission-parameters-section"]';
    this.paymentsModuleLink = '[data-testid="payments-module-link"]';
    this.productConfigurationLink = '[data-testid="product-configuration-link"]';
  }

  async navigateToLogin() {
    await this.page.goto('/');
  }

  async loginAsAdmin() {
    await this.page.fill('[data-testid="username-input"]', 'admin');
    await this.page.fill('[data-testid="password-input"]', 'password');
    await this.page.click('[data-testid="login-button"]');
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToProductConfiguration() {
    await this.page.click(this.paymentsModuleLink);
    await this.page.click(this.productConfigurationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async selectModule() {
    await this.page.click(this.modulesDropdown);
    await this.page.click('[data-testid="module-option"]:first-child');
  }

  async navigateToCommissionParametersSection() {
    await this.page.click(this.commissionParametersSection);
    await this.page.waitForSelector(this.createParameterButton);
  }

  async isCreateParameterButtonVisible() {
    return await this.page.isVisible(this.createParameterButton);
  }

  async clickCreateParameterButton() {
    await this.page.click(this.createParameterButton);
    await this.page.waitForSelector(this.newParameterModal);
  }

  async isNewParameterModalVisible() {
    return await this.page.isVisible(this.newParameterModal);
  }

  async getModalTitle() {
    return await this.page.textContent(this.modalTitle);
  }

  async isCommissionTypeFieldVisible() {
    return await this.page.isVisible(this.commissionTypeDropdown);
  }

  async isChargeTypeFieldVisible() {
    return await this.page.isVisible(this.chargeTypeDropdown);
  }

  async isValueFieldVisible() {
    return await this.page.isVisible(this.valueField);
  }

  async isCommissionStartDateFieldVisible() {
    return await this.page.isVisible(this.commissionStartDateField);
  }

  async isAcceptButtonDisabled() {
    return await this.page.isDisabled(this.acceptButton);
  }

  async isAcceptButtonEnabled() {
    return await this.page.isEnabled(this.acceptButton);
  }

  async selectCommissionType() {
    await this.page.click(this.commissionTypeDropdown);
    await this.page.click(`${this.commissionTypeOption}:first-child`);
  }

  async hasCommissionTypeValue() {
    const value = await this.page.inputValue(this.commissionTypeDropdown);
    return value !== '';
  }

  async selectChargeType() {
    await this.page.click(this.chargeTypeDropdown);
    await this.page.click(`${this.chargeTypeOption}:first-child`);
  }

  async hasChargeTypeValue() {
    const value = await this.page.inputValue(this.chargeTypeDropdown);
    return value !== '';
  }

  async enterValue(value) {
    await this.page.fill(this.valueField, value);
  }

  async getValueFieldContent() {
    return await this.page.inputValue(this.valueField);
  }

  async selectCommissionStartDate() {
    await this.page.click(this.commissionStartDateField);
    await this.page.waitForSelector(this.calendarDatePicker);
    await this.page.click(this.calendarDayAvailable);
  }

  async hasCommissionStartDateValue() {
    const value = await this.page.inputValue(this.commissionStartDateField);
    return value !== '';
  }

  async clickAcceptButton() {
    await this.page.click(this.acceptButton);
  }

  async isModalClosed() {
    await this.page.waitForSelector(this.newParameterModal, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.newParameterModal));
  }

  async isNewParameterInTable() {
    await this.page.waitForSelector(`${this.commissionParametersTable} tbody tr`);
    const rows = await this.page.$$(`${this.commissionParametersTable} tbody tr`);
    return rows.length > 0;
  }
}

module.exports = ProductConfigurationPage;