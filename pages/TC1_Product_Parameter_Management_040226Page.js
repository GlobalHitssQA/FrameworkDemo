class ProductParameterPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.BASE_URL || 'https://example.com/pase/productos';
    this._moduleDropdown = '[data-testid="module-dropdown"]';
    this._createParameterButton = '[data-testid="create-parameter-button"]';
    this._newParameterModal = '[data-testid="new-parameter-modal"]';
    this._commissionTypeSelect = '[data-testid="commission-type-select"]';
    this._chargeTypeSelect = '[data-testid="charge-type-select"]';
    this._valueInput = '[data-testid="parameter-value-input"]';
    this._commissionStartDateInput = '[data-testid="commission-start-date"]';
    this._acceptButton = '[data-testid="accept-button"]';
    this._closeModalButton = '[data-testid="close-modal-button"]';
    this._createCommissionTypeButton = '[data-testid="create-commission-type-button"]';
    this._toggleActivateParameter = '[data-testid="toggle-activate-parameter"]';
    this._editParameterButton = '[data-testid="edit-parameter-button"]';
    this._confirmDeactivateModal = '[data-testid="confirm-deactivate-modal"]';
    this._continueEditingButton = '[data-testid="continue-editing-button"]';
    this._abandonButton = '[data-testid="abandon-button"]';
    this._validationErrorMessage = '[data-testid="validation-error-message"]';
    this._connectionErrorModal = '[data-testid="connection-error-modal"]';
    this._parametersListTable = '[data-testid="parameters-list-table"]';
  }

  async navigate() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async selectModule(moduleName) {
    await this.page.click(this._moduleDropdown);
    await this.page.locator(`${this._moduleDropdown} >> text=${moduleName}`).click();
  }

  async clickCreateParameter() {
    await this.page.click(this._createParameterButton);
    await this.page.waitForSelector(this._newParameterModal, { state: 'visible' });
  }

  async fillCommissionType(commissionType) {
    await this.page.click(this._commissionTypeSelect);
    await this.page.locator(`text=${commissionType}`).click();
  }

  async fillChargeType(chargeType) {
    await this.page.click(this._chargeTypeSelect);
    await this.page.locator(`text=${chargeType}`).click();
  }

  async fillValue(value) {
    await this.page.fill(this._valueInput, value);
  }

  async fillCommissionStartDate(date) {
    await this.page.fill(this._commissionStartDateInput, date);
  }

  async clickAcceptButton() {
    await this.page.click(this._acceptButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCloseModalButton() {
    await this.page.click(this._closeModalButton);
  }

  async clickCreateCommissionTypeButton() {
    await this.page.click(this._createCommissionTypeButton);
  }

  async toggleParameterActivation() {
    await this.page.click(this._toggleActivateParameter);
  }

  async clickEditParameter() {
    await this.page.click(this._editParameterButton);
  }

  async clickContinueEditing() {
    await this.page.click(this._continueEditingButton);
  }

  async clickAbandon() {
    await this.page.click(this._abandonButton);
  }

  async getValidationErrorMessage() {
    return await this.page.textContent(this._validationErrorMessage);
  }

  async isConnectionErrorModalVisible() {
    return await this.page.isVisible(this._connectionErrorModal);
  }

  async isParameterVisible(parameterName) {
    const row = this.page.locator(`${this._parametersListTable} >> text=${parameterName}`);
    return await row.isVisible();
  }

  async isNewParameterModalVisible() {
    return await this.page.isVisible(this._newParameterModal);
  }
}

module.exports = ProductParameterPage;