class CommissionParameterPage {
  constructor(page) {
    this.page = page;
    
    this.parametersTable = '[data-testid="commission-parameters-table"]';
    this.editButton = '[data-testid="edit-parameter-button"]';
    this.editModal = '[data-testid="edit-parameter-modal"]';
    this.commissionTypeDropdown = '[data-testid="commission-type-dropdown"]';
    this.commissionTypeOption = '[data-testid="commission-type-option"]';
    this.chargeTypeDropdown = '[data-testid="charge-type-dropdown"]';
    this.valueField = '[data-testid="parameter-value-field"]';
    this.commissionStartDateField = '[data-testid="commission-start-date"]';
    this.calendarDatePicker = '[data-testid="calendar-date-picker"]';
    this.calendarNextMonth = '[data-testid="calendar-next-month"]';
    this.calendarDay = '[data-testid="calendar-day"]';
    this.acceptButton = '[data-testid="accept-button"]';
    this.closeModalButton = '[data-testid="close-modal-button"]';
    this.successModal = '[data-testid="success-modal"]';
    this.successModalMessage = '[data-testid="success-modal-message"]';
    this.confirmationModalAcceptButton = '[data-testid="confirmation-accept-button"]';
    this.abandonConfirmationModal = '[data-testid="abandon-confirmation-modal"]';
    this.abandonModalMessage = '[data-testid="abandon-modal-message"]';
    this.abandonButton = '[data-testid="abandon-button"]';
    this.continueEditingButton = '[data-testid="continue-editing-button"]';
    this.parameterRow = '[data-testid="parameter-row"]';
    
    this.originalCommissionType = null;
  }

  async navigateToCommissionParameters() {
    await this.page.waitForSelector(this.parametersTable, { state: 'visible', timeout: 10000 });
  }

  async hasExistingParameters() {
    const rows = await this.page.locator(this.parameterRow).count();
    return rows > 0;
  }

  async clickEditButtonForFirstParameter() {
    const firstEditButton = this.page.locator(this.editButton).first();
    await firstEditButton.click();
  }

  async isEditModalVisible() {
    return await this.page.locator(this.editModal).isVisible();
  }

  async areEditFieldsPreloaded() {
    const commissionTypeVisible = await this.page.locator(this.commissionTypeDropdown).isVisible();
    const chargeTypeVisible = await this.page.locator(this.chargeTypeDropdown).isVisible();
    const valueVisible = await this.page.locator(this.valueField).isVisible();
    const dateVisible = await this.page.locator(this.commissionStartDateField).isVisible();
    return commissionTypeVisible && chargeTypeVisible && valueVisible && dateVisible;
  }

  async selectDifferentCommissionType() {
    const dropdown = this.page.locator(this.commissionTypeDropdown);
    this.originalCommissionType = await dropdown.textContent();
    await dropdown.click();
    const options = this.page.locator(this.commissionTypeOption);
    const optionCount = await options.count();
    if (optionCount > 1) {
      await options.nth(1).click();
    } else {
      await options.first().click();
    }
  }

  async isCommissionTypeFieldUpdated() {
    const dropdown = this.page.locator(this.commissionTypeDropdown);
    const currentValue = await dropdown.textContent();
    return currentValue !== null && currentValue.length > 0;
  }

  async enterNewValue(value) {
    const valueField = this.page.locator(this.valueField);
    await valueField.clear();
    await valueField.fill(value);
  }

  async getValueFieldContent() {
    return await this.page.locator(this.valueField).inputValue();
  }

  async selectNewCommissionStartDate() {
    await this.page.locator(this.commissionStartDateField).click();
    await this.page.waitForSelector(this.calendarDatePicker, { state: 'visible' });
    await this.page.locator(this.calendarNextMonth).click();
    const availableDays = this.page.locator(`${this.calendarDay}:not([disabled])`);
    await availableDays.first().click();
  }

  async getCommissionStartDateValue() {
    return await this.page.locator(this.commissionStartDateField).inputValue();
  }

  async clickAcceptButton() {
    await this.page.locator(this.acceptButton).click();
  }

  async isSuccessModalVisible() {
    return await this.page.locator(this.successModal).isVisible();
  }

  async getSuccessModalMessage() {
    return await this.page.locator(this.successModalMessage).textContent();
  }

  async clickConfirmationModalAcceptButton() {
    await this.page.locator(this.confirmationModalAcceptButton).click();
  }

  async isEditModalClosed() {
    return await this.page.locator(this.editModal).isHidden();
  }

  async isParametersTableVisible() {
    return await this.page.locator(this.parametersTable).isVisible();
  }

  async clickCloseModalButton() {
    await this.page.locator(this.closeModalButton).click();
  }

  async isAbandonConfirmationModalVisible() {
    return await this.page.locator(this.abandonConfirmationModal).isVisible();
  }

  async getAbandonModalMessage() {
    return await this.page.locator(this.abandonModalMessage).textContent();
  }

  async clickAbandonButton() {
    await this.page.locator(this.abandonButton).click();
  }

  async clickContinueEditingButton() {
    await this.page.locator(this.continueEditingButton).click();
  }
}

module.exports = CommissionParameterPage;