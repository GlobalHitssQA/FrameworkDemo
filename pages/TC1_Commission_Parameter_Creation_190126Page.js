const { expect } = require('@playwright/test');

class ProductConfigurationPage {
  constructor(page) {
    this.page = page;
    
    this.moduleDropdown = page.locator('[data-testid="module-dropdown"]');
    this.paymentsModuleOption = page.locator('[data-testid="module-option-pagos"]');
    this.commissionParametersSection = page.locator('[data-testid="commission-parameters-section"]');
    this.createParameterButton = page.locator('[data-testid="btn-create-parameter"]');
    this.newParameterModal = page.locator('[data-testid="modal-new-parameter"]');
    this.modalTitle = page.locator('[data-testid="modal-title"]');
    this.commissionTypeDropdown = page.locator('[data-testid="commission-type-dropdown"]');
    this.commissionTypeOption = page.locator('[data-testid="commission-type-option"]').first();
    this.chargeTypeDropdown = page.locator('[data-testid="charge-type-dropdown"]');
    this.chargeTypeOption = page.locator('[data-testid="charge-type-option"]').first();
    this.valueInput = page.locator('[data-testid="value-input"]');
    this.commissionStartDatePicker = page.locator('[data-testid="commission-start-date"]');
    this.datePickerDay = page.locator('[data-testid="date-picker-day-available"]').first();
    this.acceptButton = page.locator('[data-testid="btn-accept"]');
    this.closeModalButton = page.locator('[data-testid="btn-close-modal"]');
    this.commissionParametersTable = page.locator('[data-testid="commission-parameters-table"]');
    this.tableRows = page.locator('[data-testid="commission-parameters-table"] tbody tr');
  }

  async navigateToProductConfiguration() {
    await this.page.goto('/configuracion-productos');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyCommissionParametersSectionVisible() {
    await expect(this.commissionParametersSection).toBeVisible();
  }

  async selectModule(moduleName) {
    await this.moduleDropdown.click();
    if (moduleName === 'Pagos') {
      await this.paymentsModuleOption.click();
    } else {
      await this.page.locator(`[data-testid="module-option-${moduleName.toLowerCase()}"]`).click();
    }
  }

  async clickCreateParameterButton() {
    await this.createParameterButton.click();
  }

  async isNewParameterModalVisible() {
    return await this.newParameterModal.isVisible();
  }

  async verifyModalFieldsPresent() {
    await expect(this.modalTitle).toContainText('Nuevo Parámetro');
    await expect(this.commissionTypeDropdown).toBeVisible();
    await expect(this.chargeTypeDropdown).toBeVisible();
    await expect(this.valueInput).toBeVisible();
    await expect(this.commissionStartDatePicker).toBeVisible();
  }

  async selectCommissionType() {
    await this.commissionTypeDropdown.click();
    await this.commissionTypeOption.click();
  }

  async selectChargeType() {
    await this.chargeTypeDropdown.click();
    await this.chargeTypeOption.click();
  }

  async enterValue(value) {
    await this.valueInput.fill(value);
  }

  async selectCommissionStartDate() {
    await this.commissionStartDatePicker.click();
    await this.datePickerDay.click();
  }

  async isAcceptButtonEnabled() {
    return await this.acceptButton.isEnabled();
  }

  async clickAcceptButton() {
    await this.acceptButton.click();
  }

  async waitForModalToClose() {
    await expect(this.newParameterModal).not.toBeVisible({ timeout: 10000 });
  }

  async isNewParameterInTable() {
    await this.commissionParametersTable.waitFor({ state: 'visible' });
    const rowCount = await this.tableRows.count();
    return rowCount > 0;
  }
}

module.exports = ProductConfigurationPage;