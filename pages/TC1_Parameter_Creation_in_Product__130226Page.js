const { expect } = require('@playwright/test');

class ParameterPage {
  constructor(page) {
    this.page = page;
    this.moduleDropdown = page.locator('[data-testid="module-selector"]');
    this.createParameterButton = page.locator('[data-testid="create-parameter-button"]');
    this.newParameterModal = page.locator('[data-testid="new-parameter-modal"]');
    this.commissionTypeField = page.locator('[data-testid="commission-type-input"]');
    this.chargeTypeField = page.locator('[data-testid="charge-type-input"]');
    this.valueField = page.locator('[data-testid="value-input"]');
    this.commissionStartDateField = page.locator('[data-testid="commission-start-date"]');
    this.acceptButton = page.locator('[data-testid="accept-button"]');
    this.closeModalButton = page.locator('[data-testid="close-modal-button"]');
    this.parametersTable = page.locator('[data-testid="parameters-table"]');
    this.continueEditingButton = page.locator('[data-testid="continue-editing-button"]');
    this.abandonButton = page.locator('[data-testid="abandon-button"]');
    this.activateButton = page.locator('[data-testid="activate-parameter-button"]');
    this.deactivateButton = page.locator('[data-testid="deactivate-parameter-button"]');
    this.editParameterIcon = page.locator('[data-testid="edit-parameter-icon"]');
    this.createCommissionTypeButton = page.locator('[data-testid="create-commission-type-button"]');
  }

  async navigateToParametersPage() {
    await this.page.goto('/productos/parametros');
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
    await this.commissionTypeField.fill(commissionType);
  }

  async fillChargeType(chargeType) {
    await this.chargeTypeField.fill(chargeType);
  }

  async fillValue(value) {
    await this.valueField.fill(value);
  }

  async selectCommissionStartDate() {
    await this.commissionStartDateField.click();
    await this.page.locator('[data-testid="calendar-today"]').click();
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
  }

  async isParameterVisibleInTable() {
    await this.parametersTable.waitFor({ state: 'visible' });
    const rows = await this.parametersTable.locator('tbody tr').count();
    return rows > 0;
  }

  async clickCloseModalButton() {
    await this.closeModalButton.click();
  }

  async clickContinueEditingButton() {
    await this.continueEditingButton.click();
  }

  async clickAbandonButton() {
    await this.abandonButton.click();
  }

  async activateParameter() {
    await this.activateButton.click();
  }

  async deactivateParameter() {
    await this.deactivateButton.click();
  }

  async clickEditParameterIcon() {
    await this.editParameterIcon.click();
  }

  async clickCreateCommissionTypeButton() {
    await this.createCommissionTypeButton.click();
  }
};

module.exports = ParameterPage;