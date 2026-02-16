class ParameterConfigPage {
  constructor(page) {
    this.page = page;
    this.moduleDropdown = '[data-testid="module-dropdown"]';
    this.createParameterButton = '[data-testid="create-parameter-button"]';
    this.newParameterModal = '[data-testid="new-parameter-modal"]';
    this.commissionTypeInput = '[data-testid="commission-type-input"]';
    this.chargeTypeDropdown = '[data-testid="charge-type-dropdown"]';
    this.valueInput = '[data-testid="parameter-value-input"]';
    this.commissionStartDatePicker = '[data-testid="commission-start-date"]';
    this.acceptButton = '[data-testid="accept-button"]';
    this.cancelButton = '[data-testid="cancel-button"]';
    this.closeModalButton = '[data-testid="close-modal-button"]';
    this.successModal = '[data-testid="success-modal"]';
    this.successModalMessage = '[data-testid="success-modal-message"]';
    this.errorModal = '[data-testid="error-modal"]';
    this.confirmationModal = '[data-testid="confirmation-modal"]';
    this.continueEditingButton = '[data-testid="continue-editing-button"]';
    this.abandonButton = '[data-testid="abandon-button"]';
    this.parametersTable = '[data-testid="commission-parameters-table"]';
    this.parameterToggle = '[data-testid="parameter-toggle"]';
    this.editParameterButton = '[data-testid="edit-parameter-button"]';
    this.createCommissionTypeButton = '[data-testid="create-commission-type-button"]';
    this.duplicateNameError = '[data-testid="duplicate-name-error"]';
  }

  async navigateToParameterConfig() {
    await this.page.goto('/productos/parametros');
    await this.page.waitForLoadState('networkidle');
  }

  async selectModule() {
    await this.page.click(this.moduleDropdown);
    await this.page.click('[data-testid="module-option"]:first-child');
  }

  async clickCreateParameterButton() {
    await this.page.click(this.createParameterButton);
  }

  async isNewParameterModalVisible() {
    return await this.page.isVisible(this.newParameterModal);
  }

  async fillCommissionType(commissionType) {
    await this.page.fill(this.commissionTypeInput, commissionType);
  }

  async selectChargeType(chargeType) {
    await this.page.click(this.chargeTypeDropdown);
    await this.page.click(`[data-testid="charge-type-option-${chargeType.toLowerCase()}"]`);
  }

  async fillValue(value) {
    await this.page.fill(this.valueInput, value);
  }

  async selectCommissionStartDate() {
    await this.page.click(this.commissionStartDatePicker);
    await this.page.click('[data-testid="calendar-today"]');
  }

  async clickAcceptButton() {
    await this.page.click(this.acceptButton);
  }

  async getSuccessModalMessage() {
    await this.page.waitForSelector(this.successModal);
    return await this.page.textContent(this.successModalMessage);
  }

  async isParameterInTable() {
    return await this.page.isVisible(`${this.parametersTable} tbody tr`);
  }

  async clickCloseModalButton() {
    await this.page.click(this.closeModalButton);
  }

  async isConfirmationModalVisible() {
    return await this.page.isVisible(this.confirmationModal);
  }

  async clickContinueEditing() {
    await this.page.click(this.continueEditingButton);
  }

  async clickAbandon() {
    await this.page.click(this.abandonButton);
  }

  async toggleParameter(index) {
    await this.page.click(`${this.parameterToggle}:nth-child(${index})`);
  }

  async clickEditParameter(index) {
    await this.page.click(`${this.editParameterButton}:nth-child(${index})`);
  }

  async isDuplicateNameErrorVisible() {
    return await this.page.isVisible(this.duplicateNameError);
  }

  async isAcceptButtonEnabled() {
    return await this.page.isEnabled(this.acceptButton);
  }
}

module.exports = ParameterConfigPage;