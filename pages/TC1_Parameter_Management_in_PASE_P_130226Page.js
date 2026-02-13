class ParameterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://pase.example.com';
    
    // Locators
    this.moduleDropdown = '[data-testid="module-dropdown"]';
    this.createParameterButton = '[data-testid="create-parameter-button"]';
    this.newParameterModal = '[data-testid="new-parameter-modal"]';
    this.commissionTypeSelect = '[data-testid="commission-type-select"]';
    this.chargeTypeSelect = '[data-testid="charge-type-select"]';
    this.parameterValueInput = '[data-testid="parameter-value-input"]';
    this.commissionStartDatePicker = '[data-testid="commission-start-date"]';
    this.acceptButton = '[data-testid="accept-button"]';
    this.cancelButton = '[data-testid="cancel-button"]';
    this.closeModalButton = '[data-testid="close-modal-button"]';
    this.parametersTable = '[data-testid="commission-parameters-table"]';
    this.successMessage = '[data-testid="success-message"]';
    this.errorMessage = '[data-testid="error-message"]';
    this.editButton = '[data-testid="edit-parameter-button"]';
    this.activateButton = '[data-testid="activate-parameter-button"]';
    this.deactivateButton = '[data-testid="deactivate-parameter-button"]';
    this.confirmationModal = '[data-testid="confirmation-modal"]';
    this.continueEditingButton = '[data-testid="continue-editing-button"]';
    this.abandonButton = '[data-testid="abandon-button"]';
    this.createCommissionTypeButton = '[data-testid="create-commission-type-button"]';
  }

  async navigateToLogin() {
    await this.page.goto(`${this.baseUrl}/login`);
  }

  async login() {
    const usernameInput = '[data-testid="username-input"]';
    const passwordInput = '[data-testid="password-input"]';
    const loginButton = '[data-testid="login-button"]';
    
    await this.page.fill(usernameInput, process.env.TEST_USERNAME || 'testuser');
    await this.page.fill(passwordInput, process.env.TEST_PASSWORD || 'testpass');
    await this.page.click(loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToProductConfiguration() {
    await this.page.goto(`${this.baseUrl}/product-configuration`);
    await this.page.waitForLoadState('networkidle');
  }

  async selectModule() {
    await this.page.click(this.moduleDropdown);
    const firstOption = `${this.moduleDropdown} option:first-child`;
    await this.page.selectOption(this.moduleDropdown, { index: 1 });
  }

  async clickCreateParameterButton() {
    await this.page.click(this.createParameterButton);
    await this.page.waitForSelector(this.newParameterModal, { state: 'visible' });
  }

  async isNewParameterModalVisible() {
    return await this.page.isVisible(this.newParameterModal);
  }

  async selectCommissionType() {
    await this.page.click(this.commissionTypeSelect);
    await this.page.selectOption(this.commissionTypeSelect, { index: 1 });
  }

  async selectChargeType() {
    await this.page.click(this.chargeTypeSelect);
    await this.page.selectOption(this.chargeTypeSelect, { index: 1 });
  }

  async enterParameterValue(value) {
    await this.page.fill(this.parameterValueInput, value);
  }

  async selectCommissionStartDate() {
    await this.page.click(this.commissionStartDatePicker);
    const todayButton = '[data-testid="calendar-today"]';
    await this.page.click(todayButton);
  }

  async clickAcceptButton() {
    await this.page.click(this.acceptButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isParameterInTable() {
    await this.page.waitForSelector(this.parametersTable, { state: 'visible' });
    const tableRows = await this.page.locator(`${this.parametersTable} tbody tr`).count();
    return tableRows > 0;
  }

  async isSuccessMessageVisible() {
    return await this.page.isVisible(this.successMessage);
  }

  async clickEditButton(rowIndex = 0) {
    const editButtons = this.page.locator(this.editButton);
    await editButtons.nth(rowIndex).click();
  }

  async clickActivateButton(rowIndex = 0) {
    const activateButtons = this.page.locator(this.activateButton);
    await activateButtons.nth(rowIndex).click();
  }

  async clickDeactivateButton(rowIndex = 0) {
    const deactivateButtons = this.page.locator(this.deactivateButton);
    await deactivateButtons.nth(rowIndex).click();
  }

  async isConfirmationModalVisible() {
    return await this.page.isVisible(this.confirmationModal);
  }

  async clickCloseModalButton() {
    await this.page.click(this.closeModalButton);
  }

  async clickContinueEditingButton() {
    await this.page.click(this.continueEditingButton);
  }

  async clickAbandonButton() {
    await this.page.click(this.abandonButton);
  }

  async isErrorMessageVisible() {
    return await this.page.isVisible(this.errorMessage);
  }

  async getErrorMessageText() {
    return await this.page.textContent(this.errorMessage);
  }

  async clickCreateCommissionTypeButton() {
    await this.page.click(this.createCommissionTypeButton);
  }
};

module.exports = ParameterPage;