class ProductConfigurationPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.productConfigurationMenu = '[data-testid="menu-product-configuration"]';
    this.createProductSection = '[data-testid="section-create-product"]';
    
    // Product creation locators
    this.productNameInput = '[data-testid="input-product-name"]';
    this.productNameError = '[data-testid="error-product-name"]';
    this.acceptButton = '[data-testid="btn-accept"]';
    
    // Module dropdown
    this.moduleDropdown = '[data-testid="dropdown-module"]';
    
    // Parameter creation locators
    this.createParameterButton = '[data-testid="btn-create-parameter"]';
    this.newParameterModal = '[data-testid="modal-new-parameter"]';
    
    // Commission type locators
    this.commissionTypeDropdown = '[data-testid="dropdown-commission-type"]';
    this.addCommissionTypeButton = '[data-testid="btn-add-commission-type"]';
    this.commissionTypeNameInput = '[data-testid="input-commission-type-name"]';
    this.commissionTypeError = '[data-testid="error-commission-type-name"]';
    this.modalAcceptButton = '[data-testid="modal-btn-accept"]';
    
    // Other form fields
    this.chargeTypeDropdown = '[data-testid="dropdown-charge-type"]';
    this.valueInput = '[data-testid="input-value"]';
    this.commissionStartDate = '[data-testid="calendar-commission-start"]';
    
    // Action buttons
    this.closeModalButton = '[data-testid="btn-close-modal"]';
    this.cancelButton = '[data-testid="btn-cancel"]';
    this.editButton = '[data-testid="btn-edit"]';
    this.activateToggle = '[data-testid="toggle-activate"]';
    this.deactivateButton = '[data-testid="btn-deactivate"]';
    this.activateButton = '[data-testid="btn-activate"]';
    this.continueEditingButton = '[data-testid="btn-continue-editing"]';
    this.abandonButton = '[data-testid="btn-abandon"]';
    
    // Table
    this.commissionParametersTable = '[data-testid="table-commission-parameters"]';
    
    // Confirmation modal
    this.confirmationModal = '[data-testid="modal-confirmation"]';
  }

  async loginAsAdministrator() {
    // Login logic would be implemented based on actual authentication flow
    await this.page.goto('/');
  }

  async navigateToProductConfiguration() {
    await this.page.click(this.productConfigurationMenu);
    await this.page.waitForSelector(this.createProductSection);
  }

  async navigateToCreateProductSection() {
    await this.page.click(this.createProductSection);
    await this.page.waitForSelector(this.productNameInput);
  }

  async enterProductName(name) {
    await this.page.fill(this.productNameInput, name);
    await this.page.waitForTimeout(500);
  }

  async clearProductNameField() {
    await this.page.fill(this.productNameInput, '');
  }

  async isProductNameErrorVisible() {
    return await this.page.isVisible(this.productNameError);
  }

  async getProductNameErrorText() {
    return await this.page.textContent(this.productNameError);
  }

  async getProductNameErrorColor() {
    const element = await this.page.locator(this.productNameError);
    return await element.evaluate(el => getComputedStyle(el).color);
  }

  async isAcceptButtonDisabled() {
    return await this.page.isDisabled(this.acceptButton);
  }

  async isAcceptButtonEnabled() {
    return await this.page.isEnabled(this.acceptButton);
  }

  async clickCreateParameterButton() {
    await this.page.click(this.createParameterButton);
  }

  async waitForNewParameterModal() {
    await this.page.waitForSelector(this.newParameterModal, { state: 'visible' });
  }

  async clickAddCommissionTypeButton() {
    await this.page.click(this.addCommissionTypeButton);
  }

  async enterCommissionTypeName(name) {
    await this.page.fill(this.commissionTypeNameInput, name);
    await this.page.waitForTimeout(500);
  }

  async isCommissionTypeErrorVisible() {
    return await this.page.isVisible(this.commissionTypeError);
  }

  async getCommissionTypeErrorText() {
    return await this.page.textContent(this.commissionTypeError);
  }

  async isModalAcceptButtonDisabled() {
    return await this.page.isDisabled(this.modalAcceptButton);
  }

  async selectModule(moduleName) {
    await this.page.click(this.moduleDropdown);
    await this.page.click(`[data-testid="module-option-${moduleName}"]`);
  }

  async selectCommissionType(typeName) {
    await this.page.click(this.commissionTypeDropdown);
    await this.page.click(`[data-testid="commission-type-option-${typeName}"]`);
  }

  async selectChargeType(chargeType) {
    await this.page.click(this.chargeTypeDropdown);
    await this.page.click(`[data-testid="charge-type-option-${chargeType}"]`);
  }

  async enterValue(value) {
    await this.page.fill(this.valueInput, value);
  }

  async selectCommissionStartDate(date) {
    await this.page.click(this.commissionStartDate);
    await this.page.click(`[data-testid="calendar-day-${date}"]`);
  }

  async clickAcceptButton() {
    await this.page.click(this.acceptButton);
  }

  async clickCloseModalButton() {
    await this.page.click(this.closeModalButton);
  }

  async clickCancelButton() {
    await this.page.click(this.cancelButton);
  }

  async clickEditButton() {
    await this.page.click(this.editButton);
  }

  async toggleActivation() {
    await this.page.click(this.activateToggle);
  }
}

module.exports = ProductConfigurationPage;