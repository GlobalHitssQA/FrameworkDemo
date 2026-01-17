class RoamingBillingPage {
  constructor(page) {
    this.page = page;
    this.lineManagementMenu = '[data-testid="menu-line-management"]';
    this.planSelector = '[data-testid="select-plan-type"]';
    this.lineStatusIndicator = '[data-testid="line-status-indicator"]';
    this.configureLineButton = '[data-testid="btn-configure-line"]';
    this.rateConfigurationMenu = '[data-testid="menu-rate-configuration"]';
    this.roamingDataRateField = '[data-testid="field-roaming-data-rate"]';
    this.consumptionSimulatorMenu = '[data-testid="menu-consumption-simulator"]';
    this.roamingModeCheckbox = '[data-testid="checkbox-roaming-mode"]';
    this.generateConsumptionButton = '[data-testid="btn-generate-consumption"]';
    this.udrRecordsMenu = '[data-testid="menu-udr-records"]';
    this.udrTableRows = '[data-testid="table-udr-records"] tbody tr';
    this.udrLineIdentifier = '[data-testid="cell-line-identifier"]';
    this.billingProcessMenu = '[data-testid="menu-billing-process"]';
    this.executeBillingButton = '[data-testid="btn-execute-billing"]';
    this.billingStatusIndicator = '[data-testid="billing-status-indicator"]';
    this.bulkRateChargesSection = '[data-testid="section-bulk-rate-charges"]';
    this.consolidatedInvoiceMenu = '[data-testid="menu-consolidated-invoice"]';
    this.roamingTrafficSection = '[data-testid="section-roaming-traffic"]';
    this.trafficDetailTable = '[data-testid="table-traffic-detail"]';
    this.planColumnInDetail = '[data-testid="column-plan"]';
    this.amountColumnInDetail = '[data-testid="column-amount"]';
    this.inPoolServicesSection = '[data-testid="section-in-pool-services"]';
    this.inPoolBulkSection = '[data-testid="section-in-pool-bulk"]';
    this.soldDetailSection = '[data-testid="section-sold-detail"]';
  }

  async navigateToLineManagement() {
    await this.page.click(this.lineManagementMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async configureLineInPlan(planType) {
    await this.page.selectOption(this.planSelector, planType);
    await this.page.click(this.configureLineButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive(planType) {
    const statusElement = this.page.locator(`${this.lineStatusIndicator}[data-plan="${planType}"]`);
    const statusText = await statusElement.textContent();
    return statusText.includes('ACTIVE') || statusText.includes('ACTIVA');
  }

  async navigateToRateConfiguration() {
    await this.page.click(this.rateConfigurationMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async getRoamingDataRate() {
    const rateText = await this.page.textContent(this.roamingDataRateField);
    return parseFloat(rateText.replace(/[^0-9.]/g, ''));
  }

  async navigateToConsumptionSimulator() {
    await this.page.click(this.consumptionSimulatorMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async generateRoamingDataConsumption(planType) {
    await this.page.selectOption(this.planSelector, planType);
    await this.page.check(this.roamingModeCheckbox);
    await this.page.click(this.generateConsumptionButton);
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToUDRRecords() {
    await this.page.click(this.udrRecordsMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUDRRecordExists(planType) {
    const rows = this.page.locator(this.udrTableRows);
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const lineId = await row.locator(this.udrLineIdentifier).textContent();
      if (lineId.includes(planType)) {
        return true;
      }
    }
    return false;
  }

  async navigateToBillingProcess() {
    await this.page.click(this.billingProcessMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async executeBillingProcess() {
    await this.page.click(this.executeBillingButton);
    await this.page.waitForSelector(this.billingStatusIndicator, { state: 'visible' });
  }

  async verifyBillingProcessCompleted() {
    const statusText = await this.page.textContent(this.billingStatusIndicator);
    return statusText.includes('COMPLETED') || statusText.includes('COMPLETADO');
  }

  async verifyBulkRateChargesApplied() {
    const isVisible = await this.page.isVisible(this.bulkRateChargesSection);
    return isVisible;
  }

  async navigateToConsolidatedInvoice() {
    await this.page.click(this.consolidatedInvoiceMenu);
    await this.page.waitForLoadState('networkidle');
  }

  async isRoamingTrafficSectionVisible() {
    return await this.page.isVisible(this.roamingTrafficSection);
  }

  async getRoamingTrafficAmounts() {
    const amounts = [];
    const amountCells = this.page.locator(`${this.trafficDetailTable} ${this.amountColumnInDetail}`);
    const count = await amountCells.count();
    for (let i = 0; i < count; i++) {
      const amountText = await amountCells.nth(i).textContent();
      amounts.push(parseFloat(amountText.replace(/[^0-9.]/g, '')));
    }
    return amounts;
  }

  async verifyAmountCalculatedAtRate(amount, expectedRate) {
    const tolerance = 0.01;
    const mbConsumed = amount / expectedRate;
    const recalculatedAmount = mbConsumed * expectedRate;
    return Math.abs(recalculatedAmount - amount) < tolerance;
  }
};

module.exports = RoamingBillingPage;