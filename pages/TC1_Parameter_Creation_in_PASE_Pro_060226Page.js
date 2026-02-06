class ParameterPage {
  constructor(page) {
    this.page = page;
    this.moduleDropdown = page.locator('[data-testid="module-dropdown"]');
    this.createParameterButton = page.locator('[data-testid="create-parameter-button"]');
    this.newParameterModal = page.locator('[data-testid="new-parameter-modal"]');
    this.addCommissionTypeButton = page.locator('[data-testid="add-commission-type-button"]');
    this.commissionTypeInput = page.locator('[data-testid="commission-type-input"]');
    this.chargeTypeDropdown = page.locator('[data-testid="charge-type-dropdown"]');
    this.valueInput = page.locator('[data-testid="value-input"]');
    this.commissionStartDatePicker = page.locator('[data-testid="commission-start-date"]');
    this.acceptButton = page.locator('[data-testid="accept-button"]');
    this.closeModalButton = page.locator('[data-testid="close-modal-button"]');
    this.successModal = page.locator('[data-testid="success-modal"]');
    this.successModalMessage = page.locator('[data-testid="success-modal-message"]');
    this.errorModal = page.locator('[data-testid="error-modal"]');
    this.confirmEditModal = page.locator('[data-testid="confirm-edit-modal"]');
    this.continueEditingButton = page.locator('[data-testid="continue-editing-button"]');
    this.abandonButton = page.locator('[data-testid="abandon-button"]');
    this.parameterToggle = page.locator('[data-testid="parameter-toggle"]');
    this.editButton = page.locator('[data-testid="edit-button"]');
    this.errorMessageNameExists = page.locator('[data-testid="error-name-exists"]');
  }

  async navigateToProductConfiguration() {
    await this.page.goto('/product-configuration');
    await this.page.waitForLoadState('networkidle');
  }

  async selectModule() {
    await this.moduleDropdown.click();
    await this.page.locator('[data-testid="module-option"]').first().click();
  }

  async clickCreateParameterButton() {
    await this.createParameterButton.click();
  }

  async isNewParameterModalVisible() {
    return await this.newParameterModal.isVisible();
  }

  async clickAddCommissionTypeButton() {
    await this.addCommissionTypeButton.click();
  }

  async fillCommissionType(commissionType) {
    await this.commissionTypeInput.fill(commissionType);
  }

  async selectChargeType(chargeType) {
    await this.chargeTypeDropdown.click();
    await this.page.locator(`[data-testid="charge-type-option-${chargeType.toLowerCase()}"]`).click();
  }

  async fillValue(value) {
    await this.valueInput.fill(value);
  }

  async selectCommissionStartDate() {
    await this.commissionStartDatePicker.click();
    await this.page.locator('[data-testid="calendar-today"]').click();
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
  }

  async isSuccessModalVisible() {
    return await this.successModal.isVisible();
  }

  async getSuccessModalMessage() {
    return await this.successModalMessage.textContent();
  }

  async clickCloseModalButton() {
    await this.closeModalButton.click();
  }

  async toggleParameter() {
    await this.parameterToggle.click();
  }

  async clickEditButton() {
    await this.editButton.click();
  }

  async isErrorNameExistsVisible() {
    return await this.errorMessageNameExists.isVisible();
  }

  async clickContinueEditing() {
    await this.continueEditingButton.click();
  }

  async clickAbandon() {
    await this.abandonButton.click();
  }
}

module.exports = ParameterPage;