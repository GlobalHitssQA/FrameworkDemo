class CommissionParametersPage {
  constructor(page) {
    this.page = page;
    
    this.moduleDropdown = '[data-testid="module-dropdown"]';
    this.commissionParametersTable = '[data-testid="commission-parameters-table"]';
    this.parameterRows = '[data-testid="parameter-row"]';
    this.activeParameterToggle = '[data-testid="parameter-toggle-active"]';
    this.inactiveParameterToggle = '[data-testid="parameter-toggle-inactive"]';
    this.confirmationModal = '[data-testid="confirmation-modal"]';
    this.modalMessage = '[data-testid="modal-message"]';
    this.deactivateButton = '[data-testid="btn-deactivate"]';
    this.activateButton = '[data-testid="btn-activate"]';
    this.cancelButton = '[data-testid="btn-cancel"]';
    this.parameterName = '[data-testid="parameter-name"]';
    this.parameterStatus = '[data-testid="parameter-status"]';
    this.paymentsModuleOption = '[data-testid="module-option-payments"]';
  }

  async navigateToProductConfiguration() {
    await this.page.goto('/configuracion-productos');
    await this.page.waitForLoadState('networkidle');
    await this.page.click(this.moduleDropdown);
    await this.page.click(this.paymentsModuleOption);
    await this.page.waitForSelector(this.commissionParametersTable);
  }

  async isCommissionParametersTableVisible() {
    return await this.page.isVisible(this.commissionParametersTable);
  }

  async hasAtLeastOneParameter() {
    const rows = await this.page.$$(this.parameterRows);
    return rows.length > 0;
  }

  async getFirstActiveParameterName() {
    const activeRow = await this.page.$(`${this.parameterRows}:has(${this.activeParameterToggle})`);
    if (activeRow) {
      const nameElement = await activeRow.$(this.parameterName);
      return await nameElement.textContent();
    }
    return null;
  }

  async clickDeactivateForParameter(parameterName) {
    const row = await this.page.$(`${this.parameterRows}:has-text("${parameterName}")`);
    const toggle = await row.$(this.activeParameterToggle);
    await toggle.click();
  }

  async clickActivateForParameter(parameterName) {
    const row = await this.page.$(`${this.parameterRows}:has-text("${parameterName}")`);
    const toggle = await row.$(this.inactiveParameterToggle);
    await toggle.click();
  }

  async isConfirmationModalVisible() {
    return await this.page.isVisible(this.confirmationModal);
  }

  async isConfirmationModalClosed() {
    await this.page.waitForSelector(this.confirmationModal, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.confirmationModal));
  }

  async getConfirmationModalMessage() {
    return await this.page.textContent(this.modalMessage);
  }

  async isDeactivateButtonVisible() {
    return await this.page.isVisible(this.deactivateButton);
  }

  async isActivateButtonVisible() {
    return await this.page.isVisible(this.activateButton);
  }

  async isCancelButtonVisible() {
    return await this.page.isVisible(this.cancelButton);
  }

  async clickDeactivateButton() {
    await this.page.click(this.deactivateButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickActivateButton() {
    await this.page.click(this.activateButton);
    await this.page.waitForLoadState('networkidle');
  }

  async clickCancelButton() {
    await this.page.click(this.cancelButton);
  }

  async isParameterDeactivated(parameterName) {
    const row = await this.page.$(`${this.parameterRows}:has-text("${parameterName}")`);
    const inactiveToggle = await row.$(this.inactiveParameterToggle);
    return inactiveToggle !== null;
  }

  async isParameterActivated(parameterName) {
    const row = await this.page.$(`${this.parameterRows}:has-text("${parameterName}")`);
    const activeToggle = await row.$(this.activeParameterToggle);
    return activeToggle !== null;
  }
}

module.exports = CommissionParametersPage;