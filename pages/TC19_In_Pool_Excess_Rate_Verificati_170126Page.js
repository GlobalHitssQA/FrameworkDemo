const { expect } = require('@playwright/test');

class InPoolBillingPage {
  constructor(page) {
    this.page = page;
    
    // Navigation locators
    this.lineConfigurationMenu = '[data-testid="menu-line-configuration"]';
    this.consumptionRegistrationMenu = '[data-testid="menu-consumption-registration"]';
    this.shellExecutionMenu = '[data-testid="menu-shell-execution"]';
    this.occSectionMenu = '[data-testid="menu-occ-section"]';
    this.invoicePreviewMenu = '[data-testid="menu-invoice-preview"]';
    
    // Line configuration locators
    this.lineCountInput = '[data-testid="input-line-count"]';
    this.planSelector = '[data-testid="select-plan-type"]';
    this.packageSizeInput = '[data-testid="input-package-size-mb"]';
    this.applyConfigurationButton = '[data-testid="btn-apply-configuration"]';
    this.sharedPoolTotalDisplay = '[data-testid="display-shared-pool-total"]';
    
    // Consumption registration locators
    this.telemetryConsumptionInput = '[data-testid="input-telemetry-consumption"]';
    this.apnTypeSelector = '[data-testid="select-apn-type"]';
    this.registerConsumptionButton = '[data-testid="btn-register-consumption"]';
    
    // Shell execution locators
    this.executeShellButton = '[data-testid="btn-execute-inpool-shell"]';
    this.shellStatusIndicator = '[data-testid="indicator-shell-status"]';
    this.calculatedExcessDisplay = '[data-testid="display-calculated-excess"]';
    this.assignedPoolDisplay = '[data-testid="display-assigned-pool"]';
    
    // OCC section locators
    this.occTableContainer = '[data-testid="container-occ-table"]';
    this.inPoolServiceOCCRow = '[data-testid="row-occ-inpool-service"]';
    this.inPoolBulkServiceOCCRow = '[data-testid="row-occ-inpool-bulk"]';
    this.occAmountCell = '[data-testid="cell-occ-amount"]';
    
    // Invoice preview locators
    this.invoiceContainer = '[data-testid="container-invoice-preview"]';
    this.invoiceInPoolServicesSection = '[data-testid="section-invoice-inpool-services"]';
    this.invoiceInPoolBulkSection = '[data-testid="section-invoice-inpool-bulk"]';
    this.invoiceTrafficDetailSection = '[data-testid="section-traffic-detail-sold"]';
    this.invoiceAmountField = '[data-testid="field-invoice-amount"]';
  }

  async navigateToLineConfiguration() {
    await this.page.click(this.lineConfigurationMenu);
    await this.page.waitForSelector(this.lineCountInput);
  }

  async configureLines(lineCount, planType, packageSizeMB) {
    await this.page.fill(this.lineCountInput, lineCount.toString());
    await this.page.selectOption(this.planSelector, planType);
    await this.page.fill(this.packageSizeInput, packageSizeMB.toString());
    await this.page.click(this.applyConfigurationButton);
    await this.page.waitForSelector(this.sharedPoolTotalDisplay);
  }

  async getSharedPoolTotal() {
    const poolText = await this.page.textContent(this.sharedPoolTotalDisplay);
    return poolText.replace(/[^0-9]/g, '');
  }

  async navigateToConsumptionRegistration() {
    await this.page.click(this.consumptionRegistrationMenu);
    await this.page.waitForSelector(this.telemetryConsumptionInput);
  }

  async registerTelemetryConsumption(consumptionMB) {
    await this.page.fill(this.telemetryConsumptionInput, consumptionMB.toString());
    await this.page.click(this.registerConsumptionButton);
  }

  async navigateToShellExecution() {
    await this.page.click(this.shellExecutionMenu);
    await this.page.waitForSelector(this.executeShellButton);
  }

  async executeInPoolCalculationShell() {
    await this.page.click(this.executeShellButton);
  }

  async waitForShellCompletion() {
    await this.page.waitForSelector(`${this.shellStatusIndicator}:has-text("Completed")`, { timeout: 60000 });
  }

  async getCalculatedExcess() {
    const excessText = await this.page.textContent(this.calculatedExcessDisplay);
    return excessText.replace(/[^0-9]/g, '');
  }

  async navigateToOCCSection() {
    await this.page.click(this.occSectionMenu);
    await this.page.waitForSelector(this.occTableContainer);
  }

  async getInPoolServiceOCCAmount() {
    const row = this.page.locator(this.inPoolServiceOCCRow);
    const amountText = await row.locator(this.occAmountCell).textContent();
    return amountText.replace(/[^0-9.]/g, '');
  }

  async getInPoolBulkServiceOCCAmount() {
    const row = this.page.locator(this.inPoolBulkServiceOCCRow);
    const amountText = await row.locator(this.occAmountCell).textContent();
    return amountText.replace(/[^0-9.]/g, '');
  }

  async navigateToInvoicePreview() {
    await this.page.click(this.invoicePreviewMenu);
    await this.page.waitForSelector(this.invoiceContainer);
  }

  async getInvoiceInPoolServicesAmount() {
    const section = this.page.locator(this.invoiceInPoolServicesSection);
    const amountText = await section.locator(this.invoiceAmountField).textContent();
    return amountText.replace(/[^0-9.]/g, '');
  }

  async getInvoiceInPoolBulkAmount() {
    const section = this.page.locator(this.invoiceInPoolBulkSection);
    const amountText = await section.locator(this.invoiceAmountField).textContent();
    return amountText.replace(/[^0-9.]/g, '');
  }
}

module.exports = InPoolBillingPage;