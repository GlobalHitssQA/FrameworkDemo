const { expect } = require('@playwright/test');

class ProductConfigurationPage {
  constructor(page) {
    this.page = page;
    
    this.moduleDropdown = '[data-testid="module-dropdown"]';
    this.commissionParametersSection = '[data-testid="commission-parameters-section"]';
    this.createParameterButton = '[data-testid="create-parameter-button"]';
    this.newParameterModal = '[data-testid="new-parameter-modal"]';
    this.modalTitle = '[data-testid="modal-title"]';
    this.commissionTypeDropdown = '[data-testid="commission-type-dropdown"]';
    this.commissionTypeOption = '[data-testid="commission-type-option"]';
    this.chargeTypeDropdown = '[data-testid="charge-type-dropdown"]';
    this.chargeTypeOption = '[data-testid="charge-type-option"]';
    this.valueField = '[data-testid="value-field"]';
    this.commissionStartDateField = '[data-testid="commission-start-date-field"]';
    this.datePickerDay = '[data-testid="datepicker-day"]';
    this.acceptButton = '[data-testid="accept-button"]';
    this.closeModalButton = '[data-testid="close-modal-button"]';
    this.commissionParametersTable = '[data-testid="commission-parameters-table"]';
    this.tableRow = '[data-testid="commission-parameters-table"] tbody tr';
  }

  async navigateToProductConfiguration() {
    await this.page.goto('/configuracion-productos');
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToCommissionParametersSection() {
    await this.page.locator(this.commissionParametersSection).scrollIntoViewIfNeeded();
    await this.page.waitForSelector(this.commissionParametersSection, { state: 'visible' });
  }

  async isCreateParameterButtonVisible() {
    return await this.page.locator(this.createParameterButton).isVisible();
  }

  async clickCreateParameterButton() {
    await this.page.locator(this.createParameterButton).click();
    await this.page.waitForSelector(this.newParameterModal, { state: 'visible' });
  }

  async isNewParameterModalVisible() {
    return await this.page.locator(this.newParameterModal).isVisible();
  }

  async getModalTitle() {
    return await this.page.locator(this.modalTitle).textContent();
  }

  async areModalFieldsVisible() {
    const commissionType = await this.page.locator(this.commissionTypeDropdown).isVisible();
    const chargeType = await this.page.locator(this.chargeTypeDropdown).isVisible();
    const value = await this.page.locator(this.valueField).isVisible();
    const startDate = await this.page.locator(this.commissionStartDateField).isVisible();
    return commissionType && chargeType && value && startDate;
  }

  async selectCommissionType() {
    await this.page.locator(this.commissionTypeDropdown).click();
    await this.page.locator(this.commissionTypeOption).first().click();
  }

  async hasCommissionTypeValue() {
    const value = await this.page.locator(this.commissionTypeDropdown).inputValue();
    return value !== null && value !== '';
  }

  async selectChargeType() {
    await this.page.locator(this.chargeTypeDropdown).click();
    await this.page.locator(this.chargeTypeOption).first().click();
  }

  async hasChargeTypeValue() {
    const value = await this.page.locator(this.chargeTypeDropdown).inputValue();
    return value !== null && value !== '';
  }

  async enterValue(value) {
    await this.page.locator(this.valueField).fill(value);
  }

  async getValueFieldContent() {
    return await this.page.locator(this.valueField).inputValue();
  }

  async selectCommissionStartDate() {
    await this.page.locator(this.commissionStartDateField).click();
    await this.page.locator(this.datePickerDay).first().click();
  }

  async hasCommissionStartDateValue() {
    const value = await this.page.locator(this.commissionStartDateField).inputValue();
    return value !== null && value !== '';
  }

  async clickAcceptButton() {
    await this.page.locator(this.acceptButton).click();
  }

  async isModalClosed() {
    await this.page.waitForSelector(this.newParameterModal, { state: 'hidden', timeout: 5000 });
    return !(await this.page.locator(this.newParameterModal).isVisible());
  }

  async isNewParameterInTable() {
    await this.page.waitForSelector(this.tableRow, { state: 'visible' });
    const rowCount = await this.page.locator(this.tableRow).count();
    return rowCount > 0;
  }
}

module.exports = ProductConfigurationPage;