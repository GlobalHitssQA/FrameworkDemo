class ProductManagementPage {
  constructor(page) {
    this.page = page;
    this.moduleDropdown = page.locator('[data-testid="module-dropdown"]');
    this.createParameterButton = page.locator('[data-testid="create-parameter-button"]');
    this.newParameterModal = page.locator('[data-testid="new-parameter-modal"]');
    this.commissionTypeInput = page.locator('[data-testid="commission-type-input"]');
    this.chargeTypeDropdown = page.locator('[data-testid="charge-type-dropdown"]');
    this.valueInput = page.locator('[data-testid="value-input"]');
    this.commissionStartDatePicker = page.locator('[data-testid="commission-start-date"]');
    this.acceptButton = page.locator('[data-testid="accept-button"]');
    this.closeModalButton = page.locator('[data-testid="close-modal-button"]');
    this.commissionParametersTable = page.locator('[data-testid="commission-parameters-table"]');
    this.editParameterIcon = page.locator('[data-testid="edit-parameter-icon"]');
    this.toggleActivateParameter = page.locator('[data-testid="toggle-activate-parameter"]');
    this.createCommissionTypeButton = page.locator('[data-testid="create-commission-type-button"]');
    this.continueEditingButton = page.locator('[data-testid="continue-editing-button"]');
    this.abandonButton = page.locator('[data-testid="abandon-button"]');
    this.errorMessageDuplicateName = page.locator('[data-testid="error-duplicate-name"]');
    this.connectionErrorModal = page.locator('[data-testid="connection-error-modal"]');
  }

  async navigateToProductManagement() {
    await this.page.goto('/product-management');
    await this.page.waitForLoadState('networkidle');
  }

  async selectModule() {
    await this.moduleDropdown.click();
    await this.page.locator('[data-testid="module-option"]').first().click();
  }

  async clickCreateParameterButton() {
    await this.createParameterButton.click();
    await this.newParameterModal.waitFor({ state: 'visible' });
  }

  async fillCommissionType(commissionType) {
    await this.commissionTypeInput.fill(commissionType);
  }

  async selectChargeType() {
    await this.chargeTypeDropdown.click();
    await this.page.locator('[data-testid="charge-type-option"]').first().click();
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

  async isParameterVisibleInTable() {
    await this.commissionParametersTable.waitFor({ state: 'visible' });
    return await this.commissionParametersTable.isVisible();
  }

  async clickEditParameter() {
    await this.editParameterIcon.click();
  }

  async toggleParameterActivation() {
    await this.toggleActivateParameter.click();
  }

  async clickCreateCommissionType() {
    await this.createCommissionTypeButton.click();
  }

  async clickContinueEditing() {
    await this.continueEditingButton.click();
  }

  async clickAbandon() {
    await this.abandonButton.click();
  }

  async closeModal() {
    await this.closeModalButton.click();
  }

  async isDuplicateNameErrorVisible() {
    return await this.errorMessageDuplicateName.isVisible();
  }

  async isConnectionErrorModalVisible() {
    return await this.connectionErrorModal.isVisible();
  }
}

module.exports = ProductManagementPage;