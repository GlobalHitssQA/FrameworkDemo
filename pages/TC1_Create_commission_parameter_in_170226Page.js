const { expect } = require('@playwright/test');

class CommissionParameterPage {
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('[data-testid="username-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    
    this.paymentsModuleLink = page.locator('[data-testid="payments-module-link"]');
    this.moduleDropdown = page.locator('[data-testid="module-dropdown"]');
    this.moduleDropdownOption = page.locator('[data-testid="module-dropdown-option"]').first();
    
    this.productConfigurationStep1 = page.locator('[data-testid="product-configuration-step-1"]');
    this.commissionParametersSection = page.locator('[data-testid="commission-parameters-section"]');
    this.commissionParametersTable = page.locator('[data-testid="commission-parameters-table"]');
    this.createParameterButton = page.locator('[data-testid="create-parameter-button"]');
    
    this.newParameterModal = page.locator('[data-testid="new-parameter-modal"]');
    this.newParameterModalTitle = page.locator('[data-testid="new-parameter-modal-title"]');
    
    this.commissionTypeDropdown = page.locator('[data-testid="commission-type-dropdown"]');
    this.commissionTypeOption = page.locator('[data-testid="commission-type-option"]').first();
    this.chargeTypeDropdown = page.locator('[data-testid="charge-type-dropdown"]');
    this.chargeTypeOption = page.locator('[data-testid="charge-type-option"]').first();
    this.valueInput = page.locator('[data-testid="value-input"]');
    this.commissionStartDateInput = page.locator('[data-testid="commission-start-date-input"]');
    this.calendarPicker = page.locator('[data-testid="calendar-picker"]');
    this.calendarDateOption = page.locator('[data-testid="calendar-date-option"]:not([disabled])').first();
    
    this.acceptButton = page.locator('[data-testid="accept-button"]');
    this.cancelButton = page.locator('[data-testid="cancel-button"]');
    
    this.parameterTableRow = page.locator('[data-testid="parameter-table-row"]');
  }

  async loginAsAdministrator() {
    await this.usernameInput.fill('admin_user');
    await this.passwordInput.fill('admin_password');
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToPaymentsModule() {
    await this.paymentsModuleLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectModuleFromDropdown() {
    await this.moduleDropdown.click();
    await this.moduleDropdownOption.click();
  }

  async accessProductConfigurationStep1() {
    await this.productConfigurationStep1.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isCommissionParametersSectionVisible() {
    return await this.commissionParametersSection.isVisible();
  }

  async hasOnlyCreateParameterButton() {
    const tableVisible = await this.commissionParametersTable.isVisible();
    const buttonVisible = await this.createParameterButton.isVisible();
    return !tableVisible && buttonVisible;
  }

  async clickCreateParameterButton() {
    await this.createParameterButton.click();
  }

  async isNewParameterModalVisible() {
    return await this.newParameterModal.isVisible();
  }

  async modalHasAllRequiredFields() {
    const commissionTypeVisible = await this.commissionTypeDropdown.isVisible();
    const chargeTypeVisible = await this.chargeTypeDropdown.isVisible();
    const valueVisible = await this.valueInput.isVisible();
    const startDateVisible = await this.commissionStartDateInput.isVisible();
    return commissionTypeVisible && chargeTypeVisible && valueVisible && startDateVisible;
  }

  async selectCommissionType() {
    await this.commissionTypeDropdown.click();
    await this.commissionTypeOption.click();
  }

  async isCommissionTypeSelected() {
    const value = await this.commissionTypeDropdown.inputValue().catch(() => null);
    const text = await this.commissionTypeDropdown.textContent();
    return value !== '' || text !== '';
  }

  async selectChargeType() {
    await this.chargeTypeDropdown.click();
    await this.chargeTypeOption.click();
  }

  async isChargeTypeSelected() {
    const value = await this.chargeTypeDropdown.inputValue().catch(() => null);
    const text = await this.chargeTypeDropdown.textContent();
    return value !== '' || text !== '';
  }

  async enterValue(value) {
    await this.valueInput.clear();
    await this.valueInput.fill(value);
  }

  async hasValueEntered() {
    const value = await this.valueInput.inputValue();
    return value !== '';
  }

  async selectCommissionStartDate() {
    await this.commissionStartDateInput.click();
    await this.calendarPicker.waitFor({ state: 'visible' });
    await this.calendarDateOption.click();
  }

  async isStartDateSelected() {
    const value = await this.commissionStartDateInput.inputValue();
    return value !== '';
  }

  async isAcceptButtonEnabled() {
    return await this.acceptButton.isEnabled();
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async isModalClosed() {
    await this.newParameterModal.waitFor({ state: 'hidden', timeout: 5000 });
    return !(await this.newParameterModal.isVisible());
  }

  async isNewParameterInTable() {
    await this.commissionParametersTable.waitFor({ state: 'visible' });
    const rowCount = await this.parameterTableRow.count();
    return rowCount > 0;
  }
}

module.exports = CommissionParameterPage;